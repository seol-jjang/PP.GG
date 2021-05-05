import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import useInput from "../../../customHook/useInput";
import classNames from "classnames";
import SearchTab from "../SearchTab/SearchTab";

const SearchInput = ({ header }) => {
  const [input, setInput] = useInput({
    summonerName: ""
  });
  const [focus, setFocus] = useState(false);
  const history = useHistory();

  const onSubmitHandle = (e) => {
    const nickname = input.summonerName.replace(/ /g, "+");
    history.push(`/summoner/${nickname}`);
  };

  return (
    <>
      <form
        className={classNames("form-container", { "form-sm": header })}
        onSubmit={onSubmitHandle}
      >
        <input
          type="text"
          className="search-input"
          placeholder="소환사명"
          name="summonerName"
          onChange={setInput}
          value={input.summonerName}
          onClick={() => setFocus(true)}
          autoComplete="off"
        />
        <button type="submit">.GG</button>
        {focus && <SearchTab />}
      </form>
      {focus && <div className="bg-tab" onClick={() => setFocus(false)}></div>}
    </>
  );
};

export default SearchInput;
