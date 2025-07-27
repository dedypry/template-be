import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "routing-controllers";

@Controller("/profile")
export class ProfileController {
  @Get()
  async list() {
    return "Hello Word";
  }

  @Get(":id")
  async detail() {
    return "detail";
  }

  @Post()
  async create(@Body() body: any) {
    return "data success created!";
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() body: any) {
    return "data success updated!";
  }

  @Delete(":id")
  async destroy(@Param("id") id: string) {
    return "data success deleted!";
  }
}
