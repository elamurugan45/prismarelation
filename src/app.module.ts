import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { PrismaAppModule } from './prisma/prisma.module';
import { AppService } from './app.service';
import { GraphqlModule } from './graphql.module';
import { OrganizationModule } from './organization/organization.module';
import { PostModule } from './post/post.module';
import { ProductModule } from './product/product.module';
import { Category } from './product/product.constant';
import { registerEnumType } from '@nestjs/graphql';
import { employeeModule } from './employee/employee.module';
import { tagsModule } from './tags/tags.module';
import { skillsModule } from './skills/skills.module';

registerEnumType(Category, {
  name: 'Category'
});

@Module({
  providers: [AppService],
  imports: [UserModule,OrganizationModule,PostModule,ProductModule,
    PrismaAppModule,GraphqlModule,employeeModule,tagsModule,skillsModule],
})
export class AppModule {}
