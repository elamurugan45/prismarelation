import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { employeeModel } from './employee.model';
import { employeeDto, skillsFilter } from './employee.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Types } from '@prisma/client/runtime';
import { skillsModel } from '../skills/skills.model';
import { tagsModel } from '../tags/tags.model';


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
    return employee;
  }

  async update(id: string, data: employeeDto): Promise<employeeModel> {

    const employee = await this.prisma.employee.update({
      where: {
        id},
data});
    return employee;
  }
  async getemployee(filter): Promise<employeeModel[]> {

  let filterQuery: Prisma.employeeWhereInput
    if (filter?.skillId) {
      filterQuery = {
      ...filterQuery,
      skillsId:{
        hasSome:filter?.skillId
      }}


    const employee = await this.prisma.employee.findMany({
      where: {
        ...filterQuery,
        archived:false,
      }, include: {
        skills: true,
        tags:true,
      },
      orderBy:[{ name:'desc'},{id:'asc'}]
    });
    return employee;
  }}
  async delete(id: string): Promise<employeeModel> {
    return await this.prisma.employee.update({
      where: {
        id
      },
      data: {
        archived: true
      }
    });
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
          $match:{
            archived:false,
          },
        },
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
          $match:{
            'skill.archived':false,
          },
        },
        {
          $project: {
            _id: "$skill._id",
            name: "$skill.name",
            employeeCount: "$count",
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
            id: {$toString:"$_id._id"},
            employeeCount: "$count",
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
          $match:{
            archived:false,
          },
        },
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
          $match:{
            'skills.archived':false,
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
          $match:{
            'tags.archived':false,
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
            id:{$toString:'$_id.tagsId._id'},
            name: '$_id.tagsId.name',
            employeeCount: '$count',
          },
        },
      ],
    });
    console.log(TagWithCount);
    return TagWithCount as unknown as tagsModel[];
  }
}

