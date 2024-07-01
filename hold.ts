
const SUPPORTED_LANGUAGES = ["en", "es", "it"]
// this syntax is equals to "en" | "es" | "it"
export type Language = typeof SUPPORTED_LANGUAGES[number] 

function Logger(target: any, name: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value =  function (...args: any[]) {
        console.log('this => ', this);
        console.log('target ', target)
        console.log('or ', originalMethod)
        originalMethod.apply(this, args)
    }
    return descriptor;
}

class Test {
    @Logger
    static greet() {
        console.log('hello')
    }
}
Test.greet()