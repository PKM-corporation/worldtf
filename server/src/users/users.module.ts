import { CacheModule, forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports: [forwardRef(() => AuthModule), CacheModule.register()],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
