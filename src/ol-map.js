import Map from 'ol/Map';
import View from 'ol/View';

class OLMap extends HTMLElement {
	constructor() {
		super();

		const shadow = this.attachShadow({ mode: 'open' });
		const tempalte = document.getElementById('wc-ol-map').content;

		shadow.appendChild(tempalte.cloneNode(true));

		this.map = new Map({
			target: shadow.getElementById('map'),

			loadTilesWhileAnimating: false,
			loadTilesWhileInteracting: false,
			renderer: 'canvas',

			view: new View({
				constrainResolution: false,
				smoothExtentConstraint: false,
				smoothResolutionConstraint: false,

				maxZoom: 20,
				minZoom: 3,
				zoom: 4,

				center: [0, 0],
			}),

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