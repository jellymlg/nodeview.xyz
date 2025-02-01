import { ErgoApi } from "./ergo-api";

class Network {
  private nodes: string[] = [
    "http://213.239.193.208:9053",
    "https://ergo-node.zoomout.io",
    "https://ergo1.oette.info",
    "http://79.241.58.160:9053",
    "https://ergo.homelinuxserver.org",
  ];
  private connected: number = 0;
  private api: ErgoApi<unknown> = new ErgoApi();
  constructor() {
    this.api.baseUrl = this.nodes[this.connected];
  }
  public API(): ErgoApi<unknown> {
    return this.api;
  }
  public getNodes(): string[] {
    return [...this.nodes];
  }
  public addNode(localStorage: Storage, url: string) {
    this.nodes.push(url);
    localStorage.setItem("nodes", this.nodes.join(";"));
  }
  public setNode(localStorage: Storage, n: number) {
    localStorage.setItem("connected", "" + n);
    this.connected = n;
    this.api.baseUrl = this.nodes[n];
  }
  public init(localStorage: Storage) {
    const saved = localStorage.getItem("nodes")?.split(";");
    if (saved) this.nodes = saved;
    const n = parseInt(localStorage.getItem("connected") ?? "0");
    this.connected = n;
    this.api.baseUrl = this.nodes[n];
  }
}

export const NETWORK: Network = new Network();
