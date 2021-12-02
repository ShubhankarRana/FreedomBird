import React from "react";
import "./Header.css";
import SearchIcon from "../../assests/search_icon.svg";
import LogoFB from "../../assests/logo_FB.svg";

export default function Header() {
  return (
    <div className="header_up">
      <div className="logo_area">
        <img src={LogoFB}></img>
      </div>
      <div className="mid_area">
        <div className="search_area">
          <button>
            <img src={SearchIcon}></img>
          </button>
          <input
            id="stock_search"
            placeholder="Type a Company Ticker/Script to Search"
            type="text"
          ></input>
        </div>
        <div className="lower_search_area">
          <span style={{ marginRight: "5px", fontSize: "19px" }}>
            What's trending :
          </span>
          <span className="four_buttons">
            <button>AAPL</button>
            <button>TSLA</button>
            <button>MSFT</button>
            <button>GOOG</button>
          </span>
        </div>
      </div>
      <div></div>
    </div>
  );
}
