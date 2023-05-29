import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { UserModel } from './user.model';
import { UserService } from './user.service';
import { UserDto } from './user.dto';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserModel)
  async getusers(@Args('id')id:string): Promise<UserModel> {
    return await this.userService.getUsers(id);
  }

  @Mutation(() => UserModel)
  async createUser(@Args('data') data: UserDto):Promise<UserModel>{
    return  await this.userService.createUser(data);
  }

  @Mutation(() => UserModel)
  async updateUser(@Args('id') id: string, @Args('input') input: UserDto): Promise<UserModel> {
    return await this.userService.updateUser(id, input);
  }

  @Mutation(() =>UserModel)
  async deleteuser(@Args('id') id: string): Promise<UserModel> {
    return await this.userService.delete(id);
  }

  @Query(() =>String)
  async stringReturnType(@Args('id') id: string): Promise<string>{
    return await this.userService.stringReturnType(id)
  }
}






