import { IDirectiveProps } from '../type';

/** 文本超出省略号 */

const direcitve: IDirectiveProps = {
    directiveName: 'ellipsis',
    directiveValue: (el, binding) => {
        const lines = Number(binding.value);
        if (lines) {
            if (lines === 1) {
                el.className+=' ydv_ellipsis ydv_ellipsis_singal';
            } else {
                el.style.webkitLineClamp = String(lines)
                el.className+=' ydv_ellipsis ydv_ellipsis_double'
            }
        } else {
            el.className+=' ydv_ellipsis ydv_ellipsis_singal';
        }
    }
}

export default direcitve