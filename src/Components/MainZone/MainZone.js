import React,{useState,useEffect} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import ReactApexChart from 'react-apexcharts'
import './MainZone.css';
import Spinner from '../../assests/mspin.gif';

export default function MainZone(props) {
    let options={
        chart: {
          type: 'candlestick',
          height: 350
        },
        title: {
          text: '',
          align: 'left'
        },
        xaxis: {
          type: 'datetime'
        },
        yaxis: {
          tooltip: {
            enabled: true
          }
        }
    }
    console.log(props.chartData);

    return (
            (!props.loading&&props.chartData)?(
              <div className='ourarea'>
                <div className="bigban">
                  {props.metaData?.symbol}
                </div>
                <div className="closes">
                $ {props.metaData?.chartPreviousClose}
                </div>
                <div className="apexChart">
                     <ReactApexChart options={options} series={props.chartData} type="candlestick" height={500} />
                </div>
                <div className="btm_buttons">
                  <button className='oneofthem'>
                    1D
                  </button>
                  <button className='oneofthem'>
                    5D
                  </button>
                  <button className='oneofthem'>
                    1M
                  </button>
                  <button className='oneofthem'>
                    3M
                  </button>
                  <button className='oneofthem'>
                    6M
                  </button>
                  <button className='oneofthem'>
                    YTD
                  </button>
                  <button className='oneofthem'>
                    1Y
                  </button>
                  <button className='oneofthem'>
                    5Y
                  </button>
                  <button className='oneofthem'>
                    MAX
                  </button>
                </div>
              </div>
            ):(
                <div className="loaderArea">
                    <img style={{width:'200px'}} src={Spinner}></img>
                </div>
            )
    )
}
