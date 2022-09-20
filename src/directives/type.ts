type directiveFunc = (el: HTMLElement, binding: { value: any, modifiers?: any }) => void

/** 自定义指令参数类型 */
export interface IDirectiveProps {
    /** 指令名称 */
    directiveName: string;
    /** 指令绑定函数 */
    directiveValue: directiveFunc | {
        [propName: string]: any;
        beforeMount?: directiveFunc;
        mounted?: directiveFunc;
        beforeUpdate?: directiveFunc;
        updated?: directiveFunc;
        beforeUnmount?: directiveFunc;
        unmounted?: directiveFunc;
    };
} 