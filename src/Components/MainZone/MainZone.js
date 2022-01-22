import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import ReactApexChart from "react-apexcharts";
import "./MainZone.css";
import Spinner from "../../assests/mspin.gif";

export default function MainZone(props) {
  let options = {
    chart: {
      type: "candlestick",
      height: 350,
    },
    title: {
      text: "",
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };
  console.log(props.chartData);
  let colorTrend="#6FCF97";
  if(props.trend&&props.trend=="red"){
    colorTrend="#EE3446"
  }
  console.log(props.trend,colorTrend);
  return !props.loading && props.chartData ? (
    <div className="ourarea">
      <div className="bigban">{props.metaData?.symbol}</div>
      <div className="closes_mn">
        <span style={{ fontWeight: "450",color:'black' }}>
          $ {props.metaData?.closeGrph}
          {"  "}
        </span>
        <span style={{ fontSize: "15px",color:colorTrend}}>
          {props.metaData ? (props.metaData.pointChange >= 0 ? "+" : "") : ""}
          {props.metaData?.pointChange}
          {"  "}({props.metaData?.percentChange}%)
        </span>
      </div>
      <div className="apexChart">
        <ReactApexChart
          options={options}
          series={props.chartData}
          type="candlestick"
          height={500}
        />
      </div>
      <div className="btm_buttons">
        <button
          className="oneofthem"
          onClick={() => {
            props.searchStock(props.search, "1d", "15m");
          }}
        >
          15 min
        </button>
        <button
          className="oneofthem"
          onClick={() => {
            props.searchStock(props.search, "3d", "60m");
          }}
        >
          1 hr
        </button>
        <button
          className="oneofthem"
          onClick={() => {
            props.searchStock(props.search, "1mo", "1d");
          }}
        >
          1 day
        </button>
        <button
          className="oneofthem"
          onClick={() => {
            props.searchStock(props.search, "3mo", "1wk");
          }}
        >
          1 wk
        </button>
        <button
          className="oneofthem"
          onClick={() => {
            props.searchStock(props.search, "3y", "1mo");
          }}
        >
          1 mo
        </button>
        <button
          className="oneofthem"
          onClick={() => {
            props.searchStock(props.search, "max", "3mo");
          }}
        >
          All Time
        </button>
      </div>
    </div>
  ) : (
    <div className="loaderArea">
      <img style={{ width: "200px" }} src={Spinner}></img>
    </div>
  );
}
