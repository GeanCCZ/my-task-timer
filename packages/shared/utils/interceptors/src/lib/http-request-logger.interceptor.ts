import { Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { tap } from "rxjs";

@Injectable()
export class HttpRequestLoggerInterceptor implements NestInterceptor {
    intercept(context: any, next: any) {
        if (context.getType() === "http") {
            return this.httpLog(context, next);
        }
        return next.handle();
    }

    private httpLog(context: any, next: any) {
        const request = context.switchToHttp().getRequest();
        const method = request.method;
        const url = request.url.replace(request.params.id, "{id}");

        Logger.warn(`${method} - Request to ${url}`);
        const now = Date.now();
        return next
            .handle()
            .pipe(
                tap(() =>
                    Logger.log(
                        `${method} - Response from ${url} in ${Date.now() - now}ms`,
                    ),
                ),
            );
    }

}