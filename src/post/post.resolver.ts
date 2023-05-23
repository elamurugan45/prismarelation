import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { PostModel } from './post.model';
import { PostService } from './post.service';
import { PostDto } from './post.dto';

@Resolver(() => PostModel)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [PostModel])
  async posts(): Promise<PostModel[]> {
    return await this.postService.getPosts();
  }

  @Mutation(() => PostModel)
  async createPost(@Args('data') data: PostDto){
    return  await this.postService.createPost(data);
  }

  @Mutation(() => PostModel)
  async updatePost(@Args('id') id: string, @Args('input') input: PostDto): Promise<PostModel> {
    return await this.postService.updatePost(id, input);
  }

  @Mutation(() =>PostModel)
  async deletePost(@Args('id') id: string): Promise<PostModel> {
    return await this.postService.delete(id);
  }
}






