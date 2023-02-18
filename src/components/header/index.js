import React, { useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import youtubeIcon from "assets/icons8-youtube-48.png";
import "./header.scss";

function Header() {
  const params = useParams();
  const { keyword } = params;
  const [text, setText] = useState("");
  const navigate = useNavigate();

  // * Why need to count on onSubmit event? Check through the URL below.
  // * https://github.com/remix-run/react-router/issues/1933#issuecomment-140158983
  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/videos/${text}`);
  };

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  useEffect(() => {
    // * if undefined is set to the value of input component, the input component would become uncontrolled input and the error would occur.
    setText(keyword ?? "");
  }, [keyword]);

  return (
    <header className="header">
      <Link to={"/"}>
        <h1 className="header__logo">
          <img src={youtubeIcon} alt="youtube_logo" />
          Youtube
        </h1>
      </Link>
      <form className="header__form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          className="header__input"
          value={text}
          onChange={handleInputChange}
        />
        <button className="header__button">
          <RiSearchLine size={24} color={"white"} />
        </button>
      </form>
    </header>
  );
}

export default Header;
