import { Controller, Get } from "@nestjs/common";

@Controller('task')
export class TaskController {

    @Get()
    getHello(): string{
        return 'hello'
    }
}