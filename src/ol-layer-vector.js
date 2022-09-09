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
        return this.layer.getMap()
    }

    connectedCallback(){
        const map = this.parentElement.getMap();

        map.addLayer(this.layer);
    }

}

export default OLLayerVector;
