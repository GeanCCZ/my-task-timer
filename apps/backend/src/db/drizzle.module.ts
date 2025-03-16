import { Global, Module } from "@nestjs/common";
import { DRIZZLE_PROVIDER, DrizzleProvider } from "./providers/drizzle.provider";

@Global()
@Module({
    providers: [DrizzleProvider],
    exports: [DRIZZLE_PROVIDER]
})

export class DrizzleModule { }