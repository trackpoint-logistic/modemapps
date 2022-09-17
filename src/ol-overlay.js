import Overlay from 'ol/Overlay';

class OLOverlay extends HTMLElement {
    constructor() {
        super();
        this.overlay = new Overlay({});
        this.hidden=true
    }

    connectedCallback(){
        if (this.isConnected == false) {
            return;
        }

        if(this.overlay.getElement()){
            return;
        }

        this.getOverlayContainer().classList.add('ol-popup');

        const fragment = document.createDocumentFragment();

        while(this.firstElementChild){
            fragment.appendChild(this.firstElementChild);
        }

        this.overlay.setElement(fragment);

        const map = this.parentElement.getMap();
        map.addOverlay(this.overlay);
    }

    setProperties(properties){
        this.overlay.setProperties(properties, true);
    }

    setPosition(position) {
        this.overlay.setPosition(position);
    }

    getOverlayContainer(){
        return this.overlay.element;
    }

    close(){
        this.overlay.setPosition(undefined);
    }

}

export default OLOverlay;
