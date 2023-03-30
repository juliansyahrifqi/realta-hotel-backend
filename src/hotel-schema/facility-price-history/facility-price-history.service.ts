import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Response } from 'express';
import { facility_price_history } from 'models/hotelSchema';
import { users } from 'models/usersSchema';
import { CreateFacilityPriceHistoryDto } from './dto/create-facility-price-history.dto';
import { UpdateFacilityPriceHistoryDto } from './dto/update-facility-price-history.dto';

@Injectable()
export class FacilityPriceHistoryService {
  constructor(
    @InjectModel(facility_price_history)
    private faphModel: typeof facility_price_history,
  ) {}
  create(createFacilityPriceHistoryDto: CreateFacilityPriceHistoryDto) {
    return 'This action adds a new facilityPriceHistory';
  }

  async findAll(@Res() response: Response) {
    try {
      const data = await this.faphModel.findAll({
        include: [{ model: users }],
      });

      const dataResponse = {
        statusCode: HttpStatus.OK,
        data: data,
      };
      return response.status(HttpStatus.OK).send(dataResponse);
    } catch (error) {
      const dataResponse = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'gagal',
      };
      return response.status(HttpStatus.BAD_REQUEST).send(dataResponse);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} facilityPriceHistory`;
  }

  update(
    id: number,
    updateFacilityPriceHistoryDto: UpdateFacilityPriceHistoryDto,
  ) {
    return `This action updates a #${id} facilityPriceHistory`;
  }

  async remove(@Res() response: Response, id: number) {
    try {
      const data = await this.faphModel.destroy({
        where: { faph_id: id },
      });

      const dataResponse = {
        statusCode: HttpStatus.OK,
        message: `Data dengan id-${id} Berhasil Di Hapus`,
      };
      return response.status(HttpStatus.OK).send(dataResponse);
    } catch (error) {
      const dataResponse = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'gagal',
      };
      return response.status(HttpStatus.BAD_REQUEST).send(dataResponse);
    }
  }
}
