import { Resolver, Args, Mutation, Query, ID, Float,ResolveField, Parent} from '@nestjs/graphql';
import { employeeService } from './employee.service';
import { EmployeeModel } from './employee.model';
import { EmployeeDto, SkillFilter } from './employee.dto';
import { SkillsModel } from '../skills/skills.model';
import { TagsModel } from '../tags/tags.model';

@Resolver(() => EmployeeModel)
export class employeeResolver {
  constructor(private readonly employeeService: employeeService) { }



  @ResolveField(() => Float)
  async age(@Parent() employee: EmployeeModel): Promise<number> {
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


  @Mutation(() => EmployeeModel)
  async createemployee(@Args('data') data: EmployeeDto) {
    return await this.employeeService.createemployee(data);
  }

  @Mutation(() => EmployeeModel)
  async updateemployee(@Args('id') id: string, @Args('input') input: EmployeeDto): Promise<EmployeeModel> {
    return await this.employeeService.update(id, input);
  }

  @Query(() => EmployeeModel)
  async getEmployee(@Args('id') id: string): Promise<EmployeeModel> {
    return await this.employeeService.getEmployee(id);
  }

  @Query(() => [EmployeeModel])
  async getemployee(@Args('filter',{nullable:true}) filter?: SkillFilter): Promise<EmployeeModel[]> {
    console.log(filter)
    return await this.employeeService.getemployee(filter);

    
  }
  @Mutation(() =>EmployeeModel)
  async deleteemployee(@Args('id') id: string): Promise<EmployeeModel> {
    return await this.employeeService.delete(id);
  }
  
  @Query(() => Number)
  async getemployeecount():Promise<Number>{
    return await this.employeeService.count()
  }

  @Query(() => [SkillsModel])
  async skillCount(): Promise<SkillsModel[]> {
    return await this.employeeService.getTopSkillsWithCount();
  }

  @Query(() => [SkillsModel])
  async tagCount(): Promise<TagsModel[]> {
    return await this.employeeService.gettagsWithCount();
  }
}


