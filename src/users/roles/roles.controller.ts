import { Controller, Get, Post, Body, Param, HttpStatus } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('users/roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('create')
  async create(@Body() createRoleDto: CreateRoleDto) {
    try {
      await this.rolesService.create(createRoleDto);

      return { statusCode: HttpStatus.OK, message: 'Role success created' };
    } catch (e) {
      return { statusCode: HttpStatus.BAD_REQUEST, message: e };
    }
  }

  @Get('all')
  async findAll() {
    try {
      const result = await this.rolesService.getAllRoles();

      if (result.length === 0) {
        return { statusCode: HttpStatus.NOT_FOUND, message: 'Roles not found' };
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Roles Found',
        data: result,
      };
    } catch (e) {
      return { statusCode: HttpStatus.BAD_REQUEST, message: e };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const result = await this.rolesService.getRoleById(+id);

      if (result === null) {
        return { statusCode: HttpStatus.NOT_FOUND, message: 'Role not found' };
      }

      return { statusCode: HttpStatus.OK, message: 'Role found', data: result };
    } catch (e) {
      return { statusCode: HttpStatus.BAD_REQUEST, message: e };
    }
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
  //   return this.rolesService.update(+id, updateRoleDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.rolesService.remove(+id);
  // }
}
