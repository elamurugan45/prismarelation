import { InputType, Field } from '@nestjs/graphql';
import { skillsModel } from 'src/skills/skills.model';

@InputType()
export class employeeDto {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  phone: string;

  @Field(() => String, { nullable: true })
  email: string;
  
  @Field(() => Date, { nullable: true })
  DOJ: Date;

  @Field(() => Date, { nullable: true })
  DOB: Date;

  @Field(()=> [String], { nullable: true })
  skillsId: string[];
}


@InputType()
export class skillsFilter {
  @Field(() => String, { nullable: true })
  search?: string;

  @Field(() => String, { nullable: true })
  skillId?: string;
}