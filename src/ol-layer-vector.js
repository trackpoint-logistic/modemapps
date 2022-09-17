import Vector from 'ol/layer/Vector';

class OLLayerVector extends HTMLElement {
    constructor() {
        super();

        this.layer = new Vector({
            visible: false
        });
    }

    setVisible(visible){
        this.layer.setVisible(visible);
    }

    getLayer(){
        return this.layer;
    }

    getMap(){
        return this.parentElement.getMap()
    }

    connectedCallback(){
        if (this.isConnected == false) {
            return;
        }

        const map = this.parentElement.getMap();
        map.addLayer(this.layer);
    }

}

export default OLLayerVector;
