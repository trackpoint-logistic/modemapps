/**
 * @module ol/trackpoint/Cluster
 */

import BaseCluster from 'ol/source/Cluster.js';

import {
	buffer,
	createEmpty,
	extendCoordinate,
	createOrUpdateFromCoordinate,
	getCenter} from 'ol/extent.js';
import { scale as scaleCoordinate, add as addCoordinate } from 'ol/coordinate.js';

import GeometryCollection from 'ol/geom/GeometryCollection.js';

import Fill from 'ol/style/Fill.js';
import Text from 'ol/style/Text.js';
import Style from 'ol/style/Style.js';
import Stroke from 'ol/style/Stroke.js';
import Circle from 'ol/style/Circle.js';

import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';

import VehicleMarker from './VehicleMarker.js';
import TankMarker from './TankMarker.js';

export default class Cluster extends BaseCluster {

	constructor(options) {

		options.geometryFunction = function (feature) {

			const geometry = feature.getGeometry();

			if (geometry instanceof GeometryCollection) {
				return geometry.getGeometries()[0];
			}

			return geometry;
		};

		super(options);

		/**
		 * @type {Circle}
		 * @private
		 */
		this.green = new Circle({
			radius: 14,
			stroke: new Stroke({
				color: '#03bf13',
				width: 3
			}),
			fill: new Fill({
				color: '#fff'
			})
		});

		/**
		 * @type {Circle}
		 * @private
		 */
		this.orange = new Circle({
			radius: 16,
			stroke: new Stroke({
				color: '#ff9600',
				width: 3
			}),
			fill: new Fill({
				color: '#fff'
			})
		});

		/**
		 * @type {Circle}
		 * @private
		 */
		this.red = new Circle({
			radius: 18,
			stroke: new Stroke({
				color: '#ec485e',
				width: 3
			}),
			fill: new Fill({
				color: '#fff'
			})
		});
	}


	cluster() {
		if (this.resolution === undefined) {
			return;
		}
		this.features = [];
		const extent = createEmpty();
		const mapDistance = this.distance * this.resolution;
		const features = this.source.getFeatures();

		const clustered = new WeakSet();

		//for (let i = 0, ii = features.length; i < ii; i++) {
		for (let i = features.length - 1; i >= 0; --i) {
			const feature = features[i];

			if (feature instanceof VehicleMarker || feature instanceof  TankMarker) {
				if (feature.getImmutable() == true || feature.getVisibility() == false) {

					clustered.add(feature);

					if (feature.getImmutable() == true) {
						this.features.push(feature);
					}

					continue;
				}
			}

			if (clustered.has(feature) == false) {
				const geometry = this.geometryFunction(feature);
				if (geometry) {
					const coordinates = geometry.getCoordinates();

					createOrUpdateFromCoordinate(
						coordinates,
						extent);

					buffer(extent, mapDistance, extent);

					let neighbors = this.source.getFeaturesInExtent(extent);
					neighbors = neighbors.filter(function (neighbor) {

						if (clustered.has(neighbor) == false) {
							clustered.add(neighbor);
							return true;
						} else {
							return false;
						}
					});

					if(neighbors.length == 1){
						this.features.push(feature);
					}else{
						this.features.push(this.createCluster(neighbors));
					}
					
				}
			}
		}
	}

	createCluster(features) {

		const length = features.length
		let centroid = [0, 0];

		const extent = createEmpty();

		for (let i = length - 1; i >= 0; --i) {
			const geometry = this.geometryFunction(features[i]);

			extendCoordinate(extent, geometry.getCoordinates());

			if (geometry) {
				addCoordinate(centroid, geometry.getCoordinates());
			} else {
				features.splice(i, 1);
			}
		}

		scaleCoordinate(centroid, 1 / length);

		let image;

		if (length > 10) {
			image = this.red
		} else if (length > 5) {
			image = this.orange
		} else {
			image = this.green
		}

		const style = new Style({
			zIndex: 5,
			image: image,
			text: new Text({
				font: "bold 12px Open Sans",
				text: String(length),
				textAlign: 'center',
				textBaseline: 'middle',
				fill: new Fill({
					color: '#000'
				})
			})
		});

		const searchCenter = getCenter(extent);
		const ratio = this.interpolationRatio;
		const geometry = new Point([
			centroid[0] * (1 - ratio) + searchCenter[0] * ratio,
			centroid[1] * (1 - ratio) + searchCenter[1] * ratio,
		]);

		geometry.getExtent = ()=>{
			return extent
		};

		const cluster = new Feature({
			geometry: geometry
		});

		cluster.cluster = true;
		cluster.setStyle(style);
		return cluster;
	}

}