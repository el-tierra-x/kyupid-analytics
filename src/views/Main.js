import React from 'react';
import DataVisualisation from './DataVisualisation';

import './main.css'


class Main extends React.PureComponent {
  render() {
    return (
      <div className='width100'>
        <h1 className='absolute-center'>Data Visualisation</h1>

        <div>
          <DataVisualisation />
        </div>
      </div>
    );
  };
}

export default Main;
