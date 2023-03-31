import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePurchaseOrderDetailDto } from './dto/create-purchase-order-detail.dto';
import { UpdatePurchaseOrderDetailDto } from './dto/update-purchase-order-detail.dto';
import { PurchaseOrderDetailService } from './purchase-order-detail.service';

@Controller('purchasing/listorderdetail')
export class PurchaseOrderDetailController {
  constructor(
    private readonly purchaseOrderDetailService: PurchaseOrderDetailService,
  ) {}

  @Post()
  create(@Body() createPurchaseOrderDetailDto: CreatePurchaseOrderDetailDto) {
    return this.purchaseOrderDetailService.create(createPurchaseOrderDetailDto);
  }

  @Get()
  findAll() {
    return this.purchaseOrderDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseOrderDetailService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePurchaseOrderDetailDto: UpdatePurchaseOrderDetailDto,
  ) {
    return this.purchaseOrderDetailService.update(
      +id,
      updatePurchaseOrderDetailDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchaseOrderDetailService.remove(+id);
  }
}
