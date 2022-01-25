import isEmpty from 'lodash/isEmpty';
import React from 'react';

import { MapContainer, TileLayer } from "react-leaflet";


import "leaflet/dist/leaflet.css";

import { getAllUsersDataApi, getGeoJsonDataApi } from '../../utils/api';

import GeoJsonMain from './GeoJsonMain';
import { parseUserData } from '../../utils/helpers';


class DataVisualisation extends React.PureComponent {
  state = {
    geoData: {
      isLoading: false,
      isError: false,
      data: null
    },
    userData: {
      data: null,
      isLoading: false,
      isError: false
    },
    processedData: {},
    isProcessingData: true
  }

  componentDidMount() {
    this.getGeoJsonData();
    this.getUserData();
  }


  render() {
    const { geoData: { data }, processedData } = this.state

    if (isEmpty(data) || isEmpty(processedData)) {
      return null;
    }

    // const bboxArray = bbox(data);
    // const corner1 = [ bboxArray[ 1 ], bboxArray[ 0 ] ];
    // const corner2 = [ bboxArray[ 3 ], bboxArray[ 2 ] ];
    // // const mapBounds = [ corner1, corner2 ];

    return (
      <div>
        <MapContainer
          center={[ 12.97, 77.59 ]}
          zoom={11}
          zoomControl={true}
          style={{ height: '100vh', width: '100%' }}
        >
          <TileLayer
            attribution='Data by &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* <ZoomControl position='topright' /> */}
          <GeoJsonMain data={data} processedData={processedData} />
        </MapContainer>
      </div >
    );
  }


  getGeoJsonData = () => {
    this.setState(prevState => ({
      geoData: {
        ...prevState.geoData,
        isLoading: true,
        isError: false
      }
    }))

    getGeoJsonDataApi().then((res) => {
      this.setState({
        geoData: {
          isLoading: false,
          data: res.data,
          isError: false
        }
      });

    }).catch((e) => {
      this.setState({
        geoData: {
          isLoading: false,
          data: null,
          isError: true
        }
      })
    })
  }


  getUserData = () => {
    this.setState(prevState => ({
      userData: {
        ...prevState.userData,
        isLoading: true,
        isError: false
      }
    }))

    getAllUsersDataApi().then((res) => {
      this.setState({
        userData: {
          isLoading: false,
          data: res.data,
          isError: false
        }
      }, this.processUserSpecificData);

    }).catch((e) => {
      this.setState({
        userData: {
          isLoading: false,
          data: null,
          isError: true,
          isProcessingData: false
        }
      })
    })

  }


  processUserSpecificData = () => {
    const { userData: { data } } = this.state;

    const processedData = parseUserData(data?.users);

    this.setState({
      processedData,
      isProcessingData: true
    })
  }
}

export default DataVisualisation;
