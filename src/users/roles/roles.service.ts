import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { roles } from 'models/usersSchema';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(@InjectModel(roles) private rolesModel: typeof roles) {}

  async create(createRoleDto: CreateRoleDto): Promise<void> {
    await this.rolesModel.create(createRoleDto);
  }

  async getAllRoles(): Promise<roles[]> {
    return this.rolesModel.findAll();
  }

  async getRoleById(id: number): Promise<roles> {
    return this.rolesModel.findOne({ where: { role_id: id } });
  }

  // update(id: number, updateRoleDto: UpdateRoleDto) {
  //   return `This action updates a #${id} role`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} role`;
  // }
}
