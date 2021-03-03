export const asyncUtil = (api, m) => {
  return new Promise((res) => setTimeout(() => res(api, m)));
};
