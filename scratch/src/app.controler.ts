import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppControler {
  @Get("/abc")
  getRootRoute() {
    return "hi there";
  }
}
