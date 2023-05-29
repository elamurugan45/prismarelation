import { Resolver, Args, Mutation, Query, ID, Float,ResolveField, Parent} from '@nestjs/graphql';
import { employeeCount, employeeModel } from './employee.model';
import { employeeService } from './employee.service';
import { employeeDto, skillsFilter } from './employee.dto';
import { skillsModel } from 'src/skills/skills.model';

@Resolver(() => employeeModel)
export class employeeResolver {
  constructor(private readonly employeeService: employeeService) { }



  @ResolveField(() => Float)
  async age(@Parent() employee: employeeModel): Promise<number> {
    const DOB = employee.DOB;
    const currentDate = new Date();
    const birthDate = new Date(DOB);
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      return age - 1;
    }

    return age;
  }


  @Mutation(() => employeeModel)
  async createemployee(@Args('data') data: employeeDto) {
    return await this.employeeService.createemployee(data);
  }

  @Mutation(() => employeeModel)
  async updateemployee(@Args('id') id: string, @Args('input') input: employeeDto): Promise<employeeModel> {
    return await this.employeeService.update(id, input);
  }

  @Query(() => [employeeModel])
  async getemployee(@Args('filter', { nullable: true }) filter: skillsFilter): Promise<employeeModel[]> {
    return await this.employeeService.getemployee(filter);
    
  }
  @Mutation(() =>employeeModel)
  async deleteemployee(@Args('id') id: string): Promise<employeeModel> {
    return await this.employeeService.delete(id);
  }
  
  @Query(() => Number)
  async getemployeecount():Promise<Number>{
    return await this.employeeService.count()
  }

  @Query(() => [skillsModel])
  async TAgCount(): Promise<skillsModel[]> {
    return await this.employeeService.getTopSkillsWithCount();
  }
}


