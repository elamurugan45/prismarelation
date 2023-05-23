import { Resolver, Args, Mutation, Query, ID } from '@nestjs/graphql';
import { OrganizationModel } from './organization.model';
import { OrganizationService } from './organization.service';
import { OrganizationDto } from './organization.dto';

@Resolver(() => OrganizationModel)
export class OrganizationResolver {
  constructor(private readonly organizationService: OrganizationService) { }

  @Mutation(() => OrganizationModel)
  async createOrganization(@Args('data') data: OrganizationDto) {
    return await this.organizationService.createOrganization(data);
  }

  @Mutation(() => OrganizationModel)
  async updateOrganization(@Args('id') id: string, @Args('input') input: OrganizationDto): Promise<OrganizationModel> {
    return await this.organizationService.update(id, input);
  }

  @Query(() => [OrganizationModel])
  async getOrganizations(@Args('id')id:string): Promise<OrganizationModel[]> {
    return await this.organizationService.getOrganizations(id);
  }
  @Mutation(() =>OrganizationModel)
  async deleteorganization(@Args('id') id: string): Promise<OrganizationModel> {
    return await this.organizationService.delete(id);
  }

}







