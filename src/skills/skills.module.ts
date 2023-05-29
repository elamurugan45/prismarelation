import { Module } from '@nestjs/common';


import { skillsResolver } from './skills.resolver';
import { skillsService } from './skills.service';

@Module({
  imports: [],
  providers: [skillsResolver, skillsService],
})
export class skillsModule { }