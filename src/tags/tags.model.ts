import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserModel } from 'src/user/user.model';

@ObjectType()
export class tagsModel {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  name?: string;
}