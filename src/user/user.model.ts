import { ObjectType, Field, ID } from '@nestjs/graphql';
import { OrganizationModel } from 'src/organization/organization.model';

@ObjectType()
export class UserModel {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password: string;

  @Field(() => [String], { nullable: true })
  organizationId: string[];

  @Field(() => [OrganizationModel], { nullable: true })
  organization: OrganizationModel[];

}