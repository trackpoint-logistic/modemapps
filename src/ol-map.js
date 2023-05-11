import Map from 'ol/Map';
import View from 'ol/View';
import {defaults as defaultsInteraction} from 'ol/interaction/defaults';
import {defaults as defaultControls} from 'ol/control.js';

class OLMap extends HTMLElement {
	#map;
	#element;
	constructor() {
		super();

		const shadow = this.attachShadow({
			mode: 'closed',
			slotAssignment: 'manual'
		});

		//slotAssignment
		//console.log(shadow);
		//{ mode: "closed" }
		this.#element = document.createElement('div');
		Object.assign(this.#element.style,{
			width: '100%;',
			height: '100%'
		});

		//const slot = document.createElement('slot');

		const style = document.createElement('style');
		style.append(document.createTextNode('@import url("/libs/modemapps/ol.css");'));

		shadow.append(
			style,
			//slot,
			this.#element);

		this.#map = new Map({
			loadTilesWhileAnimating: false,
			loadTilesWhileInteracting: false,
			renderer: 'canvas',
			controls: defaultControls({
				attributions: false,
				rotate: false
			}),
			interactions: defaultsInteraction({
				doubleClickZoom: false,
				altShiftDragRotate: false,
				pinchRotate: false
			}),
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

		const view = this.#map.getView();

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

		this.#map.setTarget(this.#element);
		this.#map.updateSize();
	}

	getMap(){
		return this.#map;
	}
}

export default OLMap;
