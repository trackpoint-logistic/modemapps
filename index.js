import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import {defaults as defaultControls, Attribution} from 'ol/control';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';


class OLMap extends HTMLElement {

	constructor() {
		super();

		const shadow = this.attachShadow({ mode: 'open' });
		const style = document.createElement('style');
		style.innerHTML = '@import "wc-openlayer.e31bb0bc.css"';
		
		shadow.appendChild(style);
		
		const div = document.createElement('div');

		div.style.width = "100%";
		div.style.height = "100%";

		shadow.appendChild(div);

		this.map = new Map({
			view: new View({
				center: [0, 0],
				zoom: 2
			}),
			target: div
		});
	}

	connectedCallback(){
		this.map.updateSize()
	}

	getMap(){
		return this.map;
	}
}

customElements.define('ol-map', OLMap);

