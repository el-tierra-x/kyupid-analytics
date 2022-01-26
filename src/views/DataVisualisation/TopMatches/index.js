import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import sort from 'array-sort'
import MapGenerator from './MapGenerator';
class TopMatches extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      sortedData: this.sortData()

    }
  }

  render() {
    const { name, processedAreaData: { overallData, areaWiseData }, geoJsonData, sortByValue } = this.props
    return (
      <div style={{ marginTop: 50 }}>

        <div className='fs20 fw500' style={{ marginBottom: 20 }}>{name}</div>

        <div className='valign-wrapper vspace-between'>
          <div style={{ width: '40%' }} className='white-background'>
            {this.getTableUI()}
          </div>

          <div style={{ width: '55%' }}>
            <MapGenerator
              geoJsonData={geoJsonData}
              areaWiseData={areaWiseData}
              sortType={sortByValue}
              overallData={overallData}
            />
          </div>
        </div>


      </div>
    );
  }


  getTableUI = () => {
    const { sortedData } = this.state;
    const { processedAreaData: { overallData } } = this.props

    const totalUsers = overallData?.totalUsers;

    const slicedData = sortedData.slice(0, 13);

    console.log(slicedData)

    return (
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow style={{ padding: '16px 0px', height: 60 }}>
            <TableCell>Area Id</TableCell>
            <TableCell align="center">Total Users</TableCell>
            <TableCell align="right">Matches</TableCell>
            <TableCell align="right">Matches Per User</TableCell>
            <TableCell align="right">Matches Per Pro User</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {
            slicedData?.map((item) => {
              const matchPerUser = (item?.totalMatches / item?.totalUsers) * 100
              const matchPerProUser = (item?.totalMatches / item?.proUsers) * 100

              return (
                <TableRow key={item?.areaId}>
                  <TableCell component="th" scope="row" align="center">
                    {item.areaId}
                  </TableCell>
                  <TableCell align="center">{item?.totalUsers}</TableCell>
                  <TableCell align="center">{item?.totalMatches}</TableCell>
                  <TableCell align="right">{matchPerUser.toFixed(2)}%</TableCell>
                  <TableCell align="right">{matchPerProUser.toFixed(2)}%</TableCell>
                </TableRow>
              );
            })
          }
        </TableBody>
      </Table>
    );
  }


  sortData = () => {
    const { processedAreaData, sortByValue } = this.props;

    const areaDataArray = processedAreaData?.totalAreaArray;

    const sortedData = sort(areaDataArray, sortByValue, { reverse: true });

    return sortedData;
  }
}


export default TopMatches;
