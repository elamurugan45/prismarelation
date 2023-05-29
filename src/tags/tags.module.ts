import { Module } from '@nestjs/common';


import { tagsResolver } from './tags.resolver';
import { tagsService } from './tags.service';

@Module({
  imports: [],
  providers: [tagsResolver, tagsService],
})
export class tagsModule { }