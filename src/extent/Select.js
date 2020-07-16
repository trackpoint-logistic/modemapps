/**
 * @module ol/trackpoint/Select
 */

import BaseSelect from 'ol/interaction/Select.js';

export default class Select extends BaseSelect{

	setFeatures = function(features) {
		const source = this.featureOverlay_.getSource();
		source.clear();
		source.addFeatures(features);
	}

}