import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { skillsModel } from 'src/skills/skills.model';
import { tagsModel } from 'src/tags/tags.model';

@ObjectType()
export class employeeModel {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  DOJ: Date;

  @Field({ nullable: true })
  DOB: Date;
 
  @Field({ nullable: true })
  age: number;
  

  @Field(() => [skillsModel], { nullable: true })
  skills: skillsModel[];

  @Field(() => [tagsModel], { nullable: true })
  tags: tagsModel[];
  
 
}

@ObjectType()
export class employeeCount {
  @Field(() => [String])
  skills: string[];

  @Field(() => Float)
  count: number;
}
