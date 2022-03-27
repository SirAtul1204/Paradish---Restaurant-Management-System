import { Body, Controller, Get, Post } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  async get() {
    return await this.restaurantService.get();
  }

  @Post()
  async createRestaurant(@Body() body) {
    return await this.restaurantService.create(body);
  }
}
