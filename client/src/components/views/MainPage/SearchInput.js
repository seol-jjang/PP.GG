import React from "react";
import { useHistory } from "react-router-dom";
import useInput from "../../../customHook/useInput";
import classNames from "classnames";

const SearchInput = ({ header }) => {
  const [input, setInput] = useInput({
    summonerName: ""
  });
  const history = useHistory();

  const onSubmitHandle = (e) => {
    const nickname = input.summonerName.replace(/ /g, "+");
    history.push(`/summoner/${nickname}`);
  };
  return (
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
      />
      <button type="submit">.GG</button>
    </form>
  );
};

export default SearchInput;
