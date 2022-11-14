import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import axios from "axios";
import { ApiKey } from "../../config";
import ReactApexChart from "react-apexcharts";
function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
}

export default function Sidebar(props) {
  const [loading, setLoading] = useState(false);
  const [dowChartPreviousClose, setDowChartPreviousClose] = useState(null);
  const [results, setResults] = useState(null);
  let [options, setOptions] = useState(null);
  let [metaData, setMetaData] = useState(null);

  let fetchDowJone = () => {
    setLoading(true);
    var headers = {
      accept: "application/json",
      "X-API-KEY": "0PUnwhgRwA2y8QKzEutBdcEmzHly1YS480sWju21      ",
    };
    axios
      .get(
        "https://yfapi.net/v8/finance/chart/%5EDJI?range=1mo&region=US&interval=1d&lang=en&events=div%2Csplit",
        {
          headers: headers,
        }
      )
      .then((resp) => {
        console.log(resp.data);
        let data = [];
        let xAxisData = [];

        let x = resp.data.chart.result[0].meta.chartPreviousClose;
        let t = resp.data.chart.result[0].timestamp;
        let h = resp.data.chart.result[0].indicators.quote[0].high;
        let l = resp.data.chart.result[0].indicators.quote[0].low;
        let o = resp.data.chart.result[0].indicators.quote[0].open;
        let c = resp.data.chart.result[0].indicators.quote[0].close;

        let closeGrph = c[c.length - 1];
        let pointChange = c[c.length - 1] - o[0];
        let percentChange = ((c[c.length - 1] - o[0]) / o[0]) * 100;

        let meta = {
          closeGrph: roundToTwo(closeGrph),
          pointChange: roundToTwo(pointChange),
          percentChange: roundToTwo(percentChange),
          symbol: resp.data.chart.result[0].meta.symbol,
        };
        let colorTrend = "#6FCF97";
        if (pointChange < 0) {
          colorTrend = "#EE3446";
        }

        setMetaData(meta);

        for (let i = 0; i < t.length; ++i) {
          // console.log(t[i],h[i],l[i],o[i],c[i]);
          data.push(roundToTwo(c[i]));
          xAxisData.push(new Date(t[i] * 1000).getTime());
        }

        let chart_Data = [
          {
            name: "Dow Jones",
            data: data,
          },
        ];
        let x_axis = {
          type: "date",
          categories: xAxisData,
        };
        console.log(xAxisData);
        let my_options = {
          chart: {
            type: "area",
            height: 350,
            zoom: {
              enabled: false,
            },
          },
          theme: {
            monochrome: {
              enabled: true,
              color: colorTrend,
              shadeTo: "light",
              shadeIntensity: 0.65,
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "straight",
          },
          xaxis: {
            type: "datetime",
          },
          title: {
            text: "",
            align: "left",
          },
          subtitle: {
            text: "",
            align: "left",
          },
          labels: xAxisData,

          yaxis: {
            opposite: true,
          },
          legend: {
            horizontalAlign: "left",
          },
        };

        setOptions(my_options);

        setResults(chart_Data);
        console.log(chart_Data);
        setDowChartPreviousClose(x);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchDowJone();
  }, []);
  return !loading && results ? (
    <div className="sidebarArea">
      <a
        href="https://www.nseindia.com/"
        style={{ textDecoration: "none" }}
        target="_blank"
      >
        <div className="indianBtn">Indian Markets</div>
      </a>
      <a
        href="https://www.nyse.com/index"
        style={{ textDecoration: "none" }}
        target="_blank"
      >
        <div className="indianBtn">US Markets</div>
      </a>
      <div className="dow_jones">
        ^DJI - Dow Jones <br />
        Industrial Average
      </div>
      {/* <div className="price">
                   <div className="bigban">
                  {metaData?.symbol}
                  </div>
                </div> */}
      <div className="closes_c">
        <span style={{ fontWeight: "450" }}>
          $ {metaData?.closeGrph}
          {"  "}
        </span>
        <span style={{ fontSize: "15px" }}>
          {metaData ? (metaData.pointChange >= 0 ? "+" : "") : ""}
          {metaData?.pointChange}
          {"  "}({metaData?.percentChange}%)
        </span>
      </div>
      <div className="candleChart">
        <ReactApexChart
          options={options}
          series={results}
          type="area"
          height={340}
        />
      </div>
    </div>
  ) : (
    ""
  );
}
