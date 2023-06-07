import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SkillsDto {
  @Field( { nullable: true })
  name?: string;

  @Field(()=> [String], { nullable: true })
  tagsId?: string[];

}