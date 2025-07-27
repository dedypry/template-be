import { IsNumber, IsOptional } from "class-validator";
import { Transform } from "class-transformer";

export class Pagination {
  @IsOptional()
  @IsNumber({}, { message: "Page harus berupa angka" })
  @Transform(({ value }) => (value !== undefined ? Number(value) - 1 : 0))
  page: number = 0;

  @IsOptional()
  @IsNumber({}, { message: "Page size harus berupa angka" })
  pageSize: number = 10;
}
