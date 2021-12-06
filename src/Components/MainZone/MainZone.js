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
          text: 'CandleStick Chart',
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
                <div className="apexChart">
                     <ReactApexChart options={options} series={props.chartData} type="candlestick" height={500} />
                </div>
            ):(
                <div className="loaderArea">
                    <img style={{width:'200px'}} src={Spinner}></img>
                </div>
            )
    )
}
