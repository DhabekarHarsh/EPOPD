import axios from "axios";

export const saveHistory = async (userId, objType, filename, parkinsonProb, healthProb) =>
  await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/savehistory`, {userId, objType, filename, parkinsonProb, healthProb});

export const getHforUser = async (uId) =>
  await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/gethistoryforuser`, {uId});
