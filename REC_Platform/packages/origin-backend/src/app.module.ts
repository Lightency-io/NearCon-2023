import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { providers } from '.';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import createConfig from './config/configuration';
import { AdminModule } from './pods/admin/admin.module';
import { ConfigurationModule } from './pods/configuration/configuration.module';
import { EmailConfirmationModule } from './pods/email-confirmation/email-confirmation.module';
import { FileModule } from './pods/file/file.module';
import { InvitationModule } from './pods/invitation/invitation.module';
import { OrganizationModule } from './pods/organization/organization.module';
import { UserModule } from './pods/user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [createConfig],
            isGlobal: true
        }),
        FileModule,
        UserModule,
        ConfigurationModule,
        OrganizationModule,
        InvitationModule,
        AuthModule,
        AdminModule,
        EmailConfirmationModule
    ],
    controllers: [AppController],
    providers
})
export class AppModule {}
