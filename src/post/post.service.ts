import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { PostModel } from './post.model';
import { PostDto } from './post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {


  constructor(private readonly prisma: PrismaService) { }

  async createPost(data: PostDto): Promise<PostModel> {
    console.log(data)
    const post = await this.prisma.post.create({
      data
    });
    return post as unknown as PostModel;
  }
  async getPosts(): Promise<PostModel[]> {
    let select: Prisma.PostSelect
    return await this.prisma.post.findMany({
      where: {
        archived: false
      },
      // include: {
      //   user: true
      // }
    }) as unknown as PostModel[]
  }
  async updatePost(id: string, data: PostDto): Promise<PostModel> {

    const post = await this.prisma.post.update({
      where: {
        id
      },
      data
    });
    return post as unknown as PostModel;
  }

  async delete(id: string): Promise<PostModel> {
    return await this.prisma.post.update({
      where: {
        id
      },
      data: {
        archived: true
      }
    }) as unknown as PostModel;
  }
}