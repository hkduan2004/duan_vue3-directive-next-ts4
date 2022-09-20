import { IDirectiveProps } from '../type';
import { createApp, App, h } from 'vue';
import { ElTooltip } from 'element-plus'

function getTooltip(content: string, children: any): App {
    return createApp({
        render() {
            return h(ElTooltip, { content, effect: 'dark', placement: 'top' }, children)
        }
    })
}

/** element-plus的tooltip提示 */
const directive: IDirectiveProps = {
    directiveName: 'tooltip',
    directiveValue: (el, binding) => {
        const { value } = binding;
        if (value) {
            const childs = el.innerHTML;
            el.innerHTML = '';
            getTooltip(value,childs).mount(el)
        }
    }
}

export default directive;