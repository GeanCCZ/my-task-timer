import { Global, Module } from "@nestjs/common";
import { DRIZZLE_PROVIDER, DrizzleProvider } from "@my-task-timer/shared-data-source";

@Global()
@Module({
    providers: [DrizzleProvider],
    exports: [DRIZZLE_PROVIDER]
})

export class DrizzleModule { }