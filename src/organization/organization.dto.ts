import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class OrganizationDto {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  phone: string;

  @Field(() => String, { nullable: true })
  address: string;
 
  @Field(()=> String, { nullable: true })
  userId: string;
 
}