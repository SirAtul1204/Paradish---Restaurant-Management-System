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
      host: 'ec2-18-215-96-22.compute-1.amazonaws.com',
      database: 'd81q5s4qmtc5vf',
      username: 'kzgtyhwnqhostc',
      port: 5432,
      password:
        '387f79988193173cdf64e2e43aabde16c5951f875fd21a06453532cc1cc32419',
      // url: 'postgres://kzgtyhwnqhostc:387f79988193173cdf64e2e43aabde16c5951f875fd21a06453532cc1cc32419@ec2-18-215-96-22.compute-1.amazonaws.com:5432/d81q5s4qmtc5vf',
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
