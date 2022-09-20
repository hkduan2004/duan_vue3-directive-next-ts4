import { IDirectiveProps } from '../type';
import ResizeObserver from 'resize-observer-polyfill';

window.ResizeObserver = ResizeObserver;

/** dom尺寸变化指令 */
const directive: IDirectiveProps = {
    directiveName: 'resize',
    directiveValue: {
        beforeMount(el, binding) {
            let hasChange = false;
            const { value } = binding;
            const ro = new ResizeObserver((entries) => {
                const current = entries[0];
                if(hasChange){
                    value?.({contentRect: current.contentRect,target: current.target})
                }else{
                    hasChange = true
                }
            })
            ro.observe(el)
        }
    }
}

export default directive;