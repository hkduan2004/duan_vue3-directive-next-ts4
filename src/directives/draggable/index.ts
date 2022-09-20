import { IDirectiveProps } from '../type';

/** v-draggable  v-draggable.limit  v-draggable.x  v-draggable.y  v-draggable.limitX v-draggable.limitY   */

function preventStopPropagation(e: MouseEvent | TouchEvent) {
    e.preventDefault();
    e.stopPropagation()
}

function getCurrentPos(pos: number | string): number {
    if (typeof pos === 'string') {
        pos = pos.replace(/(px|%)/g, '')
        return Number(pos)
    }
    return pos
}

/** 拖拽指令 */
const directive: IDirectiveProps = {
    directiveName: 'draggable',
    directiveValue: {
        mounted(el, binding) {
            const { value, modifiers } = binding;
            const parentNode = el.parentElement as HTMLDivElement;
            let startX = 0, startY = 0, draggableType = ''
            function dragStartEvent(e: any) {
                preventStopPropagation(e)
                startX = e.clientX || e.touches[0].clientX;
                startY = e.clientY || e.touches[0].clientY;
                document.addEventListener('mousemove', dragMoveEvent, false);
                document.addEventListener('mouseup', dragEndEvent, false);
                document.addEventListener('touchmove', dragMoveEvent, false);
                document.addEventListener('touchend', dragEndEvent, false);
            }
            function dragMoveEvent(e: any) {
                const { clientX, clientY } = e.clientX ? e : e.touches[0];
                const moveX = clientX - startX, moveY = clientY - startY;
                const currTop = getCurrentPos(el.style.top), currLeft = getCurrentPos(el.style.left);
                let top = currTop + moveY, left = currLeft + moveX;
                if (draggableType.startsWith('limit')) {
                    if (top < 0) top = 0;
                    if (top > parentNode.offsetHeight - el.offsetHeight) top = parentNode.offsetHeight - el.offsetHeight;
                    if (left < 0) left = 0;
                    if (left > parentNode.offsetWidth - el.offsetWidth) left = parentNode.offsetWidth - el.offsetWidth;
                }
                if (draggableType !== 'x' && draggableType !== 'limitX') el.style.top = top + 'px'
                if (draggableType !== 'y' && draggableType !== 'limitY') el.style.left = left + 'px'
                value?.(el.offsetTop,el.offsetLeft)
                startX = clientX; startY = clientY;
            }
            function dragEndEvent() {
                document.removeEventListener('mousemove', dragMoveEvent, false)
                document.removeEventListener('touchmove', dragMoveEvent, false)
            }
            if (parentNode && getComputedStyle(parentNode).position === 'relative') {
                let draggableModify = ''
                el.style.position = 'absolute';
                if (!getComputedStyle(el).top) el.style.top = '0';
                if (!getComputedStyle(el).left) el.style.left = '0'
                if (modifiers.limit) {
                    draggableModify = 'limit'
                } else if (modifiers.x) {
                    draggableModify = 'x'
                } else if (modifiers.y) {
                    draggableModify = 'y'
                } else if (modifiers.limitX) {
                    draggableModify = 'limitX'
                } else if (modifiers.limitY) {
                    draggableModify = 'limitY'
                }
                draggableType = draggableModify
                el.addEventListener('mousedown', dragStartEvent, false);
                el.addEventListener('touchstart', dragStartEvent, false)
            }
        }
    }
}

export default directive;