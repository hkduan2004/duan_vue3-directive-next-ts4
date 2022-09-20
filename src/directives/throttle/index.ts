import { IDirectiveProps } from '../type';

/** 函数节流 */
const directive: IDirectiveProps = {
    directiveName: 'throttle',
    directiveValue: {
        mounted(el, binding) {
            const { value, modifiers } = binding;
            let [eventName, eventName_next] = Object.keys(modifiers);
            let delayTime = 1000;
            if (!isNaN(Number(eventName)) && eventName_next) {
                delayTime = Number(eventName) * 1000;
                eventName = eventName_next
            }
            let runTimeStatus: boolean = false, timeoutInstance: any = null;
            if (value && eventName) {
                /** 节流核心逻辑 */
                const setTimeoutInstance = () => timeoutInstance = setTimeout(() => {
                    runTimeStatus = false;
                    timeoutInstance = null
                }, delayTime)
                Reflect.set(el, 'bindEvent', (e: Event) => {
                    if (!runTimeStatus) {
                        runTimeStatus = true;
                        value?.(e);
                        setTimeoutInstance();
                    } else {
                        clearTimeout(timeoutInstance)
                        setTimeoutInstance();
                    }
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