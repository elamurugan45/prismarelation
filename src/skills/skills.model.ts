import { ObjectType, Field, ID } from '@nestjs/graphql';
import { TagsModel,  } from '../tags/tags.model';


@ObjectType()
export class SkillsModel {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field(() => [TagsModel], { nullable: true })
  tags?: TagsModel[];

  @Field({ nullable: true })
  employeeCount?: number;
}