import Icon from 'ol/style/Icon.js';


export default class TankPin extends Icon {

	constructor(options) {
		const opt = options || {};

		super(opt);

		/**
		 * @private
		 * @type {boolean}
		 */
		this.visibility_ = (opt['visibility'] !== undefined ? opt['visibility'] : true);

		/**
		 * @private
		 * @type {number}
		 */
		this.level_ = (opt['level'] !== undefined ? opt['level'] : 0);


		/**
		 * @private
		 * @type {number}
		 */
		this.capacity_ = (opt['capacity'] !== undefined ? opt['capacity'] : 1);

		/**
		 * @private
		 * @type {HTMLCanvasElement}
		 */
		this.canvas_ = document.createElement('canvas');
		this.canvas_.width = 45;
		this.canvas_.height = 52;

		/**
		 * @private
		 * @type {Array.<number>}
		 */
		this.anchor_ = (opt['anchor'] !== undefined ? opt['anchor'] : [22, 52]);

		/**
		 * @private
		 * @type {Array.<number>}
		 */
		this.size_ = [45, 52];

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
	 * @api
	 */
	setLevel(l) {
		this.level_= l;
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
		context_.clearRect(0, 0, 45, 52);
		context_.drawImage(super.getImage(pixelRatio), 0, 0);


		context_.beginPath();
		let i = 1;
		if(this.level_ < this.capacity_){
			i = this.level_ / this.capacity_;
		}

		const h = i * 100;
		const x = Math.max(Math.min(i * 52, 52),2);

		context_.fillStyle   = 'hsl(' + [h, '90%', '55%'] + ')';
		context_.fillRect(2, 52-x, 45, x);
		context_.stroke();
	
		context_.beginPath();
		context_.lineWidth = '2';
		context_.strokeStyle = '#000';
		context_.rect(1, 1, 43, 50);
		context_.stroke();
	
	
		context_.beginPath();
		context_.lineWidth = '2';
		context_.strokeStyle = '#000';
		
		context_.moveTo(45, 13);
		context_.lineTo(30, 13);
	
		context_.moveTo(45, 25);
		context_.lineTo(19, 25);
	
		context_.moveTo(45, 38);
		context_.lineTo(30, 38);
		context_.stroke();
	
		context_.save();
	};
}
