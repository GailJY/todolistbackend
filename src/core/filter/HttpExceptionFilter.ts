import { ExceptionFilter,Catch, HttpException, ArgumentsHost } from "@nestjs/common";
import { Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter{
    catch(exception: HttpException, host: ArgumentsHost) {
        // throw new Error("Method not implemented.");
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();
        const code = exception.getStatus();

        const message = exception.message;
        response.status(code).json({
            code,
            message
        })
    

    }
    
}