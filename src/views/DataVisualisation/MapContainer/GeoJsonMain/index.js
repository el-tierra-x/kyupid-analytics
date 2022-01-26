import React from 'react';

import { GeoJSON } from "react-leaflet";

class GeoJsonMain extends React.PureComponent {

  render() {
    const { data, processedData } = this.props
    return (
      <div>
        {
          data?.features?.map((item) => {
            const areaId = item?.properties?.area_id;

            const color = this.getColorCode(areaId)

            return (
              <GeoJSON
                key={areaId}
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

                  const areaData = processedData[ areaId ];

                  layer.bindTooltip(
                    `<h3 class = "infoboxHeader">User Data</h3><TABLE BORDER="1" CELLSPACING="1" WIDTH="300 COlOR="Green"">
                    <TR><TD BGCOLOR="#70F989">Area Name</TD> <TD>${feature?.properties?.name}</TD></TR>
                     <TR><TD BGCOLOR="#70F989">Total Users</TD> <TD>${areaData?.totalUsers}</TD></TR>
                     <TR><TD BGCOLOR="#70F989">Pro Users</TD> <TD>${areaData?.proUsers}</TD>
                     <TR><TD BGCOLOR="#70F989">Male Users</TD> <TD>${areaData?.maleUsers}</TD>
                     <TR><TD BGCOLOR="#70F989">Female Users</TD> <TD>${areaData?.femaleUsers}</TD>
                     <TR><TD BGCOLOR="#70F989">Average Age</TD> <TD>${areaData?.totalAge / areaData?.totalUsers}</TD>
                     <TR><TD BGCOLOR="#70F989">Total Matches</TD> <TD>${areaData?.totalMatches}</TD>
                     </TABLE>`
                  );
                  // layer.setPopupContent(<h1>teste</h1>);
                  layer.on({
                    mouseover: function (e) {
                      const auxLayer = e.target;
                      auxLayer.setStyle({
                        weight: 4,
                        color: "#800080",
                        fillColor: 'dark_blue'
                      });
                    },
                    mouseout: function (e) {
                      const auxLayer = e.target;
                      auxLayer.setStyle({
                        weight: 1,
                        color: "#9370DB",
                        fillColor: `rgb(${color[ 0 ]},${color[ 1 ]},${color[ 2 ]})`,
                        dashArray: "",
                        fillOpacity: 0.7,
                        opacity: 1
                      });
                    }
                  });
                }}
              >

              </GeoJSON>
            );
          })

        }
      </div>
    );
  }



  getColorCode = (areaCode) => {
    const { processedData } = this.props;

    const areaData = processedData[ areaCode ];

    const weight = areaData?.maleUsers / areaData?.femaleUsers

    const color = this.pickHex([ 255, 255, 0 ], [ 137, 49, 1 ], weight);

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
}


export default GeoJsonMain;
