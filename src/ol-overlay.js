import Overlay from 'ol/Overlay';

class OLOverlay extends HTMLElement {
    constructor() {
        super();

        const options = Object.assign(
            {},
            (JSON.parse(this.getAttribute('options')) || {}),
            {
                element: this
            });

        this.removeAttribute('prototype');

        this.overlay = new Overlay(options);
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
