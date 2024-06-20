import { defineController } from '../core/defineController';
import { ControllerRequest } from '../core/types';
import  { TestService } from '../services/test';

const { test} = TestService;


class TestController {
    static testFn() {
        return defineController({
            async controller(req: ControllerRequest) {
                const response = test();
                req.return?.(response);
            }
        })
    }
}
export { TestController }