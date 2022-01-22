import React,{useState} from "react";
import "./Header.css";
import SearchIcon from "../../assests/search_icon.svg";
import LogoFB from "../../assests/logo_FB.svg";

export default function Header(props) {
  

  return (
    <div className="header_up">
      <div className="logo_area">
        <img src={LogoFB}></img>
      </div>
      <div className="mid_area">
        <form className="search_area" onSubmit={(e)=>{
           e.preventDefault();
           props.searchStock(props.search,'1y','1d');
          }}>
          <button type="submit">
            <img src={SearchIcon}></img>
          </button>
          <input
            id="stock_search"
            placeholder="Type a Company Ticker / Script to Search"
            type="text"
            value={props.search}
            onChange={(e)=>{
              props.setSearch(e.target.value);
            }}
          ></input>
        </form>
        <div className="lower_search_area">
          <span style={{ marginRight: "5px", fontSize: "19px" }}>
            What's trending :
          </span>
          <span className="four_buttons">
            <button onClick={()=>{props.setSearch('AAPL'); props.searchStock('AAPL','1y','1d');}}>APPLE</button>
            <button onClick={()=>{ props.setSearch('TSLA'); props.searchStock('TSLA','1y','1d');}}>TESLA</button>
            <button onClick={()=>{ props.setSearch('MSFT');props.searchStock('MSFT','1y','1d');}}>MICROSOFT</button>
            <button onClick={()=>{ props.setSearch('GOOGL');props.searchStock('GOOGL','1y','1d');}}>GOOGLE</button>
            <button onClick={()=>{ props.setSearch('FB');props.searchStock('FB','1y','1d');}}>META</button>
            <button onClick={()=>{ props.setSearch('NFLX');props.searchStock('NFLX','1y','1d');}}>NETFLIX</button>

          </span>
        </div>
      </div>
      <div></div>
    </div>
  );
}
