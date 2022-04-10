import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { RestaurantEntity } from './restaurant.entity';

export type TRole = 'OWNER' | 'WAITER';

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, unique: true, type: 'bigint' })
  phoneNumber: number;

  @Column({ nullable: false })
  role: TRole;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ nullable: false })
  restaurantId: string;

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.users, {
    lazy: true,
  })
  @JoinColumn({ name: 'restaurantId', referencedColumnName: 'id' })
  restaurant: RestaurantEntity;
}
