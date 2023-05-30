import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { employeeModel } from './employee.model';
import { employeeDto, skillsFilter } from './employee.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Types } from '@prisma/client/runtime';
import { skillsModel } from 'src/skills/skills.model';
import { tagsModel } from 'src/tags/tags.model';


@Injectable()
export class employeeService {



  constructor(private readonly prisma: PrismaService) { }


  async createemployee(data: employeeDto): Promise<employeeModel> {

    const employee = await this.prisma.employee.create({
      data:{
        ...data,
        skillsId:{
          set:data?.skillsId
        }
      }
    });
    return employee as unknown as employeeModel;
  }

  async update(id: string, data: employeeDto): Promise<employeeModel> {

    const employee = await this.prisma.employee.update({
      where: {
        id},
data});
    return employee as unknown as unknown as employeeModel;
  }
  async getemployee(filter): Promise<employeeModel[]> {

  let filterQuery: Prisma.employeeWhereInput
    if (filter?.skillId) {
      filterQuery = {
      ...filterQuery,
      skillsId:{
        hasSome:filter?.skillId
      }}


    const users = await this.prisma.employee.findMany({
      where: {
        ...filterQuery,
        archived:false,
      }, include: {
        skills: true,
        tags:true,
      },
      orderBy:[{ name:'desc'},{id:'asc'}]
    });
    return users as unknown as employeeModel[]
  }}
  async delete(id: string): Promise<employeeModel> {
    return await this.prisma.employee.update({
      where: {
        id
      },
      data: {
        archived: true
      }
    }) as unknown as employeeModel;
  }

  async count():Promise<Number>{
    return await this.prisma.employee.count({
      where:{
        archived:false,
      }
    })
  }
  async getTopSkillsWithCount(): Promise<skillsModel[]> {
    const skillWithCount = await this.prisma.employee.aggregateRaw({
      pipeline: [
        {
          $unwind: {
            path: "$skillsId",
            includeArrayIndex: "string",
            preserveNullAndEmptyArrays: false,
          },
        },
        {
          $lookup: {
            from: "skills",
            localField: "skillsId",
            foreignField: "_id",
            as: "skill",
          },
        },
        {
          $unwind: {
            path: "$skill",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: "$skill._id",
            name: "$skill.name",
            count: "$count",
          },
        },
        {
          $group: {
            _id: {
              _id: "$_id",
              name: "$name",
            },
            count: {
              $count: {},
            },
          },
        },
        {
          $project: {
            _id: "$_id._id",
            count: "$count",
            name: "$_id.name",
          },
        },
        {
          $sort:{
            count:-1
          }
        }
      ]
    });
    console.log(skillWithCount);
    return skillWithCount as unknown as skillsModel[];
  }
  async gettagsWithCount(): Promise<tagsModel[]> {
    const TagWithCount = await this.prisma.employee.aggregateRaw({
      pipeline: [
        {
          $lookup: {
            from: 'skills',
            localField: 'skillsId',
            foreignField: '_id',
            as: 'skills',
          },
        },
        {
          $unwind: {
            path: '$skills',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: 'tags',
            localField: 'skills.tagsId',
            foreignField: '_id',
            as: 'tags',
          },
        },
        {
          $unwind: {
            path: '$tags',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $group: {
            _id: {
              tagsId: '$tags',
            },
            count: {
              $count: {},
            },
          },
        },
        {
          $project: {
            name: '$_id.tagsId.name',
            count: '$count',
          },
        },
      ],
    });
    console.log(TagWithCount);
    return TagWithCount as unknown as tagsModel[];
  }
}

