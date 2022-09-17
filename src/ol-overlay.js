import Overlay from 'ol/Overlay';

class OLOverlay extends HTMLElement {
    constructor() {
        super();

        this.map = this.parentElement.getMap();
        this.overlay = new Overlay({});
        this.map.addOverlay(this.overlay);
    }

    connectedCallback(){
        this.overlay.setElement(this);
    }

    setProperties(properties){
        this.overlay.setProperties(properties, true);
    }

    setPosition(position) {
        this.overlay.setPosition(position);
    }

    close(){
        this.overlay.setPosition(undefined);
    }

}

export default OLOverlay;
