import { App } from 'vue'
import { IDirectiveProps } from './type'
import '@/style/index.css';

export default {
    install(app: App) {
        const modules = import.meta.globEager('./**/*.ts');
        Object.keys(modules).forEach(moduleName => {
            const directive: IDirectiveProps = Reflect.get(modules, moduleName).default;
            if (directive && directive.directiveName){
                const {directiveName,directiveValue} = directive;
                app.directive(directiveName,directiveValue)
            }
        })
    }
}