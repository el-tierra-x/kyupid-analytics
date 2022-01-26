import isEmpty from 'lodash/isEmpty';
import React from 'react';

import { CircularProgress } from '@mui/material'

import "leaflet/dist/leaflet.css";

import { getAllUsersDataApi, getGeoJsonDataApi } from '../../utils/api';
import { parseUserData } from '../../utils/helpers';

import MapContainer from './MapContainer';
import TopView from './TopView';
import TopAreas from './TopAreas';
import TopProAreas from './TopProAreas';
import TopMatches from './TopMatches';



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
    processedAreaData: {},
    isProcessingData: true
  }

  componentDidMount() {
    this.getGeoJsonData();
    this.getUserData();
  }


  render() {
    const { geoData: { data, isLoading }, processedAreaData, userData } = this.state;


    if (isLoading || userData?.isLoading || isEmpty(processedAreaData)) {
      return (
        <div className='absolute-center' style={{ marginTop: '20%' }}>
          <CircularProgress />
        </div>
      );
    }

    if (isEmpty(data) || isEmpty(processedAreaData)) {
      return null;
    }

    return (
      <div>
        <TopView processedAreaData={processedAreaData} />

        <div>
          <TopAreas name="Top Areas" processedAreaData={processedAreaData} geoJsonData={data} sortByValue="totalUsers" />
        </div>

        <div>
          <TopProAreas name="Top Areas by Pro Users" processedAreaData={processedAreaData} geoJsonData={data} sortByValue="proUsers" />
        </div>

        <div>
          <TopMatches name="Top Areas with Matches" processedAreaData={processedAreaData} geoJsonData={data} sortByValue="totalMatches" />
        </div>

        <div style={{ marginTop: 50, padding: 20 }} className='white-background'>
          <div className='fs24 fw600'>Overall Data by Maps</div>
          <div style={{ padding: 16 }} >
            <MapContainer data={data} processedData={processedAreaData?.areaWiseData} />
          </div>
        </div>
      </div>
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

    const processedAreaData = parseUserData(data?.users);

    this.setState({
      processedAreaData,
      isProcessingData: true
    })
  }
}

export default DataVisualisation;
