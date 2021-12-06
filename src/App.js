import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header';
import Sidebar from './Components/Sidebar/Sidebar';
import { useState } from 'react';
import axios from 'axios';
import MainZone from './Components/MainZone/MainZone';
function roundToTwo(num) {    
  return +(Math.round(num + "e+2")  + "e-2");
}
function App() {
  let [search,setSearch]=useState('');
  let [loading,setLoading]=useState(false);
  let [chartData,setChartData]=useState([]);

  let searchStock=((searchVal,timeRange)=>{
    setLoading(true);
    let endPoint=`https://yfapi.net/v8/finance/chart/${searchVal}?range=1mo&region=US&interval=1d&lang=en&events=div%2Csplit`;
    var headers = {
      'accept': 'application/json',
      'X-API-KEY': "0PUnwhgRwA2y8QKzEutBdcEmzHly1YS480sWju21"
    };
    axios.get(endPoint,{
      headers:headers
    }).then((resp)=>{
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
            y: [roundToTwo(o[i]),roundToTwo(h[i]),roundToTwo(l[i]),roundToTwo(c[i])]
        });             
      }

      let chart_Data= [{
        data: data
      }];
      console.log(chart_Data);
      setChartData(chart_Data);
      setLoading(false);
    })
    .catch((err)=>{
      console.log(err);
      setLoading(false);
    });
  });

  return (
    <div className="App">
      <Header search={search} setSearch={setSearch} searchStock={searchStock}></Header>
      <div className="mainZone">
        <div className="sidebarZone">
          <Sidebar></Sidebar>
        </div>
        <div className="rightZone">
            <MainZone loading={loading} chartData={chartData}></MainZone>
        </div>
      </div>
    </div>
  );
}

export default App;
