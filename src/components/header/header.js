import React from "react";
import youtubeIcon from "assets/icons8-youtube-48.png";
import { RiSearchLine } from "react-icons/ri";
import "./header.scss";

function Header(props) {
  return (
    <header className="header">
      <h1 className="header__logo">
        <img src={youtubeIcon} alt="youtube_logo" />
        Youtube
      </h1>
      <form className="header__form">
        <input type="text" placeholder="Search..." className="header__input" />
        <button className="header__button">
          <RiSearchLine size={24} color={"white"} />
        </button>
      </form>
      {/* <div className="header__invisible-part">Should be a Invisible Part</div> */}
    </header>
  );
}

export default Header;
