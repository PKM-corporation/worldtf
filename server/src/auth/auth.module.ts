import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { UserValidationStrategy } from './strategies/user-validation.strategy';
import { JwtTokenValidationStrategy } from './strategies/jwt-token-validation.strategy';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        forwardRef(() => UsersModule),
        ConfigModule.forRoot(),
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, UserValidationStrategy, JwtTokenValidationStrategy],
    exports: [AuthService],
})
export class AuthModule {}
