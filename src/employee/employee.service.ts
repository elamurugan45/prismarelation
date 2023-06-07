import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Types } from '@prisma/client/runtime';
import { EmployeeDto, SkillFilter } from './employee.dto';
import { EmployeeModel } from './employee.model';
import { SkillsModel } from '../skills/skills.model';
import { TagsModel } from '../tags/tags.model';


@Injectable()
export class employeeService {



  constructor(private readonly prisma: PrismaService) { }


  async createemployee(data: EmployeeDto): Promise<EmployeeModel> {

    const employee = await this.prisma.employee.create({
      data: {
        ...data,
        skillsId: {
          set: data?.skillsId
        }
      }
    });
    return employee;
  }

  async update(id: string, data: EmployeeDto): Promise<EmployeeModel> {

    const employee = await this.prisma.employee.update({
      where: {
        id
      },
      data
    });
    return employee;
  }

  async getEmployee(id: string): Promise<EmployeeModel> {
    return (await this.prisma.employee.findUnique({
      where: { id: id },
      include: {
        skills: true,
      },
    }));
  }

  async getemployee(filter?: SkillFilter): Promise<EmployeeModel[]> {

    let filterQuery: Prisma.EmployeeWhereInput = {};
    if (filter?.skillId) {
      filterQuery = {
        ...filterQuery,
        skillsId: {
          hasSome: filter?.skillId,
        }
      }
    }
    const employee = await this.prisma.employee.findMany({
      where: {
        ...filterQuery,
        archived: false,
      }, include: {
        skills: true,
      },
      orderBy: [{ name: 'desc' }]
    });
    console.log(employee)
    return employee;
  }
  async delete(id: string): Promise<EmployeeModel> {
    return await this.prisma.employee.update({
      where: {
        id
      },
      data: {
        archived: true
      }
    });
  }

  async count(): Promise<Number> {
    return await this.prisma.employee.count({
      where: {
        archived: false,
      }
    })
  }
  async getTopSkillsWithCount(): Promise<SkillsModel[]> {
    const skillWithCount = await this.prisma.employee.aggregateRaw({
      pipeline: [
        {
          $match: {
            archived: false,
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
            from: "Skills",
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
          $match: {
            'skill.archived': false,
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
            id: { $toString: "$_id._id" },
            employeeCount: "$count",
            name: "$_id.name",
          },
        },
        {
          $sort: {
            count: -1
          }
        }
      ]
    });
    console.log(skillWithCount);
    return skillWithCount as unknown as SkillsModel[];
  }
  async gettagsWithCount(): Promise<TagsModel[]> {
    const TagWithCount = await this.prisma.employee.aggregateRaw({
      pipeline: [
        {
          $match: {
            archived: false,
          },
        },
        {
          $lookup: {
            from: 'Skills',
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
          $match: {
            'skills.archived': false,
          },
        },
        {
          $lookup: {
            from: 'Tags',
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
          $match: {
            'tags.archived': false,
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
            id: { $toString: '$_id.tagsId._id' },
            name: '$_id.tagsId.name',
            employeeCount: '$count',
          },
        },
      ],
    });
    console.log(TagWithCount);
    return TagWithCount as unknown as TagsModel[];
  }
}

