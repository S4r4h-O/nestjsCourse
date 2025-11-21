import { Module } from "@nestjs/common";
import { AppControler } from "./app.controller";

@Module({
  controllers: [AppControler],
})
export class AppModule {}
