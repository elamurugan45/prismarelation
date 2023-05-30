import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { skillsModel } from './skills.model';
import { skillsDto } from './skills.dto';
import { PrismaService } from '../prisma/prisma.service';
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
    return skills ;
  }

  async update(id: string, data: skillsDto): Promise<skillsModel> {

    const skills = await this.prisma.skills.update({
      where: {
        id
      },
      include: {
        tags: true
    },data});
    return skills;
  }
  async getskills(id:string): Promise<skillsModel[]> {
    const skills = await this.prisma.skills.findMany({
      where: {
        id
      }, include: {
        tags: true
      }
    });
    return skills 
  }
  async delete(id: string): Promise<skillsModel> {
    return await this.prisma.skills.update({
      where: {
        id
      },
      data: {
        archived: true
      }
    });
  }
}