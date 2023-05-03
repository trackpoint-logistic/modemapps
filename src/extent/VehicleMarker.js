/**
 * @module ol/trackpoint/VehicleMarker
 */

import Feature from 'ol/Feature.js';
import VehiclePin from './VehiclePin.js';
import Style from 'ol/style/Style.js';
import Stroke from 'ol/style/Stroke.js';
import Point from 'ol/geom/Point.js';
import LineString from 'ol/geom/LineString.js';
import GeometryCollection from 'ol/geom/GeometryCollection.js';


/**
 * Marker style
 * @enum {string}
 * @api
 */
const MarkerType = {
	"YELLOW": "assets/mark-yellow.png",
	"RED": "assets/mark-red.png",
	"MAGENTA": "assets/mark-magenta.png",
	"GREEN": "assets/mark-green.png",
	"BLUE": "assets/mark-blue.png",
	"BLACK": "assets/mark-black.png"
};


/**
 * @constructor
 * @unrestricted
 * @extends {Feature}
 * @api
 */
export default class VehicleMarker extends Feature {

	constructor(opt_options) {

		super();
		
		/**
		 * @nocollapse
		 */
		const options = opt_options || {};

		const ll = (options['ll'] !== undefined ? options['ll'] : [0, 0]);


		/**
		 * @private
		 * @type {boolean}
		 */
		this.immutable_ = false;


		/**
		 * @private
		 * @type {boolean}
		 */
		this.visibility_ = true;

		/**
		 * @private
		 * @type {number}
		 */
		this.type_ = (options['type'] !== undefined ? options['type'] : "YELLOW");

		/**
		 * @nocollapse
		 */
		this.displayTail_ = (options['tail'] !== undefined ? options['tail'] : false);



		/**
		 * @private
		 * @type {Point}
		 */
		this.point_ = new Point(ll);

		/**
		 * @private
		 * @type {Pin}
		 */
		this.pin_ = new VehiclePin({
			'anchor': options['anchor'] !== undefined
				? options['anchor']
				: [29, 59],

			'opacity': 1,
			'src': MarkerType[this.type_],

			'direction': options['direction'] !== undefined
				? options['direction']
				: 0,

			'displayArrow': options['displayArrow'] !== undefined
				? options['displayArrow']
				: true,

			'arrowColor': options['arrowColor'] !== undefined
				? options['arrowColor']
				: "#00650c",

			'displayLabel': options['displayLabel'] !== undefined
				? options['displayLabel']
				: true,

			'label': options['label'] !== undefined
				? options['label']
				: "",

			'labelColor': options['labelColor'] !== undefined
				? options['labelColor']
				: "#00650c"
		});


		/**
		 * @private
		 * @type {LineString}
		 */
		this.tail_ = null;

		if (this.displayTail_ == true) {
			this.tail_ = new LineString([ll]);

			super.setGeometry(
				new GeometryCollection([
				this.point_,
				this.tail_
				])
			);

		} else {
			super.setGeometry(this.point_);
		}

		this.stylize();
	}



	/**
	 * @api
	 */
	move(ll) {
		this.point_.setCoordinates(ll);
		if (this.displayTail_ == true) {
			var line = this.tail_.flatCoordinates;
			if (line && line.length > 5) {
				line.shift();
				line.shift();
			}
			this.tail_.appendCoordinate(ll);
		}

		this.changed();
	};


	/**
	 * @api
	 */
	setDisplayLabel(v) {
		this.pin_.setDisplayLabel(v);
		this.changed();
	};

	/**
	 * @api
	 */
	setLabel(t) {
		this.pin_.setLabel(t);
		this.changed();
	};

	/**
	 * @api
	 */
	getLabel() {
		this.pin_.getLabel();
	};

	/**
	 * @api
	 */
	setDirection(d) {
		this.pin_.setDirection(d);
		this.changed();
	};

	/**
	 * @api
	 */
	setDisplayArrow(v) {
		this.pin_.setDisplayArrow(v);
		this.changed();
	};


	/**
	 * @api
	 */
	setType(t) {
		this.type_ = t;

		this.pin_ = new VehiclePin({
			'anchor': this.pin_.getAnchor(),
			'opacity': 1,
			'src': MarkerType[this.type_],
			'direction': this.pin_.direction_,
			'displayArrow': this.pin_.displayArrow_,
			'arrowColor': this.pin_.arrowColor_,
			'displayLabel': this.pin_.displayLabel_,
			'label': this.pin_.label_,
			'labelColor': this.pin_.labelColor_
		});

		this.stylize();
	};



	/**
	 * @api
	 */
	clearTail() {
		if (this.displayTail_ == true) {
			this.tail_.flatCoordinates = [];
			this.changed();
		}
	}

	/**
	 * @api
	 */
	displayTail() {
		return this.displayTail_;
	};

	/**
	 * @api
	 */
	getTail() {
		return this.tail_;
	};


	/**
	 * @api
	 */
	setVisibility(v) {
		this.visibility_ = v;
		this.changed();
	};

	/**
	 * @api
	 */
	/*
	ol.trackpoint.Marker.prototype.setSelected=function(v){
		this.pin_.setSelected(v);
		this.changed();
	};
	*/
	/**
	 * @api
	 */
	setImmutable(v) {
		this.immutable_ = v;
		this.changed();
	};

	/**
	 * @api
	 */
	getImmutable() {
		return this.immutable_;
	};


	stylize() {
		if (this.displayTail_ == true) {
			this.setStyle([
				new Style({
					zIndex: 6,
					geometry: this.point_,
					image: this.pin_
				}),
				new Style({
					geometry: this.tail_,
					stroke: new Stroke({
						color: '#808080',
						width: 4
					})
				})
			]);
		} else {
			this.setStyle(new Style({
				zIndex: 6,
				geometry: this.point_,
				image: this.pin_
			}));
		}
	};

	/**
	 * @api
	 */
	getGeometry() {
		if (this.visibility_ === false) {
			return undefined;
		}

		return  super.getGeometry(); //(this.get(this.geometryName_));
	};

	/**
	 * @api
	 */
	getVisibility() {
		return this.visibility_;
	}

}
