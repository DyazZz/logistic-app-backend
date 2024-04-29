import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationService: ApplicationsService) {}

  @Get() //GET /applications?search=&column=&sort=
  findByQuery(
    @Query('search') searchQuery: string,
    @Query('column') columnName: string,
    @Query('sort') sort: string,
  ) {
    if (searchQuery || sort)
      return this.applicationService.findAllWhere(
        searchQuery,
        columnName,
        sort,
      );
    return this.applicationService.findAll();
  }

  @Get(':id') //GET /applications/:id
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.applicationService.findById(id);
  }

  @Post() //POST /applications
  create(
    @Body(ValidationPipe)
    createApplicationDto: CreateApplicationDto,
  ) {
    return this.applicationService.create(createApplicationDto);
  }

  @Patch(':id') //PATCH /applications/:id
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    updateUserDto: UpdateApplicationDto,
  ) {
    return this.applicationService.update(id, updateUserDto);
  }

  @Delete(':id') //GET /applications/:id
  delete(@Param('id', ParseIntPipe) id: number) {
    console.log('hello');
    return this.applicationService.delete(id);
  }
}
