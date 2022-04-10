import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RestaurantController } from './modules/restaurant/restaurant.controller';
import { RestaurantService } from './modules/restaurant/restaurant.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantEntity } from './entities/restaurant.entity';
import { UserEntity } from './entities/user.entity';
import { UserController } from './modules/user/user.controller';
import { UserService } from './modules/user/user.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [RestaurantEntity, UserEntity],
      synchronize: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
  ],
  controllers: [RestaurantController, UserController],
  providers: [RestaurantService, UserService],
})
export class AppModule {}
