import { Injectable } from '@nestjs/common';

interface CreateArguments {
  ownerEmail: string;
  ownerName: string;
  phoneNumber: number;
  restaurantName: string;
  restaurantAddress: string;
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
  }: CreateArguments) {}
}
