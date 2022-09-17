import Overlay from 'ol/Overlay';

class OLOverlay extends HTMLElement {
    constructor() {
        super();

        this.map = this.parentElement.getMap();

        this.overlay = new Overlay({
            element: this
        });

        this.map.addOverlay(this.overlay);
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
