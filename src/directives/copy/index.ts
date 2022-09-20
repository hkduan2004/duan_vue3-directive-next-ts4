import { IDirectiveProps } from '../type';

function copyStrToClibroad(str: string) {
    const inputDom = document.createElement('input');
    inputDom.style.opacity = '0';
    inputDom.setAttribute('value', str);
    document.body.appendChild(inputDom);
    inputDom.select();
    document.execCommand('Copy');
    inputDom.remove()
}

/** 点击复制指令 */
const directive: IDirectiveProps = {
    directiveName: 'copy',
    directiveValue: {
        mounted(el, binding) {
            const { value = { content: '复制内容', callBack: () => { } }, modifiers } = binding;
            let time = false;
            if (value && value.content) {
                const {content,callBack} = value
                el.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (modifiers.dbclick) { // 双击复制
                        if (time) { time = false; copyStrToClibroad(content); callBack?.() }
                        else {
                            time = true;
                            setTimeout(() => {
                                time = false
                            }, 1500);
                        }
                    } else { // 单击复制
                        callBack?.()
                        copyStrToClibroad(content)
                    }
                })
            }
        }
    }
}
export default directive