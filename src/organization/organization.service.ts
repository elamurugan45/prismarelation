import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { OrganizationModel } from './Organization.model';
import { OrganizationDto } from './Organization.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Types } from '@prisma/client/runtime';


@Injectable()
export class OrganizationService {



  constructor(private readonly prisma: PrismaService) { }


  async createOrganization(data: OrganizationDto): Promise<OrganizationModel> {

    const organization = await this.prisma.organization.create({
      data
    });
    return organization as unknown as OrganizationModel;
  }

  async update(id: string, data: OrganizationDto): Promise<OrganizationModel> {

    const organization = await this.prisma.organization.update({
      where: {
        id
      },
      include: {
        user: true
    },data});
    return organization as unknown as unknown as OrganizationModel;
  }
  async getOrganizations(id:string): Promise<OrganizationModel[]> {
    const users = await this.prisma.organization.findMany({
      where: {
        id
      }, include: {
        user: true
      }
    });
    return users as unknown as OrganizationModel[]
  }
  async delete(id: string): Promise<OrganizationModel> {
    return await this.prisma.organization.update({
      where: {
        id
      },
      data: {
        archived: true
      }
    }) as unknown as OrganizationModel;
  }
}