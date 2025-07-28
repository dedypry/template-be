import { IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class Pagination {
  @IsOptional()
  @IsNumber({}, { message: 'Page must be a number' })
  @Transform(({ value }) => (value !== undefined ? Number(value) - 1 : 0))
  page: number = 0;

  @IsOptional()
  @IsNumber({}, { message: 'Page size must be a number' })
  pageSize: number = 10;
}
