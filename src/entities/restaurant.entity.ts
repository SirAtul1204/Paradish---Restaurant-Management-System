import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class RestaurantEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  address: string;

  @OneToMany(() => UserEntity, (user) => user.restaurant)
  users: UserEntity[];
}
