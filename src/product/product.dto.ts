import { Field, InputType } from '@nestjs/graphql';
import { Category } from './product.constant';

@InputType()
export class ProductDto {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => Number, { nullable: true })
  price?: number;

  @Field(() => [Category], { nullable: true })
  category: Category[];

  @Field(() => String, { nullable: true })
  userId: string;
}


@InputType()
export class CategoryFilter {
  @Field(() => String, { nullable: true })
  search?: string;

  @Field(() => Category, { nullable: true })
  category?: Category;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date,{ nullable: true })
  updatedAt?: Date;

}
