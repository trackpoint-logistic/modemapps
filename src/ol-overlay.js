import Overlay from 'ol/Overlay';

class OLOverlay extends HTMLElement {
    constructor() {
        super();
        this.overlay = new Overlay({});
    }

    connectedCallback(){
        if (this.isConnected == false) {
            return;
        }

        if(this.overlay.getElement()){
            return;
        }

        const map = this.parentElement.getMap();
        map.addOverlay(this.overlay);
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
