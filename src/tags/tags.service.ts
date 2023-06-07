import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Types } from '@prisma/client/runtime';
import { TagsDto } from './tags.dto';
import { TagsModel } from './tags.model';


@Injectable()
export class tagsService {



  constructor(private readonly prisma: PrismaService) { }


  async createtags(data: TagsDto): Promise<TagsModel> {

    const tags = await this.prisma.tags.create({
      data
    });
    return tags ;
  }

  async update(id: string, data: TagsDto): Promise<TagsModel> {

    const tags = await this.prisma.tags.update({
      where: {
        id
      },
      data});
    return tags ;
  }
  async gettags(): Promise<TagsModel[]> {
    const tags = await this.prisma.tags.findMany({
      where: {
archived:false
      }
      }
    );
    return tags 
  }
  async delete(id: string): Promise<TagsModel> {
    return await this.prisma.tags.update({
      where: {
        id
      },
      data: {
        archived: true
      }
    }) ;
  }
}