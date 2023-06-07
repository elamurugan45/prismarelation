import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class EmployeeDto {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  phone?: string;

  @Field(() => String, { nullable: true })
  email?: string;
  
  @Field(() => Date, { nullable: true })
  DOJ?: Date;

  @Field(() => Date, { nullable: true })
  DOB?: Date;

  @Field(()=> [String], { nullable: true })
  skillsId?: string[];
}


@InputType()
export class SkillFilter {
  

  @Field(() => String, { nullable: true })
  skillId?: string;
}