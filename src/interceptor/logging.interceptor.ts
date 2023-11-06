import {Injectable, NestInterceptor, ExecutionContext, CallHandler, InternalServerErrorException} from '@nestjs/common';
import {map, Observable} from 'rxjs';
import {UserDto} from "../users/user.dto";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log('Start...');

        const query = context.switchToHttp().getRequest().query;

        const now = Date.now();

        return next
            .handle()
            .pipe(
                map((data) =>{
                    data.map((item: UserDto) => {
                        console.log('After....');
                        delete item.id;
                        return item;
                    });

                    return {
                        count: data.length,
                        result: data
                    };
                }),
            );
    }
}