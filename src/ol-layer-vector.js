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

    isVisible(){
        return this.layer.getVisible();
    }
    
    setSource(source){
        return this.layer.setSource(source);
    }

    getSource(){
        return this.layer.getSource();
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

        this.hidden = true;

        const map = this.parentElement.getMap();
        map.addLayer(this.layer);
    }

}

export default OLLayerVector;
