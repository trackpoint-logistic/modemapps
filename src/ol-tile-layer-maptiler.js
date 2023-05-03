import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

class OLTileLayerMaptiler extends HTMLElement {

    constructor() {
        super();

        const key = this.getAttribute('key');
        this.removeAttribute('key');

        this.layer = new TileLayer({
            preload: Infinity,
            type: 'base',
            title: this.getTitle(),
            visible: this.getVisible(),
            source: new ol.source.TileJSON({
                //TODO pomenjat na url
                url: 'https://api.maptiler.com/maps/basic/tiles.json?key='.concat(key),
                tileSize: 512,
                crossOrigin: 'anonymous'
            })
        });
    }

    getTitle(){
        return this.getAttribute('title') || ''
    }

    getVisible(){
        return String(this.getAttribute('visible')).toLowerCase() == 'true'
    }

    connectedCallback(){
        if (this.isConnected == false) {
            return;
        }

        const map = this.parentElement.getMap();

        map.addLayer(this.layer);
    }
}


export default OLTileLayerMaptiler;