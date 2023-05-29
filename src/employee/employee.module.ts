import { Module } from '@nestjs/common';


import { employeeResolver } from './employee.resolver';
import { employeeService } from './employee.service';

@Module({
  imports: [],
  providers: [employeeResolver, employeeService],
})
export class employeeModule { }