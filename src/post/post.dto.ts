import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class PostDto {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  content: string;

  @Field(() => String, { nullable: true })
  userId: string;

}


