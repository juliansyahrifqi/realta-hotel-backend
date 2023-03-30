import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { RegionsModule } from './regions/regions.module';
import { AddressModule } from './address/address.module';
import { CategoryGroupModule } from './category_group/category_group.module';
import { CountryModule } from './country/country.module';
import { ProvincesModule } from './provinces/provinces.module';
import { CityModule } from './city/city.module';
import { PolicyCategoryGroupModule } from './policy_category_group/policy_category_group.module';
import { PolicyModule } from './policy/policy.module';
import { MembersModule } from './members/members.module';
import { PriceItemsModule } from './price_items/price_items.module';
import { ServiceTaskModule } from './service_task/service_task.module';

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
