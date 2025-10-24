import { Module } from "@nestjs/common";
import { AppControler } from "./app.controler";

@Module({
  controllers: [AppControler],
})
export class AppModule {}
