import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaAppModule } from './prisma/prisma.module';
import { AppService } from './app.service';
import { GraphqlModule } from './graphql.module';
import { registerEnumType } from '@nestjs/graphql';
import { employeeModule } from './employee/employee.module';
import { tagsModule } from './tags/tags.module';
import { skillsModule } from './skills/skills.module';



@Module({
  providers: [AppService],
  imports: [
    PrismaAppModule,GraphqlModule,employeeModule,tagsModule,skillsModule],
})
export class AppModule {}
