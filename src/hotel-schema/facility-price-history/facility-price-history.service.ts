import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
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

  async findAll() {
    try {
      const data = await this.faphModel.findAll({
        include: [{ model: users }],
      });
      return data;
    } catch (error) {
      return error;
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

  async remove(id: number) {
    try {
      const data = await this.faphModel.destroy({
        where: { faph_id: id },
      });
      return `This action removes a #${id} facilityPriceHistory`;
    } catch (error) {
      error;
    }
  }
}
