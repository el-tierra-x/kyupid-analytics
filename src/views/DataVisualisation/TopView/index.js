import React from 'react';
import Chart from "react-google-charts";
import sort from 'array-sort'
import { Person, PersonAddAlt, VerifiedUser, Boy, Girl, Looks5, Paid } from '@mui/icons-material';

import CountUp from 'react-countup';

import './topView.css'
import { addingCommasToNumber } from '../../../utils/helpers';

class TopView extends React.PureComponent {


  getCardUI = (name, value, maleUsers, type) => {
    const femaleUsers = value - maleUsers;
    const malePerc = (maleUsers / value) * 100;
    const femalePerc = (femaleUsers / value) * 100;

    return (
      <div className='tv45Main'>

        {this.getIconUi(name)}

        <div className='tv45Text' style={{ marginTop: 4 }}>{name}</div>

        <div style={{ marginTop: 22 }}>
          <CountUp
            end={value}
            duration={1}
            useEasing={true}
            className='tv45Value'
            formattingFn={this.formatter}
          />
          {type && <span>{type}</span>}
        </div>

        {
          maleUsers && !isNaN(maleUsers) &&
          (<div className='valign-wrapper vspace-between' style={{ marginTop: 8 }}>
            <div className='valign-wrapper tv45Center'>
              <Boy fontSize='20px' style={{ width: 20, height: 20, marginLeft: -6, color: 'blue' }} />
              <div className='fs14 '>{malePerc.toFixed(0)}%</div>
            </div>

            <div className='valign-wrapper tv45Center' style={{ marginLeft: 4, color: 'orange' }}>
              <Girl fontSize='20px' style={{ width: 20, height: 20 }} />
              <div className='fs14 '>{femalePerc.toFixed(0)}%</div>
            </div>
          </div>)
        }
      </div >
    );
  }

  getIconUi = (name) => {
    if (name === 'Total Users') {
      return <Person style={{ height: 25, width: 25 }} />
    }

    else if (name === 'Total Matches') {
      return <VerifiedUser style={{ height: 25, width: 25 }} />
    }

    else if (name === 'Average Age') {
      return <Looks5 style={{ height: 25, width: 25 }} />
    }

    return <PersonAddAlt style={{ height: 25, width: 25 }} />
  }


  formatter = (number) => {
    return addingCommasToNumber((number).toFixed(0));
  }

  render() {
    const { processedAreaData: { overallData } } = this.props;


    return (
      <div className='valign-wrapper vspace-between'>
        <div className='tv45Divcard'>
          <div className='valign-wrapper'>

            {this.getCardUI('Total Users', overallData?.totalUsers, overallData?.totalMaleUsers)}
            <div style={{ marginLeft: 50 }}>
              {this.getCardUI('Pro Users', overallData?.totalProUsers, overallData?.totalMaleProUsers)}
            </div>

          </div>

          <div className='valign-wrapper' style={{ marginTop: 50 }}>
            {this.getCardUI('Total Matches', overallData?.totalMatches)}

            <div style={{ marginLeft: 50 }}>
              {this.getCardUI('Average Age', (overallData?.totalAge / overallData?.totalUsers), null, 'Yrs')}
            </div>
          </div>
        </div>

        <div>
          {this.getMostRevenueUI()}
        </div>

        <div className=''>
          {this.getProUserPieChart(overallData)}
          {this.getGenderPieChart(overallData)}
        </div>
      </div>

    );
  }


  getProUserPieChart = (overallData) => {
    const data = [
      [ 'Normal Users', 'Pro Users' ],
      [ 'Pro User', overallData?.totalProUsers ],
      [ 'Normal Users', overallData?.totalUsers - overallData?.totalProUsers ]
    ];

    return this.getPieChartUI(data, "User Distribution", "#2BB673", "#d91e48");
  }


  getGenderPieChart = (overallData) => {
    const data = [
      [ 'Males Users', 'Female Users' ],
      [ 'Males Users', overallData?.totalMaleUsers ],
      [ 'Female Users', overallData?.totalFemaleUsers ]
    ];

    return this.getPieChartUI(data, "Gender Distribution", "#007fad", "#e9a227");
  }


  getMostRevenueUI = () => {
    const { processedAreaData: { totalAreaArray } } = this.props;

    const sortedData = sort(totalAreaArray, 'proUsers', { reverse: true }).slice(0, 5);
    return (
      <div className='white-background' style={{ padding: '20px 50px' }}>
        <div className='valign-wrapper absolute-center'>
          <Paid style={{ height: 30, width: 30 }} className='' />
        </div>
        <div className='fs20 fw500 center-align'>Most Revenue Areas</div>
        <div className='fs14 fw500 center-align'>(Area Id)</div>
        {
          sortedData?.map((item, index) => {
            return (
              <div className='tv45Revenue'>
                {item?.areaId}
              </div>
            );
          })
        }
      </div>
    );
  }


  getPieChartUI = (data, title, color1, color2) => {
    const pieOptions = {
      title: title,
      pieHole: 0.6,
      slices: [
        {
          color: color1
        },
        {
          color: color2
        }
      ],
      legend: {
        position: "bottom",
        alignment: "center",
        textStyle: {
          color: "233238",
          fontSize: 14
        }
      },
      tooltip: {
        showColorCode: true
      },
      chartArea: {
        left: 0,
        top: 0,
        width: "100%",
        height: "80%"
      },
      fontName: "Roboto"
    };
    return <Chart
      chartType="PieChart"
      data={data}
      options={pieOptions}
      animate
      graph_id={title}
      legend_toggle
    />
  };
}

export default TopView;
