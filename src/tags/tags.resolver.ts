import { Resolver, Args, Mutation, Query, ID } from '@nestjs/graphql';
import { tagsModel } from './tags.model';
import { tagsService } from './tags.service';
import { tagsDto } from './tags.dto';

@Resolver(() => tagsModel)
export class tagsResolver {
  constructor(private readonly tagsService: tagsService) { }

  @Mutation(() => tagsModel)
  async createtags(@Args('data') data: tagsDto) {
    return await this.tagsService.createtags(data);
  }

  @Mutation(() => tagsModel)
  async updatetags(@Args('id') id: string, @Args('input') input: tagsDto): Promise<tagsModel> {
    return await this.tagsService.update(id, input);
  }

  @Query(() => [tagsModel])
  async gettags(@Args('id')id:string): Promise<tagsModel[]> {
    return await this.tagsService.gettags(id);
  }
  @Mutation(() =>tagsModel)
  async deletetags(@Args('id') id: string): Promise<tagsModel> {
    return await this.tagsService.delete(id);
  }

}
