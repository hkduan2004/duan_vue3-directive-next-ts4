import { IDirectiveProps } from '../type';

const directive: IDirectiveProps = {
    directiveName: 'watermark',
    directiveValue: (el, binding) => {
        let { content = '文本水印', width = 120, height = 120, fontSize = 18 } = binding.value || {};
        el.style.position = 'relative';
        const canvas = document.createElement('canvas');
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height)
        const ctx = canvas.getContext('2d');
        const waterMark = el.querySelector('.ydv_watermark') as HTMLDivElement;
        waterMark && waterMark.remove()
        if (content && ctx) {
            ctx.beginPath()
            //设置字体
            ctx.font = fontSize + "px Georgia";
            //设置文字的位置,可以是center left right end默认start。。是相对于起始坐标来说的
            ctx.textAlign = "center";
            //设置文字的基线对齐方式
            ctx.textBaseline = "middle";
            ctx.strokeStyle = "#CECECE"
            //const strWidth = ctx.measureText(content).width;
            ctx.translate(-width / 6 - (fontSize / 2), height / 2);
            ctx.rotate(-45 * Math.PI / 180);
            ctx.strokeText(content, width / 2, height / 2);
            ctx.stroke();
            ctx.closePath();
            const resImgUrl = canvas.toDataURL('image/png');
            const watermarkDom = document.createElement('div');
            watermarkDom.classList.add('ydv_watermark')
            watermarkDom.style.position = 'absolute';
            watermarkDom.style.top = '0';
            watermarkDom.style.left = '0';
            watermarkDom.style.right = '0';
            watermarkDom.style.bottom = '0';
            watermarkDom.style.backgroundSize = `${width} ${height}`;
            watermarkDom.style.backgroundImage = `url('${resImgUrl}')`;
            watermarkDom.style.backgroundRepeat = 'repeat';
            watermarkDom.style.pointerEvents = 'none';
            el.insertBefore(watermarkDom, el.children[0])
        }
    }
}

export default directive