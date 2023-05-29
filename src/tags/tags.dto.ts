import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class tagsDto {
  @Field(() => String, { nullable: true })
  name?: string;

}