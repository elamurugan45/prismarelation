import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { ProductModel } from './product.model';
import { CategoryFilter, ProductDto } from './product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Category } from './product.constant';
import { startWith } from 'rxjs';
import { DateTime } from 'luxon';
// import { add, startOfWeek, endOfWeek } from 'date-fns';

@Injectable()
export class ProductService {


  constructor(private readonly prisma: PrismaService) { }

  async createProduct(data: ProductDto): Promise<ProductModel> {
    console.log(data)
    const product = await this.prisma.product.create({
      data: {
        ...data,
        category: data?.category as unknown as Category[]
      }
    });
    return product as unknown as ProductModel;
  }
  async sortName(search: string): Promise<ProductModel>{
   const products = await this.prisma.product.findMany({
    where: {
      name: {contains: search,mode:Prisma.QueryMode.insensitive},
    },
    orderBy: {
      name: 'asc',
    },
   });return products as unknown as ProductModel;
  }
  async getProducts(): Promise<ProductModel[]> {
    let select: Prisma.ProductSelect
    return await this.prisma.product.findMany({
      where: {
        archived: false
      },

  }) as unknown as ProductModel[]
   }

  async getCategoryFilter(filter: CategoryFilter): Promise<ProductModel[]> {
    let filterQuery: Prisma.ProductWhereInput
    if (filter?.search) {
      filterQuery = {
        OR: [
          {
            name: {
              contains: filter?.search, mode: Prisma.QueryMode.insensitive
            }
          },

        ]
      }
    }

    if (filter?.category) {
      filterQuery = {
        ...filterQuery,
        category: {
          has: filter?.category
        }
      }
    }
  
    if (filter?.createdAt){
      filterQuery={
        ...filterQuery,
        createdAt:{
          lte:filter.createdAt,
          gte:filter.createdAt
        }
      }
    }

    if (filter?.updatedAt){
      filterQuery={
        ...filterQuery,
        updatedAt:{
          lte:filter.updatedAt,
          gte:filter.updatedAt
        }
      }
    }


    // if (filter?.createdAt) {
    //   const startDate = startOfWeek(filter.createdAt);
    //   const endDate = endOfWeek(filter.createdAt);
  
    //   filterQuery = {
    //     ...filterQuery,
    //     createdAt: {
    //       lte: endDate,
    //       gte: startDate,
    //     },
    //   };
    // }

    // if (filter?.updatedAt) {
    //   const startDate = startOfWeek(filter.updatedAt);
    //   const endDate = endOfWeek(filter.updatedAt);
  
    //   filterQuery = {
    //     ...filterQuery,
    //     updatedAt: {
    //       lte: endDate,
    //       gte: startDate,
    //     },
    //   };
    // }
    
    if (filter?.createdAt) {
      const startDate = DateTime.fromJSDate(filter.createdAt).startOf('week').toJSDate();
      const endDate = DateTime.fromJSDate(filter.createdAt).endOf('week').toJSDate();
  
      filterQuery = {
        ...filterQuery,
        createdAt: {
          lte: endDate,
          gte: startDate,
        },
      };
    }

    if (filter?.updatedAt) {
      const startDate = DateTime.fromJSDate(filter.updatedAt).startOf('week').toJSDate();
      const endDate = DateTime.fromJSDate(filter.updatedAt).endOf('week').toJSDate();
  
      filterQuery = {
        ...filterQuery,
        updatedAt: {
          lte: endDate,
          gte: startDate,
        },
      };
    }
   

    return await this.prisma.product.findMany({
      where: {
        ...filterQuery,
        archived: false,
      },

    }) as unknown as ProductModel[]
  }
  
  async updateProduct(id: string, data: ProductDto): Promise<ProductModel> {

    const product = await this.prisma.product.update({
      where: {
        id
      },
      data: {
        ...data,
        category: data?.category as unknown as Category
      }
    });
    return product as unknown as ProductModel;
  }

  async delete(id: string): Promise<ProductModel> {
    return await this.prisma.product.update({
      where: {
        id
      },
      data: {
        archived: true
      }
    }) as unknown as ProductModel;
  }
}