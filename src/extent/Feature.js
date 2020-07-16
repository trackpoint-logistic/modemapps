/**
 * @module ol/trackpoint/Feature
 */

import BaseFeature from 'ol/Feature.js';


export default class Feature extends BaseFeature {

	constructor(options) {
		super(options);
		this.visibility_ = true;
	}



	/**
	 * @api
	 */
	move(ll) {
		//const geometry = this.getGeometry(); //this.get(this.getGeometryName());
		super.getGeometry().setCoordinates(ll);

		if (this.visibility_){
			super.changed();
		}
		
	};


	/**
	 * @api
	 */
	setVisibility(v) {
		this.visibility_ = v;
		super.changed();
	};

	getGeometry() {
		if (this.visibility_ === false) {
			return undefined;
		}

		return super.getGeometry();
	};


}

