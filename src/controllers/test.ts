import { defineController } from '../core/defineController';
import { ControllerRequest } from '../core/types';
import  { TestService } from '../services/test';
import { Controller, Get, Post } from '../core/decorators/index';

const { test, testTwo} = TestService;

@Controller('/test')
class TestController {
    @Get('/')
    static testFn() {
        return defineController({
            async controller(req: ControllerRequest) {
                const response = test();
                req.return?.(response);
            }
        })
    }
    @Post('/two')
    static testFnTwo() {
        return defineController({
            async controller(req: ControllerRequest) {
                const response = testTwo();
                req.return?.(response);
            }
        })
    }
}
export { TestController }