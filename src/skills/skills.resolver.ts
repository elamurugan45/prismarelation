import { Resolver, Args, Mutation, Query, ID } from '@nestjs/graphql';
import { skillsService } from './skills.service';
import { GetArgs } from './skills.args';
import { SkillsModel } from './skills.model';
import { SkillsDto } from './skills.dto';

@Resolver(() => SkillsModel)
export class skillsResolver {
  constructor(private readonly skillsService: skillsService) { }

  @Mutation(() => SkillsModel)
  async createskills(@Args('data') data: SkillsDto) {
    return await this.skillsService.createskills(data);
  }

  @Mutation(() => SkillsModel)
  async updateskills(@Args('id') id: string, @Args('input') input: SkillsDto): Promise<SkillsModel> {
    return await this.skillsService.update(id, input);
  }

  @Query(() => [SkillsModel])
  async getskills() : Promise<SkillsModel[]> {
    return await this.skillsService.getskills();
  }
  @Mutation(() => SkillsModel)
  async deleteSkill(@Args('id') id: string): Promise<SkillsModel> {
    return await this.skillsService.deleteSkill(id);
  }
}
