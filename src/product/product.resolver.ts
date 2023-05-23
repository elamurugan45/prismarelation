import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { ProductModel } from './product.model';
import { ProductService } from './product.service';
import { CategoryFilter, ProductDto } from './product.dto';


@Resolver(() => ProductModel)
export class ProductResolver {
  constructor(private readonly productService: ProductService) { }

 
  @Query(() => [ProductModel])
  async getProducts(): Promise<ProductModel[]> {
    return await this.productService.getProducts();
  }


  @Query(() => [ProductModel])
  async getCategoryFilter(@Args('filter', { nullable: true }) filter: CategoryFilter): Promise<ProductModel[]> {
    return await this.productService.getCategoryFilter(filter);
  }

  @Mutation(() => ProductModel)
  async createProduct(@Args('data') data: ProductDto) {
    return await this.productService.createProduct(data);
  }

  @Mutation(() => ProductModel)
  async updateProduct(@Args('id') id: string, @Args('input') input: ProductDto): Promise<ProductModel> {
    return await this.productService.updateProduct(id, input);
  }

  @Mutation(() => ProductModel)
  async deleteProduct(@Args('id') id: string): Promise<ProductModel> {
    return await this.productService.delete(id);
  }
}






