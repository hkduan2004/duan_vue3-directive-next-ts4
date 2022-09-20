import { IDirectiveProps } from '../type';

/** 图片加载异常指令 */
const directive: IDirectiveProps = {
    directiveName: 'img-error',
    directiveValue: (el,binding)=>{
        el.addEventListener('error',()=>{
          el.setAttribute('src',binding.value||'');
          el.onerror = null;
        },false)
    }
}

export default directive;