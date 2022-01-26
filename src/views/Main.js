import React from 'react';

import Box from '@mui/material/Box';

import DataVisualisation from './DataVisualisation';
import Navigator from './Navigator'

import './main.css'


class Main extends React.PureComponent {
  render() {
    return (
      <div className='width100'>
        <Navigator />

        <div className='MainCont'>
          <DataVisualisation />
        </div>
      </div>
    );
  };
}

export default Main;
