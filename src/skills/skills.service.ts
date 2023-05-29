import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { skillsModel } from './skills.model';
import { skillsDto } from './skills.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Types } from '@prisma/client/runtime';


@Injectable()
export class skillsService {



  constructor(private readonly prisma: PrismaService) { }


  async createskills(data: skillsDto): Promise<skillsModel> {

    const skills = await this.prisma.skills.create({
      data:{
        ...data,
        tagsId:{
          set:data?.tagsId
        }
      }
    });
    return skills as unknown as skillsModel;
  }

  async update(id: string, data: skillsDto): Promise<skillsModel> {

    const skills = await this.prisma.skills.update({
      where: {
        id
      },
      include: {
        tags: true
    },data});
    return skills as unknown as unknown as skillsModel;
  }
  async getskills(id:string): Promise<skillsModel[]> {
    const users = await this.prisma.skills.findMany({
      where: {
        id
      }, include: {
        tags: true
      }
    });
    return users as unknown as skillsModel[]
  }
  async delete(id: string): Promise<skillsModel> {
    return await this.prisma.skills.update({
      where: {
        id
      },
      data: {
        archived: true
      }
    }) as unknown as skillsModel;
  }
}