import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./server/user/user.module";
import { AuthService } from "./logical/auth/auth.service";
import { AuthModule } from "./logical/auth/auth.module";
import { UserController } from "./server/user/user.controller";

const DBModule = MongooseModule.forRoot("mongodb://localhost/demoDB");

@Module({
  imports: [DBModule, UserModule, AuthModule],
  controllers: [AppController, UserController],
  providers: [AppService, AuthService],
})
export class AppModule {}
