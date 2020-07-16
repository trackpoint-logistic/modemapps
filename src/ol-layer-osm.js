import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

class OLLayerOSM extends HTMLElement {

	constructor() {
		super();
	}

	connectedCallback(){
		const map = this.parentElement.getMap();

		const layer = new TileLayer({
			source: new OSM()
		})
		map.addLayer(layer);
	}
}

customElements.define('ol-layer-osm', OLLayerOSM);
