import { IDirectiveProps } from '../type';

/** 图片懒加载指令 */
const directive: IDirectiveProps = {
    directiveName: 'img-lazy',
    directiveValue: {
        beforeMount(el, binding) {
            if (el.nodeName !== 'IMG') return;
            const { value } = binding;
            el.setAttribute('data-img', el.getAttribute('src') || '');
            el.setAttribute('src', value);
            Object.assign(el, { hasLoad: false })
        },
        mounted(el, binding) {
            if (el.nodeName !== 'IMG') return;
            const { value } = binding;
            const io = new IntersectionObserver((entries) => {
                const currentImg = entries[0];
                if (currentImg.intersectionRatio > 0) {
                    el.setAttribute('src', el.getAttribute('data-img') || '');
                    el.addEventListener('load', () => Object.assign(el, { hasLoad: true }))
                    el.addEventListener('error', () => {
                        el.setAttribute('src', value)
                    }, false);
                    io.unobserve(currentImg.target)
                }
            })
            io.observe(el)
            Reflect.set(el, '$io', io)
        },
        updated(el, binding) {
            if (!Reflect.get(el, 'hasLoad')) {
                el.setAttribute('src', binding.value || '')
                el.setAttribute('data-img', binding.value || '')
            }
        },
        unmounted(el) {
            const _el = el as any;
            _el.$io.disconnect()
        }
    }
}

export default directive