import { DataSource } from 'typeorm';
import { RestaurantEntity } from './entities/restaurant.entity';
import { UserEntity } from './entities/user.entity';
import { config } from 'dotenv';

config();
const resetDB = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [RestaurantEntity, UserEntity],
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  synchronize: true,
});

resetDB
  .initialize()
  .then(async () => {
    await UserEntity.delete({});
    await RestaurantEntity.delete({});
  })
  .catch((e) => console.log(e));
