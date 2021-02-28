import React from "react";
import { useHistory } from "react-router-dom";
import useInput from "../../customHook/useInput";

const SearchInput = () => {
  const [input, setInput] = useInput({
    summonerName: ""
  });
  const history = useHistory();
  const onSubmitHandle = (e) => {
    e.preventDefault();
    const nickname = input.summonerName.replace(/ /g, "+");
    history.push(`/summoner/${nickname}`);
  };
  return (
    <form className="form-container" onSubmit={onSubmitHandle}>
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
