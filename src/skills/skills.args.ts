import { ArgsType, Field } from "@nestjs/graphql";


@ArgsType()
export class GetArgs{
 @Field({ nullable: true })
  id: string;
}