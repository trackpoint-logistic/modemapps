/**
 * @module ol/trackpoint/TankMarker
 */

import Feature from 'ol/Feature.js';
import TankPin from './TankPin.js';
import Style from 'ol/style/Style.js';
import Point from 'ol/geom/Point.js';


/**
 * @constructor
 * @unrestricted
 * @extends {Feature}
 * @api
 */
export default class TankMarker extends Feature {

	constructor(opt_options) {
		super();
		
		/**
		 * @nocollapse
		 */
		const options = opt_options || {};



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

		const ll = (options['ll'] !== undefined ? options['ll'] : [0, 0]);

		/**
		 * @private
		 * @type {Point}
		 */
		this.point_ = new Point(ll);

		/**
		 * @private
		 * @type {Pin}
		 */
		this.pin_ = new TankPin({
			'anchor':  (options['anchor']       !== undefined ? options['anchor'] : [22, 52]),
			'opacity': 1,
			'src':     'data/tank.png',
			'capacity': (options['capacity'] !== undefined ? options['capacity'] : 1),
			'level': (options['level'] !== undefined ? options['level'] : 0)
		});

		super.setGeometry(this.point_);

		this.stylize();
	}



	/**
	 * @api
	 */
	move(ll) {
		this.point_.setCoordinates(ll);
		this.changed();
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
		this.setStyle(new Style({
			zIndex: 6,
			geometry: this.point_,
			image: this.pin_
		}));
	};

	/**
	 * @api
	 */
	getGeometry() {
		if (this.visibility_ === false) {
			return undefined;
		}

		return  super.getGeometry();
	};

	/**
	 * @api
	 */
	getVisibility() {
		return this.visibility_;
	}

}
