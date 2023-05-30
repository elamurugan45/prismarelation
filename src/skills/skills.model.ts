import { ObjectType, Field, ID } from '@nestjs/graphql';
import { tagsModel } from '../tags/tags.model';


@ObjectType()
export class skillsModel {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field(() => [tagsModel], { nullable: true })
  tags?: tagsModel[];

  @Field({ nullable: true })
  employeeCount?: number;
}