import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class TagsDto {
  @Field(() => String, { nullable: true })
  name?: string;

}