import { Resolver, Args, Mutation, Query, ID } from '@nestjs/graphql';
import { tagsService } from './tags.service';
import { TagsModel } from './tags.model';
import { TagsDto } from './tags.dto';

@Resolver(() => TagsModel)
export class tagsResolver {
  constructor(private readonly tagsService: tagsService) { }

  @Mutation(() => TagsModel)
  async createtags(@Args('data') data: TagsDto) {
    return await this.tagsService.createtags(data);
  }

  @Mutation(() => TagsModel)
  async updatetags(@Args('id') id: string, @Args('input') input: TagsDto): Promise<TagsModel> {
    return await this.tagsService.update(id, input);
  }

  @Query(() => [TagsModel])
  async gettags(): Promise<TagsModel[]> {
    return await this.tagsService.gettags();
  }
  @Mutation(() =>TagsModel)
  async deletetags(@Args('id') id: string): Promise<TagsModel> {
    return await this.tagsService.delete(id);
  }

}
