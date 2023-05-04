import Vector from 'ol/layer/Vector';

class OLLayerVector extends HTMLElement {
    constructor() {
        super();
        
        this.source = null;

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

    getSource(){
        return this.source;
    }
    
    setSource(source){
        return this.source = source
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
