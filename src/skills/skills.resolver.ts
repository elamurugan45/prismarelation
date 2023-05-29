import { Resolver, Args, Mutation, Query, ID } from '@nestjs/graphql';
import { skillsModel } from './skills.model';
import { skillsService } from './skills.service';
import { skillsDto } from './skills.dto';

@Resolver(() => skillsModel)
export class skillsResolver {
  constructor(private readonly skillsService: skillsService) { }

  @Mutation(() => skillsModel)
  async createskills(@Args('data') data: skillsDto) {
    return await this.skillsService.createskills(data);
  }

  @Mutation(() => skillsModel)
  async updateskills(@Args('id') id: string, @Args('input') input: skillsDto): Promise<skillsModel> {
    return await this.skillsService.update(id, input);
  }

  @Query(() => [skillsModel])
  async getskills(@Args('id')id:string): Promise<skillsModel[]> {
    return await this.skillsService.getskills(id);
  }
  @Mutation(() =>skillsModel)
  async deleteskills(@Args('id') id: string): Promise<skillsModel> {
    return await this.skillsService.delete(id);
  }

}
