import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { SkillsModel,  } from '../skills/skills.model';
import { TagsModel } from '../tags/tags.model';

@ObjectType()
export class EmployeeModel {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  DOJ?: Date;

  @Field({ nullable: true })
  DOB?: Date;
 
  @Field({ nullable: true })
  age?: number;
  

  @Field(() => [SkillsModel], { nullable: true })
  skills?: SkillsModel[];

  @Field(() => [TagsModel], { nullable: true })
  tags?: TagsModel[];
  
 
}

@ObjectType()
export class EmployeeCount {
  @Field(() => [String])
  skills?: string[];

  @Field(() => [String])
  tags?: string[];


  @Field(() => Float)
  employeecount?: number;
}
