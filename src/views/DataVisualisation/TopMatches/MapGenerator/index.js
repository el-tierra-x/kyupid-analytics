import React from 'react';

import { GeoJSON, MapContainer, TileLayer } from "react-leaflet";

class MapGenerator extends React.PureComponent {

  render() {
    const { geoJsonData, sortType } = this.props
    return (
      <div>
        <MapContainer
          center={[ 12.97, 77.59 ]}
          zoom={11}
          style={{ height: '480px', width: '100%' }}
        >
          <TileLayer
            attribution='Data by &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {
            geoJsonData?.features?.map((item) => {
              const areaId = item?.properties?.area_id;

              const color = this.getColorCode(areaId)

              return (
                <GeoJSON
                  key={areaId + sortType}
                  ref={this.geoRef}
                  data={item}
                  pathOptions={{
                    color: "#9370DB",
                    fillColor: `rgb(${color[ 0 ]},${color[ 1 ]},${color[ 2 ]})`,
                    fillOpacity: 0.7,
                    opacity: 1,
                    weight: 1
                  }}
                  attribution="&copy; credits due..."
                  onEachFeature={(feature, layer) => {
                    const areaId = feature?.properties?.area_id;

                    layer.bindTooltip(
                      `<div>
                      <div class = "infoboxHeader">${areaId}</div>
                      <div class = "infoboxHeader">${feature?.properties?.name}</div>
                      <div class = "infoboxHeader">${feature?.properties?.pin_code}</div>
                      </div>
                      `
                    );

                  }}
                >

                </GeoJSON>
              );
            })

          }
        </MapContainer>
      </div>
    );
  }



  getColorCode = (areaCode) => {
    const { sortType } = this.props;

    const weight = this.getWeight(sortType, areaCode)

    const color = this.pickHex([ 205, 209, 228 ], [ 1, 1, 122 ], weight);

    return color;
  }

  pickHex = (color1, color2, weight) => {
    var w1 = weight;
    var w2 = 1 - w1;
    var rgb = [ Math.round(color1[ 0 ] * w1 + color2[ 0 ] * w2),
    Math.round(color1[ 1 ] * w1 + color2[ 1 ] * w2),
    Math.round(color1[ 2 ] * w1 + color2[ 2 ] * w2) ];
    return rgb;
  }


  getWeight = (type, areaCode) => {
    const { areaWiseData, overallData } = this.props;

    const areaData = areaWiseData[ areaCode ];

    switch (type) {
      case 'totalUsers':
        return (areaData?.totalUsers / overallData?.totalUsers) * 100;

      case 'proUsers':
        return (areaData?.proUsers / overallData?.totalProUsers) * 100

      case 'totalMatches':
        return (areaData?.totalMatches / overallData?.totalMatches) * 100

      default: return 1;
    }
  }
}


export default MapGenerator;
