import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchInput from "../MainPage/SearchInput";
import classNames from "classnames";

const Header = () => {
  const [scrollValue, setScrollValue] = useState(0);
  const [classState, setClassState] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (scrollValue < document.documentElement.scrollTop) {
        setClassState(true);
      } else {
        setClassState(false);
      }
      const nowScrollTop = document.documentElement.scrollTop;
      setScrollValue(nowScrollTop);
    });
  }, [scrollValue]);

  return (
    <header className={classNames("header", { "header-up": classState })}>
      <h2 className="logo sm">
        <Link to="/">PP.GG</Link>
      </h2>
      <SearchInput header={true} />
    </header>
  );
};

export default Header;
