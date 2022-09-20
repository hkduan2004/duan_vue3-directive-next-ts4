import { IDirectiveProps } from '../type';


/** 函数防抖 */
const directive: IDirectiveProps = {
    directiveName: 'debounce',
    directiveValue: {
        mounted(el, binding) {
            const { value, modifiers } = binding;
            let [eventName, eventName_next] = Object.keys(modifiers);
            let delayTime = 1000;
            if (!isNaN(Number(eventName)) && eventName_next) {
                delayTime = Number(eventName) * 1000;
                eventName = eventName_next
            }
            let timeoutInstance: any = null;
            if (value && eventName) {
                /** 防抖核心逻辑 */
                Reflect.set(el, 'bindEvent', (e: Event) => {
                    clearTimeout(timeoutInstance)
                    timeoutInstance = setTimeout(() => {
                        timeoutInstance = null
                        value?.(e)
                    }, delayTime)
                })
                el.addEventListener(eventName, Reflect.get(el, 'bindEvent'), false)
            }
        },
        beforeUnmount(el, binding) {
            let [eventName, eventName_next] = Object.keys(binding.modifiers);
            if (!isNaN(Number(eventName)) && eventName_next) {
                eventName = eventName_next
            }
            el.removeEventListener(eventName, Reflect.get(el, 'bindEvent'), false)
        }
    }
}

export default directive