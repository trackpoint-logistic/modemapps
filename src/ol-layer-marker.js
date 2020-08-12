import TileLayer from 'ol/layer/Tile';
import SourceVector from 'ol/source/Vector';
import LayerVector from 'ol/layer/Vector';
import SourceCluster from './extent/Cluster.js';

class OLLayerMarker extends HTMLElement {

	constructor() {
		super();

		this.source = new SourceVector({features: []});


		if(this.isClustered()){
			this.layer = new LayerVector({
				visible: true,
				source: new SourceCluster({
					distance:35,
					source: this.source
				})
			});
		}else{
			this.layer = new LayerVector({
				visible: true,
				source: this.source
			});
		}

	}

	isClustered(){
		const clustered = this.getAttribute('clustered') || '';

		console.log('clustered:'+clustered);
		return clustered.toLowerCase() == 'true';
	}


	getSource(){
		return this.source;
	}

	getLayer(){
		return this.layer;
	}

	connectedCallback(){
		const map = this.parentElement.getMap();

		map.addLayer(this.layer);
	}
}


export default OLLayerMarker;