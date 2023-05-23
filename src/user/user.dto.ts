import { InputType, Field } from '@nestjs/graphql';
import { OrganizationModel } from 'src/organization/organization.model';

@InputType()
export class UserDto {
  @Field(() => String,{ nullable: true})
  name?: string;

  @Field(() => String,{ nullable: true})
  password?: string;

  @Field(() => String,{ nullable: true})
  email: string;

  @Field(() => [String])
  organizationId:string[];
  
}
