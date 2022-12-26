const getDetails = (token) => {
  //console.log(JSON.parse(window.atob(token.split(".")[1])));
  return JSON.parse(window.atob(token.split(".")[1]));
};

export const isAdmin = (token) => {
  //console.log(token, getDetails(token).role);
  return getDetails(token).role === process.env.REACT_APP_ADMIN;
};

export const isPlayer = (token) => {
  //console.log(token, getDetails(token).role, process.env.REACT_APP_PLAYER);
  return getDetails(token).role === process.env.REACT_APP_PLAYER;
};

export const getUser = (token) => {
  return getDetails(token).sub;
};
