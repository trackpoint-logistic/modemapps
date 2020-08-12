import LayerVector from 'ol/layer/Vector';
import SourceVector from 'ol/source/Vector';
import {fromLonLat} from 'ol/proj';
import SourceCluster from './extent/Cluster.js';

import TankMarker from './extent/TankMarker';
import VehicleMarker from './extent/VehicleMarker';
import OLMap from './ol-map';
import OLLayerOSM from './ol-layer-osm';
import OLLayerMarker from './ol-layer-marker';


let ol = {};

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

customElements.define('ol-layer-marker', OLLayerMarker);
customElements.define('ol-layer-osm', OLLayerOSM);
customElements.define('ol-map', OLMap);

export default ol;
