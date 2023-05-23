import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserModel } from 'src/user/user.model';

@ObjectType()
export class PostModel {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  content: string;

  @Field({ nullable: true })
  userId: string;

  @Field(() => UserModel, { nullable: true })
  user: UserModel;

}