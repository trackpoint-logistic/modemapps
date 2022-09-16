import LayerVector from 'ol/layer/Vector';
import SourceVector from 'ol/source/Vector';
import {fromLonLat} from 'ol/proj';
import SourceCluster from './extent/Cluster.js';

import TankMarker from './extent/TankMarker';
import VehicleMarker from './extent/VehicleMarker';


import OLMap from './ol-map';

import OLTileLayerOSM from './ol-tile-layer-osm';
import OLTileLayerMaptiler from './ol-tile-layer-maptiler';

import OLOverlay from './ol-overlay';

import OLLayerVector from './ol-layer-vector';



import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';

const ol = {};

ol.fromLonLat = fromLonLat;

ol.trackpoint = {
	TankMarker: TankMarker,
	VehicleMarker: VehicleMarker
};

ol.source = {
	Vector: SourceVector,
	Cluster: SourceCluster
};

ol.layer = {
	Vector: LayerVector
};

//ol.Feature = Feature;
//ol.Point = Point;

customElements.define('ol-map', OLMap);

customElements.define('ol-tile-osm', OLTileLayerOSM);
customElements.define('ol-tile-maptiler', OLTileLayerMaptiler);

customElements.define('ol-overlay', OLOverlay);

customElements.define('ol-layer-vector', OLLayerVector);


export default ol;
