import Map from 'ol/Map';
import View from 'ol/View';

class OLMap extends HTMLElement {

	constructor() {
		super();

		const shadow = this.attachShadow({ mode: 'open' });

		const target = document.createElement('div');
		Object.assign(target.style,{
			width: '100%;',
			height: '100%'
		});

		const slot = document.createElement('slot');

		const style = document.createElement('style');
		style.append(document.createTextNode('@import url("/libs/modemapps/ol.css");'));

		shadow.append(style, slot, target);

		this.map = new Map({
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

	getMaxZoom(){
		return Number.parseInt(this.getAttribute('max-zoom'));
	}

	getMinZoom(){
		return Number.parseInt(this.getAttribute('min-zoom'));
	}

	connectedCallback(){
		if (this.isConnected == false) {
			return;
		}

		const view = this.map.getView();

		const max_zoom = this.getMaxZoom();
		if(max_zoom){
			view.setMaxZoom(max_zoom);
		}

		const min_zoom = this.getMinZoom();
		if(min_zoom){
			view.setMinZoom(min_zoom);
		}

		//Dobavit resize
		//https://developer.mozilla.org/en-US/docs/Web/API/Resize_Observer_API

		this.map.setTarget(this.shadowRoot.lastElementChild);
		this.map.updateSize();
	}

	getMap(){
		return this.map;
	}
}

export default OLMap;
