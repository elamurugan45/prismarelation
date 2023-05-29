import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class skillsDto {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(()=> String, { nullable: true })
  tagsId: string;

}