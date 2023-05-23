import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserModel } from 'src/user/user.model';

@ObjectType()
export class OrganizationModel {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  phone: string;

  @Field({ nullable: true })
  address: string;
  
  @Field(() => [UserModel], { nullable: true })
  user: UserModel[];



}