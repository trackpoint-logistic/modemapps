/**
 * @module ol/trackpoint/Cluster
 */

import BaseCluster from 'ol/source/Cluster.js';

import { getUid } from 'ol/util.js';

import { buffer, createEmpty, createOrUpdateFromCoordinate } from 'ol/extent.js';
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
		this.features.length = 0;
		const extent = createEmpty();
		const mapDistance = this.distance * this.resolution;
		const features = this.source.getFeatures();

		/**
		 * @type {!Object<string, boolean>}
		 */
		const clustered = {};

		for (let i = 0, ii = features.length; i < ii; i++) {
			const feature = features[i];

			if (feature instanceof VehicleMarker || feature instanceof  TankMarker) {
				if (feature.getImmutable() == true || feature.getVisibility() == false) {
					
					const uid = getUid(feature);

					clustered[uid] = true;

					if (feature.getImmutable() == true) {
						this.features.push(feature);
					}

					continue;
				}
			}


			if (!(getUid(feature) in clustered)) {
				const geometry = this.geometryFunction(feature);
				if (geometry) {
					const coordinates = geometry.getCoordinates();
					createOrUpdateFromCoordinate(coordinates, extent);
					buffer(extent, mapDistance, extent);

					let neighbors = this.source.getFeaturesInExtent(extent);
					neighbors = neighbors.filter(function (neighbor) {
						const uid = getUid(neighbor);
						if (!(uid in clustered)) {
							clustered[uid] = true;
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
		const length = features.length;

		let centroid = [0, 0];

		for (let i = 0; i < length; i++) {
			const geometry = this.geometryFunction(features[i]);
			if (geometry) {
				addCoordinate(centroid, geometry.getCoordinates());
			} else {
				features.splice(i, 1);
			}
		}

		scaleCoordinate(centroid, 1 / features.length);

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
				text: "" + length,
				textAlign: 'center',
				textBaseline: 'middle',
				fill: new Fill({
					color: '#000'
				})
			})
		});

		const cluster = new Feature({
			geometry: new Point(centroid)
		});

		cluster.set('features', features);
		cluster.cluster = true;

		cluster.setStyle(style);
		return cluster;
	}

}