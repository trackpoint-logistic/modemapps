import Map from 'ol/Map';
import View from 'ol/View';

class OLMap extends HTMLElement {

	constructor() {
		super();

		const shadow = this.attachShadow({ mode: 'open' });
		//const tempalte = document.getElementById('ol-style').content;

		const target = document.createElement('div');
		Object.assign(target.style,{
			width: '100%;',
			height: '100%'
		});

		const slot = document.createElement('slot');
		//target.appendChild(slot);

		const style = document.createElement('style');
		style.append(document.createTextNode('@import url("./ol.css");'));

		shadow.append(style, slot, target);
		// shadow.adoptedStyleSheets = [
		// 	//styles
		// 	//OLMap.getStyle()
		// ];

		this.map = new Map({
			//target: shadow.getElementById('map'),

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
		if (this.isConnected == false) {
			return;
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
