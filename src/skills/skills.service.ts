import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { skillsModel } from './skills.model';
import { skillsDto } from './skills.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Types } from '@prisma/client/runtime';
import { GetArgs } from './skills.args';


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
  async getskills(id:GetArgs): Promise<skillsModel[]> {
    console.log(id?.id)
    const skills = await this.prisma.skills.findMany({
      where: {
        id:id?.id
      }, include: {
        tags: true
      }
    });
    return skills 
  }
  async delete(id:GetArgs): Promise<skillsModel> {
    return await this.prisma.skills.update({
      where: {
        id:id?.id
      },
      data: {
        archived: true
      }
    });
  }
}