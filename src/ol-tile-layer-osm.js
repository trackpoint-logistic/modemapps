import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

class OLTileLayerOSM extends HTMLElement {

	constructor() {
		super();

		this.layer = new TileLayer({
			preload: Infinity,
			type: 'base',
			title: this.getTitle(),
			source: new OSM()
		});
	}

	getTitle(){
		return this.getAttribute('title') || ''
	}

	getVisible(){
		return String(this.getAttribute('visible')).toLowerCase() == 'true'
	}

	setSource(source){
		this.layer.setSource(source)
	}

	getMaxZoom(){
		return this.getAttribute('max-zoom') || 13;
	}

	connectedCallback(){
		if (this.isConnected == false) {
			return;
		}

		this.layer.setMaxZoom(this.getMaxZoom());

		const map = this.parentElement.getMap();
		map.addLayer(this.layer);
	}
}


export default OLTileLayerOSM;