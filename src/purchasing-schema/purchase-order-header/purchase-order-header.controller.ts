import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreatePurchaseOrderHeaderDto } from './dto/create-purchase-order-header.dto';
import { PurchaseOrderHeaderService } from './purchase-order-header.service';

@Controller('purchase-order-header')
export class PurchaseOrderHeaderController {
  constructor(
    private readonly purchaseOrderHeaderService: PurchaseOrderHeaderService,
  ) {}

  @Post()
  create(@Body() createPurchaseOrderHeaderDto: CreatePurchaseOrderHeaderDto) {
    return this.purchaseOrderHeaderService.create(createPurchaseOrderHeaderDto);
  }

  @Get()
  async searchVendor(
    @Query('page') pageNumber: number,
    @Query('limit') limit: number,
    @Query('number') poNumber: string,
    @Query('status') status?: string,
  ) {
    if (poNumber) {
      return this.purchaseOrderHeaderService.searchOrder(
        pageNumber,
        limit,
        poNumber,
        status,
      );
    } else if (status) {
      return this.purchaseOrderHeaderService.searchOrder(
        pageNumber,
        limit,
        poNumber,
        status,
      );
    } else {
      return this.purchaseOrderHeaderService.findAll(pageNumber, limit);
    }
  }

  // Search orderHeader
  // @Get(':ponumber')
  // async searchOrder(
  //   @Param('ponumber') pohe_number: string,
  //   @Query('status') pohe_status?: string,
  // ) {
  //   const result = await this.purchaseOrderHeaderService.searchPoOrder(
  //     pohe_number,
  //     pohe_status,
  //   );

  //   if (!result) {
  //     throw new NotFoundException(
  //       `Vendor dengan nama ${pohe_number} tidak ditemukan`,
  //     );
  //   }
  //   return result;
  // }

  // @Get()
  // async findAll(
  //   @Query('pageNumber') pageNumber: number,
  //   @Query('limit') limit: number,
  // ) {
  //   try {
  //     const order = await this.purchaseOrderHeaderService.findAll(
  //       pageNumber,
  //       limit,
  //     );
  //     return {
  //       data: order,
  //       Halaman: pageNumber,
  //       JmlhData: limit,
  //     };
  //   } catch (error) {
  //     console.error(error);
  //     return {
  //       message: 'Internal server error',
  //     };
  //   }
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseOrderHeaderService.findOne(+id);
  }

  // @Put(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updatePurchaseOrderHeaderDto: UpdatePurchaseOrderHeaderDto,
  // ) {
  //   return this.purchaseOrderHeaderService.update(
  //     +id,
  //     updatePurchaseOrderHeaderDto,
  //   );
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchaseOrderHeaderService.remove(+id);
  }
}
