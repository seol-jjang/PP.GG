import { useCallback, useState } from "react";

const useInput = (initialInput) => {
  const [input, setInput] = useState(initialInput);
  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setInput({
        ...input,
        [name]: value
      });
    },
    [input]
  );
  return [input, onChange];
};

export default useInput;
