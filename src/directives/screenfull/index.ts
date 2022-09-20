import { IDirectiveProps } from '../type';
const smallscreen = new URL('../../assets/smallscreen.svg', import.meta.url).href;
const fullscreen = new URL('../../assets/fullscreen.svg', import.meta.url).href

const directive: IDirectiveProps = {
    directiveName: 'screenfull',
    directiveValue: (el, binding) => {
        let screenState = (!!document.fullscreenElement) || false;
        const imgbox = document.createElement('img');
        imgbox.style.width = "100%";
        imgbox.style.height = "100%";
        imgbox.src = screenState ? smallscreen : fullscreen;
        el.innerHTML = ''
        el.appendChild(imgbox);
        el.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (screenState) {
                document.exitFullscreen()
                imgbox.src = fullscreen
            } else {
                document.documentElement.requestFullscreen()
                imgbox.src = smallscreen
            }
            screenState = !screenState;
        })
    }
}

export default directive