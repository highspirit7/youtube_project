import React from "react";
import { RiSearchLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

import { useSearchKeyword } from "contexts/SearchKeywordContext";
import youtubeIcon from "assets/icons8-youtube-48.png";
import "./header.scss";

function Header() {
  const { keyword, setKeyword } = useSearchKeyword();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(`/videos/${keyword}`);
  };

  const handleInputChange = (event) => {
    setKeyword(event.target.value);
  };

  return (
    <header className="header">
      <Link to={"/"}>
        <h1 className="header__logo">
          <img src={youtubeIcon} alt="youtube_logo" />
          Youtube
        </h1>
      </Link>
      <form className="header__form">
        <input
          type="text"
          placeholder="Search..."
          className="header__input"
          value={keyword}
          onChange={handleInputChange}
        />
        <button className="header__button" onClick={handleButtonClick}>
          <RiSearchLine size={24} color={"white"} />
        </button>
      </form>
    </header>
  );
}

export default Header;
