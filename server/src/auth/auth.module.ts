import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { UserValidationStrategy } from './strategies/user-validation.strategy';

@Module({
    imports: [forwardRef(() => UsersModule), PassportModule],
    providers: [AuthService, UserValidationStrategy],
    exports: [AuthService],
})
export class AuthModule {}
