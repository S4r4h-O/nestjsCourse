import { Controller, Get } from "@nestjs/common";

@Controller("/app")
export class AppControler {
  @Get("/test")
  getRootRoute() {
    return "Hello World";
  }

  @Get("/bye")
  getByeThere() {
    return "Bye World";
  }
}
