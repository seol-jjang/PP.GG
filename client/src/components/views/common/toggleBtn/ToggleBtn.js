import React, { useContext, useEffect } from "react";
import ThemeContext from "../../../../context/theme";
import classNames from "classnames";

const ToggleBtn = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (theme !== "light") {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  return (
    <button
      className={classNames("toggle-btn", theme)}
      onClick={() => toggleTheme()}
    >
      <div className="toggle-ball"></div>
    </button>
  );
};

export default ToggleBtn;
