import Overlay from 'ol/Overlay';

class OLOverlay extends HTMLElement {
    constructor() {
        super();

        const prototype = Object.assign(
            {},
            (JSON.parse(this.getAttribute('prototype')) || {}),
            {
                element: this
            });

        this.removeAttribute('prototype');

        this.overlay = new Overlay(prototype);
    }

    setPosition(position) {
        this.overlay.setPosition(position);
    }

    close(){
        this.overlay.setPosition(undefined);
    }

    connectedCallback(){
        const map = this.parentElement.getMap();

        map.addLayer(this.overlay);
    }

}

export default OLOverlay;
