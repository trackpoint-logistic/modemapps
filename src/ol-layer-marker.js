import TileLayer from 'ol/layer/Tile';
import SourceVector from 'ol/source/Vector';
import LayerVector from 'ol/layer/Vector';
import SourceCluster from './extent/Cluster.js';

class OLLayerMarker extends HTMLElement {

	constructor() {
		super();

		this.source = new SourceVector({features: []});

		if(this.getClusteAttribute()){
			this.layer = new LayerVector({
				visible: getVisibleAttribute(),
				source: new SourceCluster({
					distance: this.getDistanceAttribute(),
					source: this.source
				})
			});
		}else{
			this.layer = new LayerVector({
				visible: this.getVisibleAttribute(),
				source: this.source
			});
		}

	}

	getVisibleAttribute(){
		const visible = this.getAttribute('visible') || '';
		return visible.toLowerCase() == 'true';
	}

	getClusteAttribute(){
		const clustered = this.getAttribute('clustered') || '';
		return clustered.toLowerCase() == 'true';
	}

	getDistanceAttribute(){
		const distance = this.getAttribute('distance');
		if(Number.isInteger(distance)){
			return +distance;
		}

		return 35;
	}

	setCenter(center){
		this.getMap().getView().setCenter(center);
	}

	fit(extent){
		this.getMap().getView().fit(extent);
	}

	fitBySourcetExtent(){
		this.fit(this.source.getExtent());
	}

	addFeatures(features){
		this.source.addFeatures(features);
	}

	getVisible(){
		return this.layer.getVisible();
	}

	setVisible(visible){
		this.layer.setVisible(visible);
	}

	getSource(){
		return this.source;
	}

	getLayer(){
		return this.layer;
	}

	getMap(){
		return this.parentElement.getMap();
	}

	connectedCallback(){
		this.getMap().addLayer(this.layer);
	}
}


export default OLLayerMarker;