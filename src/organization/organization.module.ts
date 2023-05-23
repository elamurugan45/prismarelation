import { Module } from '@nestjs/common';


import { OrganizationResolver } from './organization.resolver';
import { OrganizationService } from './organization.service';

@Module({
  imports: [],
  providers: [OrganizationResolver, OrganizationService],
})
export class OrganizationModule { }