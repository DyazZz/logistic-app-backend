import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  applicationUID: string;

  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @IsNotEmpty()
  driverName: string;

  @IsString()
  @IsNotEmpty()
  driverPhone: string;

  @IsString()
  comment: string;

  @IsEnum([1, 2, 3], {
    message: 'Application status is invalid. Expected 1, 2 or 3',
  })
  status: 1 | 2 | 3;

  @IsNotEmpty()
  @IsString()
  ATI: string;
}
