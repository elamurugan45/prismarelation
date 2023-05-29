import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { UserModel } from './user.model';
import { UserDto } from './user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {


  constructor(private readonly prisma: PrismaService) { }

  async createUser(data: UserDto): Promise<UserModel> {
    console.log(data)
    const user = await this.prisma.user.create({

      data,

    });
    return user as unknown as UserModel;
  }
  async getUsers(id:string): Promise<UserModel> {
   
    const organization =await this.prisma.user.findFirst({
      where: {
        id
      }, include: {
        organization: true
      }
    });return organization as unknown as UserModel
  }
  async updateUser(id: string, data: UserDto): Promise<UserModel> {

    const user = await this.prisma.user.update({
      where: {
        id
      },
      include: {
        organization: true
      },
      data: {
        ...data,
        organizationId: {
          push: data?.organizationId
        }
      }
    });
    return user as unknown as UserModel;
  }

  async delete(id: string): Promise<UserModel> {
    return await this.prisma.user.update({
      where: {
        id
      },
      data: {
        archived: true
      }
    }) as unknown as UserModel;
  }

  async stringReturnType(id: string): Promise<string>{
    if (id) return 'user created'
  }
}