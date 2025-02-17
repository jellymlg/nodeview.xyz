import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { NETWORK } from "@/lib/network";
import { ErgoTransactionOutput, IndexedErgoBox } from "@/lib/ergo-api";
import { RustModule } from "@/lib/wasm";
import { Skeleton } from "../ui/skeleton";

const chartConfig = {
  price: {
    label: "Price",
    theme: {
      light: "hsl(var(--chart-1))",
      dark: "hsl(var(--chart-3))",
    },
  },
} satisfies ChartConfig;

interface Data {
  date: string;
  price: number;
}

function RateFromOracleBox(box: ErgoTransactionOutput): number {
  try {
    return (
      1_000_000_000 /
      (RustModule.SigmaRust.Constant.decode_from_base16(
        box.additionalRegisters["R6"],
      )
        .to_i64()
        .as_num() as number)
    );
  } catch {
    return 0;
  }
}

async function Get30BoxesForRange(skip: number): Promise<IndexedErgoBox[]> {
  return Promise.all(
    [...Array(30)].map((e, i) =>
      NETWORK.API()
        .blockchain.getBoxesByTokenId(PoolTokenId, {
          offset: i * skip,
          limit: 1,
        })
        .then((resp) => resp.data.items![0]),
    ),
  );
}

const PoolTokenId =
  "8c27dd9d8a35aac1e3167d58858c0a8b4059b277da790552e37eba22df9b9035";

export function PriceView() {
  const [range, setRange] = useState<string>("day");
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fun = async () => {
      setLoading(true);
      await RustModule.load();
      const total = range == "day" ? 720 : range == "week" ? 5040 : 21600;
      const skip = total / 30;
      const boxes = await Get30BoxesForRange(skip);
      const temp: Data[] = Array<Data>(boxes.length);
      for (
        let i = 0, t = Date.now();
        i < temp.length;
        i++, t -= 2 * 60 * 1000 * skip
      ) {
        const p = RateFromOracleBox(boxes[i]);
        temp[i] = {
          date: new Date(t - 2 * 60 * 1000).toString(),
          price: isNaN(p) || p == Infinity ? 0 : p,
        };
      }
      setData(temp.reverse());
      setLoading(false);
    };
    fun();
  }, [range]);

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>ERG - USD</CardTitle>
          <CardDescription>Ergo - US Dollar price history</CardDescription>
        </div>
        <Select value={range} onValueChange={setRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last day" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="month" className="rounded-lg">
              Last month
            </SelectItem>
            <SelectItem value="week" className="rounded-lg">
              Last week
            </SelectItem>
            <SelectItem value="day" className="rounded-lg">
              Last day
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {loading ? (
          <Skeleton className="w-full h-[250px]" />
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <AreaChart data={data}>
              <defs>
                <linearGradient id="fillPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-price)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-price)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  return new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      });
                    }}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="price"
                type="natural"
                fill="url(#fillPrice)"
                stroke="var(--color-price)"
                stackId="a"
                isAnimationActive={false}
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
