import Map from 'ol/Map';
import View from 'ol/View';

class OLMap extends HTMLElement {
	constructor() {
		super();

		const shadow = this.attachShadow({ mode: 'open' });
		const tempalte = document.getElementById('wc-ol-map').content;

		shadow.appendChild(tempalte.cloneNode(true));

		this.map = new Map({
			view: new View({
				center: [0, 0],
				zoom: 2
			}),
			target: shadow.getElementById('map')
		});
	}

	connectedCallback(){
		this.map.updateSize()
	}

	getMap(){
		return this.map;
	}
}

export default OLMap;