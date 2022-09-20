import { IDirectiveProps } from '../type';

/** 加载指令 */
const directive: IDirectiveProps = {
    directiveName: 'load',
    directiveValue: (el: HTMLElement, binding) => {
        const { value } = binding;
        const load = el.querySelector('.ydv_screen-load');
        el.style.position = 'relative';
        const loadWrapper = document.createElement('div');
        loadWrapper.className = 'ydv_screen ydv_screen-load';
        const loadContent = document.createElement('div');
        loadContent.classList.add('ydv_screen_loadimg');
        loadWrapper.appendChild(loadContent);
        if (load && el.contains(load) && el !== load) {
            const dom = el.querySelector('.ydv_screen') as HTMLDivElement;
            if (dom) {
                dom.innerHTML = '';
                dom.style.backgroundColor = `rgba(0,0,0,0)`
            }
            setTimeout(() => {
                el.removeChild(load)
            }, 500);
        }
        loadWrapper.style.background = 'rgba(0,0,0,0)'
        if (value && typeof value === 'string') {
            loadWrapper.innerHTML += value;
            el.appendChild(loadWrapper)
            setTimeout(() => {
                loadWrapper.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
            }, 50);
        } else if (value && typeof value === 'boolean') {
            el.appendChild(loadWrapper)
            setTimeout(() => {
                loadWrapper.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
            }, 50);
        } else if (value && value.visible) {
            const { visible = true, text = '加载数据中', background = 'rgba(255,255,255,.7)' } = value;
            loadWrapper.innerHTML += text;
            if (visible) {
                el.appendChild(loadWrapper);
                setTimeout(() => {
                    loadWrapper.style.backgroundColor = background;
                }, 50);
            }
        }
    }
}

export default directive