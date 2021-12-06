import React,{useState,useEffect} from 'react'
import './Sidebar.css';
import axios from 'axios';
import {ApiKey} from '../../config';
import ReactApexChart from 'react-apexcharts'

export default function Sidebar() {
    const [loading,setLoading]=useState(false);
    const [dowChartPreviousClose,setDowChartPreviousClose]=useState(null);
    const [results,setResults]=useState(null);
    
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

    let fetchDowJone=()=>{
        setLoading(true);
        var headers = {
            'accept': 'application/json',
            'X-API-KEY': "0PUnwhgRwA2y8QKzEutBdcEmzHly1YS480sWju21"
        };
        axios.get('https://yfapi.net/v8/finance/chart/%5EDJI?range=1mo&region=US&interval=1d&lang=en&events=div%2Csplit',
        {
            headers: headers
        }
        ).then((resp)=>{
            console.log(resp.data);
            let data=[];
            let x=resp.data.chart.result[0].meta.chartPreviousClose;
            let t=resp.data.chart.result[0].timestamp;
            let h=resp.data.chart.result[0].indicators.quote[0].high;
            let l=resp.data.chart.result[0].indicators.quote[0].low;
            let o=resp.data.chart.result[0].indicators.quote[0].open;
            let c=resp.data.chart.result[0].indicators.quote[0].close;

            
            for(let i=0;i<t.length;++i){
                console.log(t[i],h[i],l[i],o[i],c[i]);
                data.push({
                    x: new Date(t[i]),
                    y: [o[i],h[i],l[i],c[i]]
                });             
            }

            let chart_Data= [{
                data: data
            }];
            console.log(chart_Data);
            setResults(chart_Data);
            setDowChartPreviousClose(x);
            setLoading(false);
        })
        .catch((err)=>{
            console.log(err);
            setLoading(false);
        })
    }
    useEffect(()=>{
        fetchDowJone();
    },[]);
    return (
            (!loading&&results)?(
            <div className="sidebarArea">
                <div className="indianBtn">
                    Indian Markets
                </div>
                <div className="indianBtn">
                    US Markets
                </div>
                <div className="dow_jones">
                    DJI - Dow Jones <br/>Industrial Average
                </div>     
                <div className="price">
                    {dowChartPreviousClose}
                </div>
                <div className="candleChart">
                    <ReactApexChart options={options} series={results} type="candlestick" height={350} />
                </div>
            </div>
            ):('')
    )
}
