import LayerVector from 'ol/layer/Vector';
import SourceVector from 'ol/source/Vector';
import {fromLonLat} from 'ol/proj';
import SourceCluster from './extent/Cluster.js';

import TankMarker from './extent/TankMarker';
import VehicleMarker from './extent/VehicleMarker';
import OLMap from './ol-map';
import OLLayerOSM from './ol-layer-osm';
import OLLayerMarker from './ol-layer-marker';

import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';

const ol = {};

ol.fromLonLat = fromLonLat;

ol.trackpoint = {};

ol.trackpoint.TankMarker = TankMarker;
ol.trackpoint.VehicleMarker = VehicleMarker;

ol.source = {
	Vector: SourceVector,
	Cluster: SourceCluster
};

ol.layer = {
	Vector: LayerVector
};

ol.Feature = Feature;
ol.Point = Point;

customElements.define('ol-layer-marker', OLLayerMarker);
customElements.define('ol-layer-osm', OLLayerOSM);
customElements.define('ol-map', OLMap);

export default ol;
