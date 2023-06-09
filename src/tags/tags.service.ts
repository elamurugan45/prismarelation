import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { tagsModel } from './tags.model';
import { tagsDto } from './tags.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Types } from '@prisma/client/runtime';


@Injectable()
export class tagsService {



  constructor(private readonly prisma: PrismaService) { }


  async createtags(data: tagsDto): Promise<tagsModel> {

    const tags = await this.prisma.tags.create({
      data
    });
    return tags as unknown as tagsModel;
  }

  async update(id: string, data: tagsDto): Promise<tagsModel> {

    const tags = await this.prisma.tags.update({
      where: {
        id
      },
      data});
    return tags as unknown as unknown as tagsModel;
  }
  async gettags(id:string): Promise<tagsModel[]> {
    const users = await this.prisma.tags.findMany({
      where: {
        id
      }
      }
    );
    return users as unknown as tagsModel[]
  }
  async delete(id: string): Promise<tagsModel> {
    return await this.prisma.tags.update({
      where: {
        id
      },
      data: {
        archived: true
      }
    }) as unknown as tagsModel;
  }
}