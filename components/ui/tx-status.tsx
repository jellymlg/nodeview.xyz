import { CircleCheckIcon, Clock3Icon } from "lucide-react";

interface TxStatusProps {
  confirmed: boolean;
}

export function TxStatus({ confirmed }: TxStatusProps) {
  return (
    <div
      className={
        "bg-opacity-50 border rounded-lg w-fit p-1 " +
        (confirmed
          ? "bg-green-600 border-green-600"
          : "bg-yellow-500 border-yellow-500")
      }
    >
      {confirmed ? (
        <CircleCheckIcon className="inline pr-2" />
      ) : (
        <Clock3Icon className="inline pr-2" />
      )}
      <span className="text-sm">{confirmed ? "Confirmed" : "Unconfirmed"}</span>
    </div>
  );
}
