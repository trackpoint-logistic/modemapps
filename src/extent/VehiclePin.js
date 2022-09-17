import Icon from 'ol/style/Icon.js';


export default class VehiclePin extends Icon {

	constructor(options) {
		const opt = options || {};

		super(opt);

		/**
		 * @private
		 * @type {number}
		 */
		this.direction_ = opt['direction'] !== undefined
			? Number(opt['direction'])
			: 0;

		/**
		 * @private
		 * @type {boolean}
		 */
		this.visibility_ = opt['visibility'] !== undefined
			? Boolean(opt['visibility'])
			: true;

		/**
		 * @private
		 * @type {boolean}
		 */
		this.displayArrow_ = opt['displayArrow'] !== undefined
			? Boolean(opt['displayArrow'])
			: true;

		/**
		 * @private
		 * @type {string}
		 */
		this.arrowColor_ = opt['arrowColor'] !== undefined
			? String(opt['arrowColor'])
			: "#00650c";

		/**
		 * @private
		 * @type {boolean}
		 */
		this.displayLabel_ = opt['displayLabel'] !== undefined
			? Boolean(opt['displayLabel'])
			: true;

		/**
		 * @private
		 * @type {string}
		 */
		this.label_ = opt['label'] !== undefined
			? String(opt['label'])
			: "";

		/**
		 * @private
		 * @type {string}
		 */
		this.labelColor_ = opt['labelColor'] !== undefined
			? String(opt['labelColor'])
			: "#00650c";

		/**
		 * @private
		 * @type {HTMLCanvasElement}
		 */
		this.canvas_ = document.createElement('canvas');
		this.canvas_.width = 56;
		this.canvas_.height = 60;

		/**
		 * @private
		 * @type {Array.<number>}
		 */
		this.anchor_ = opt['anchor'] !== undefined
			? opt['anchor']
			: [28, 30];

		/**
		 * @private
		 * @type {Array.<number>}
		 */
		this.size_ = [56, 60];

		/**
		 * @private
		 * @type {Array.<number>}
		 */
		this.origin_ = [0, 0];

		/**
		 * @private
		 * @type {boolean}
		 */
		this.drawed_ = false;
	};

	getAnchor() {
		return this.anchor_;
	};


	/**
	 * @inheritDoc
	 * @return {HTMLCanvasElement}
	 * @api
	 */
	getImage(pixelRatio) {
		if (this.drawed_ == false) {
			this.draw(pixelRatio);
			this.drawed_ = true;
		}
		return this.canvas_;
	};


	/**
	 * @inheritDoc
	 * @api
	 */
	getOrigin() {
		return this.origin_;
	};


	/**
	 * @inheritDoc
	 */
	setDisplayArrow(v) {
		this.displayArrow_ = Boolean(v);
		this.drawed_ = false;
	};

	/**
	 * @inheritDoc
	 */
	setDisplayLabel(v) {
		this.displayLabel_ = Boolean(v);
		this.drawed_ = false;
	};

	/**
	 * @inheritDoc
	 */
	setLabel(t) {
		this.label_ = String(t);
		this.drawed_ = false;
	};

	/**
	 * @inheritDoc
	 */
	getLabel() {
		return this.label_;
	};

	/**
	 * @inheritDoc
	 */
	setDirection(d) {
		this.direction_ = Number(d);
		this.drawed_ = false;
	};

	/**
	 * 
	 * Draw image.
	 * @function
	 * @private
	 * @param {number} pixelRatio Pixel ratio.
	 */
	draw(pixelRatio) {

		const context_ = this.canvas_.getContext('2d');

		context_.clearRect(
			0,
			0,
			56,
			60);

		context_.strokeStyle = this.arrowColor_;
		context_.fillStyle = this.arrowColor_;
		context_.lineWidth = 1;

		context_.save();
		context_.drawImage(super.getImage(pixelRatio), 8, 8);
		context_.restore();

		if (this.displayArrow_ == true) {
			context_.save();
			context_.translate(29.5, 28);
			context_.rotate(-(360 - this.direction_ + 90) * Math.PI / 180);
			context_.beginPath();
			context_.moveTo(20, -5);
			context_.lineTo(20, 5);
			context_.lineTo(25.5, 0);
			context_.lineTo(20, -5);
			context_.fill();
			context_.stroke();
			context_.restore();
		}


		if (this.displayLabel_ == true) {
			context_.save();
			context_.translate(29.5, 33);
			context_.font = "bold 16px Open Sans";
			context_.fillStyle = this.labelColor_;
			context_.textAlign = 'center';
			context_.fillText(this.label_, 0, 0);
			context_.restore();
		}
	};
}
