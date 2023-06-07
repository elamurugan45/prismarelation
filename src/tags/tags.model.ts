import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class TagsModel {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  employeeCount?: number;
}