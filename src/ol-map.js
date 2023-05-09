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


	fitByExtend(extent){
        if (!extent ||
            extent[0] === Infinity ||
            extent[1] === Infinity ||
            extent[2] === Infinity ||
            extent[3] === Infinity) {
            return;
        }

        const view = this.map.getView();
        const level = view.getZoom();
        const zoom = level > 13 
			? level 
			: 13;

        view.fit(extent, this.map.getSize(), {
            padding: [20, 20, 20, 20],
            maxZoom: zoom
        });
	}
}

export default OLMap;
