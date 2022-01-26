import React from 'react';

import { MapContainer as Leaflet, TileLayer } from "react-leaflet";

import GeoJsonMain from './GeoJsonMain';


class MapContainer extends React.PureComponent {

  render() {
    const { data, processedData } = this.props;

    return (
      <div>
        <Leaflet
          center={[ 12.97, 77.59 ]}
          zoom={11}
          style={{ height: '100vh', width: '100%' }}
        >
          <TileLayer
            attribution='Data by &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <GeoJsonMain data={data} processedData={processedData} />
        </Leaflet>
      </div>
    );
  }
}


export default MapContainer;
