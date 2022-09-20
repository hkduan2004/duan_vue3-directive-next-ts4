import { IDirectiveProps } from '../type';

const directive: IDirectiveProps = {
    directiveName: 'backtop',
    directiveValue: (el) => {
        const parentNode = el.parentElement;
        if (parentNode) {
            el.addEventListener('click', () => {
                parentNode.children[0].scrollIntoView({
                    behavior: "smooth", // 平滑过渡
                    block: "start", // 上边框与视窗顶部平齐。默认值
                })
            })
        }
    }
}

export default directive