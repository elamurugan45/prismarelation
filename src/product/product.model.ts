import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserModel } from 'src/user/user.model';
import { Category } from './product.constant';

@ObjectType()
export class ProductModel {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  price: number;

  @Field(() => [Category])
  category: Category[];

  @Field({ nullable: true })
  userId: string;

  @Field(() => UserModel, { nullable: true })
  user: UserModel;

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date,{ nullable: true })
  updatedAt?: Date
}