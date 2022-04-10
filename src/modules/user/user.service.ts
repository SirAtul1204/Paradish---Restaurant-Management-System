import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserEntity } from '../../entities/user.entity';
import { ALL_OK } from '../../contants';

interface loginArguments {
  email: string;
  password: string;
}

interface addArguments {
  name: string;
  email: string;
  phoneNumber: number;
  role: string;
  restaurantId: string;
}

let count = 1;

@Injectable()
export class UserService {
  async login({ email, password }: loginArguments) {
    const user = await UserEntity.findOne({
      where: {
        email,
      },
      select: ['id', 'password'],
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
      });
      return {
        message: ALL_OK,
        data: {
          token,
        },
      };
    } else throw new UnauthorizedException('email or password is wrong');
  }

  async verify(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      console.log('fuunction invoked' + count);
      count++;
      if (err) throw new UnauthorizedException('Wrong/Invalid token');
      const user = await UserEntity.findOne({
        where: {
          id: decoded.id,
        },
        select: ['id', 'name', 'role'],
      });
      if (!user) throw new UnauthorizedException('Wrong / Invalid token');
      return { message: ALL_OK, data: user };
    });
  }

  async add({ name, email, phoneNumber, role, restaurantId }: addArguments) {
    if (
      !(await UserEntity.findOne({
        where: {
          email,
          phoneNumber,
        },
      }))
    )
      throw new ConflictException('user already exists');
  }
}
