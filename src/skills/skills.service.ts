import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Types } from '@prisma/client/runtime';
import { GetArgs } from './skills.args';
import { SkillsDto } from './skills.dto';
import { SkillsModel } from './skills.model';


@Injectable()
export class skillsService {



  constructor(private readonly prisma: PrismaService) { }


  async createskills(data: SkillsDto): Promise<SkillsModel> {

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

  async update(id: string, data: SkillsDto): Promise<SkillsModel> {

    const skills = await this.prisma.skills.update({
      where: {
        id
      },
      include: {
        tags: true
    },data});
    return skills;
  }
  async getskills(): Promise<SkillsModel[]> {
    console.log()
    const skills = await this.prisma.skills.findMany({
      where: {
        archived:false
      }, include: {
        tags: true
      }
    });
    return skills 
  }
  async deleteSkill(id: string): Promise<SkillsModel> {
    return await this.prisma.skills.update({
      where: { id },
      data: {
        archived: true,
      },
    });
  }
}