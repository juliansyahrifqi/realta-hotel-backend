import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users/users.module';
import { UserMembersModule } from './users/user-members/user-members.module';
import { UserBonusPointsModule } from './users/user-bonus-points/user-bonus-points.module';
import { RolesModule } from './users/roles/roles.module';
import { UserPasswordModule } from './users/user-password/user-password.module';
import { AuthModule } from './users/auth/auth.module';
import { JwtMiddleware } from './users/auth/jwt.middleware';

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
    UsersModule,
    UserMembersModule,
    UserBonusPointsModule,
    RolesModule,
    UserPasswordModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude(
        { path: 'users/signUpGuest', method: RequestMethod.POST },
        { path: 'users/signUpEmployee', method: RequestMethod.POST },
        'auth/(.*)',
      )
      .forRoutes('*');
  }
}
