/*
 * @Author: duan
 * @Date: 2022-09-19 09:20:18
 * @LastEditors: duan
 * @LastEditTime: 2022-09-19 10:13:00
 * @Description: file content
 */
import { IDirectiveProps } from '../type';

/** 长按指令 */
const directive: IDirectiveProps = {
    directiveName: 'longpress',
    directiveValue: {
        beforeMount(el, binding) {
            const { value } = binding;
            let time = Date.now()
            function pressStart() {
                time = Date.now();
            }
            function pressEnd() {
                let timeReduce = (Date.now() - time) / 1000;
                if (timeReduce >= 2) {
                    value?.()
                }
                console.log('timeReduce:', timeReduce)
            }
            el.addEventListener('mousedown', pressStart, false);
            el.addEventListener('touchstart', pressStart, false);
            el.addEventListener('mouseup', pressEnd, false);
            el.addEventListener('touchend', pressEnd, false);
        }
    }
}

export default directive