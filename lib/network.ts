import { ErgoApi } from "./ergo-api";

class Network {
  private nodes: string[] = [
    "http://213.239.193.208:9053",
    "https://ergo1.oette.info",
    "http://79.241.58.160:9053",
  ];
  private connected: number = 0;
  private api: ErgoApi<unknown> = new ErgoApi();
  public update: number = Date.now();
  constructor() {
    this.api.baseUrl = this.nodes[this.connected];
  }
  public API(): ErgoApi<unknown> {
    return this.api;
  }
  public getNodes(): string[] {
    return [...this.nodes];
  }
  public getConnected(): string {
    return this.nodes[this.connected];
  }
  public addNode(localStorage: Storage, url: string) {
    this.nodes.push(url);
    localStorage.setItem("nodes", this.nodes.join(";"));
    this.update = Date.now();
  }
  public removeNode(localStorage: Storage, n: number) {
    this.nodes.splice(n, 1);
    localStorage.setItem("nodes", this.nodes.join(";"));
    this.update = Date.now();
  }
  public setNode(localStorage: Storage, n: number) {
    localStorage.setItem("connected", "" + n);
    this.connected = n;
    this.api.baseUrl = this.nodes[n];
    this.update = Date.now();
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
