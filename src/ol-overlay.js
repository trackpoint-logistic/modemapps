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

        const slot = document.createElement("slot");
        this.overlay.setElement(slot);
        this.getMap()?.addOverlay(this.overlay);

        slot.assign(this);
    }

    getOverlayContainer(){
        return this.overlay?.element;
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

    isVisible(){
        return this.overlay.getPosition() != undefined;
    }

    getMap(){
        return this.parentElement?.getMap();
    }

}

export default OLOverlay;
