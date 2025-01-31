import { ErgoApi } from "./ergo-api";

class Network {
  private nodes: string[] = ["http://213.239.193.208:9053"];
  private connected: number = 0;
  private api: ErgoApi<unknown> = new ErgoApi();
  constructor() {
    this.api.baseUrl = this.nodes[this.connected];
  }
  public API(): ErgoApi<unknown> {
    return this.api;
  }
  public getNodes(): string[] {
    return this.nodes;
  }
  public addNode(localStorage: Storage, url: string) {
    this.nodes.push(url);
    localStorage.setItem("nodes", this.nodes.join(";"));
  }
  public setNode(n: number) {
    this.connected = n;
    this.api.baseUrl = this.nodes[n];
  }
  public init(localStorage: Storage) {
    const saved = localStorage.getItem("nodes")?.split(";");
    if (saved) this.nodes = saved;
    this.setNode(parseInt(localStorage.getItem("connected") ?? "0"));
  }
}

export const NETWORK: Network = new Network();
