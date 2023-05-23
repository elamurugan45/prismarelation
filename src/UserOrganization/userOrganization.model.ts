import { ObjectType, Field, } from '@nestjs/graphql';


@ObjectType()
export class UserOrganizationModel {
  @Field({ nullable: true })
  id?: string;

  @Field({nullable:true})
  userId?: string;

  @Field({nullable:true})
  organizationId?:string;
}
