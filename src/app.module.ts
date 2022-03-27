import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RestaurantController } from './modules/restaurant/restaurant.module';
import { RestaurantService } from './modules/restaurant/restaurant.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantEntity } from './entities/restaurant.entity';
import { UserEntity } from './entities/user.entity';

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
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class AppModule {}
