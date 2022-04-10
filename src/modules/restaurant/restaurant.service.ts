import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { RestaurantEntity } from '../../entities/restaurant.entity';
import { UserEntity } from '../../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ALL_OK } from '../../contants';

interface CreateArguments {
  ownerEmail: string;
  ownerName: string;
  phoneNumber: number;
  restaurantName: string;
  restaurantAddress: string;
  password: string;
}

@Injectable()
export class RestaurantService {
  async get() {
    return 'Working as expected';
  }

  async create({
    ownerEmail,
    ownerName,
    phoneNumber,
    restaurantName,
    restaurantAddress,
    password,
  }: CreateArguments) {
    if (
      await UserEntity.findOne({
        where: [
          {
            email: ownerEmail,
          },
          {
            phoneNumber: phoneNumber,
          },
        ],
      })
    )
      throw new ConflictException('Email or Phone Number already exists');

    const restaurant = new RestaurantEntity();
    restaurant.name = restaurantName;
    restaurant.address = restaurantAddress;
    await restaurant.save();

    password = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));

    const owner = new UserEntity();
    owner.role = 'OWNER';
    owner.email = ownerEmail;
    owner.name = ownerName;
    owner.phoneNumber = phoneNumber;
    owner.password = password;
    owner.restaurant = restaurant;
    await owner.save();
    return { message: ALL_OK, data: 'Restaurant Registered successfully' };
  }
}
