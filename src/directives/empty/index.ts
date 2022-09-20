import { IDirectiveProps } from '../type';


let children: any = null;

const direcitve: IDirectiveProps = {
    directiveName: 'empty',
    directiveValue: (el, binding) => {
        const { visible = false, emptyImgUrl = '', content = '' } = binding.value;
        if (!children) { children = el.innerHTML }
        const dom = document.createElement('div');
        dom.classList.add('ydv_empty');
        dom.innerHTML = `<img src="${emptyImgUrl}" /><div class="ydv_empty_text">${content}</div>`;
        if(visible){
            el.innerHTML = '';
            el.appendChild(dom)
        }else{
            el.innerHTML = children
        }
    }
}

export default direcitve