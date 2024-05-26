import { HubConnection, HubConnectionBuilder, LogLevel } from "@aspnet/signalr";

export default class Hub {
  connection: HubConnection;

  constructor() {
    this.connection = new HubConnectionBuilder()
      .withUrl("https://localhost:7050/hub")
      .configureLogging(LogLevel.Information)
      .build();
  }
}
