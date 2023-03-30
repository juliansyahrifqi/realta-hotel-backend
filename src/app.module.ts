import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { RegionsModule } from './master/regions/regions.module';
import { AddressModule } from './master/address/address.module';
import { CategoryGroupModule } from './master/category_group/category_group.module';
import { CountryModule } from './master/country/country.module';
import { ProvincesModule } from './master/provinces/provinces.module';
import { CityModule } from './master/city/city.module';
import { PolicyCategoryGroupModule } from './master/policy_category_group/policy_category_group.module';
import { PolicyModule } from './master/policy/policy.module';
import { MembersModule } from './master/members/members.module';
import { PriceItemsModule } from './master/price_items/price_items.module';
import { ServiceTaskModule } from './master/service_task/service_task.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [],
      autoLoadModels: true,
      synchronize: true,
    }),
    RegionsModule,
    AddressModule,
    CategoryGroupModule,
    CountryModule,
    ProvincesModule,
    CityModule,
    PolicyCategoryGroupModule,
    PolicyModule,
    MembersModule,
    PriceItemsModule,
    ServiceTaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
