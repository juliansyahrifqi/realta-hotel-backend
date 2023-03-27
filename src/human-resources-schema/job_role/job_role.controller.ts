import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { JobRoleService } from './job_role.service';
import { CreateJobRoleDto } from './dto/create-job_role.dto';
import { UpdateJobRoleDto } from './dto/update-job_role.dto';

@Controller('job-role')
export class JobRoleController {
  constructor(private readonly jobRoleService: JobRoleService) {}

  @Post()
  create(@Body() createJobRoleDto: CreateJobRoleDto) {
    return this.jobRoleService.create(createJobRoleDto);
  }

  @Get()
  findAll() {
    return this.jobRoleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobRoleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobRoleDto: UpdateJobRoleDto) {
    return this.jobRoleService.update(+id, updateJobRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobRoleService.remove(+id);
  }
}
