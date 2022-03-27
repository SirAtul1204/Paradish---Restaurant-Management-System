import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { RestaurantEntity } from './restaurant.entity';

export type TRole = 'OWNER' | 'WAITER';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, unique: true })
  phoneNumber: number;

  @Column({ nullable: false })
  role: TRole;

  @Column({ nullable: false })
  restaurantId: string;

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.users)
  @JoinColumn({ name: 'restaurantId', referencedColumnName: 'id' })
  restaurant: RestaurantEntity;
}
