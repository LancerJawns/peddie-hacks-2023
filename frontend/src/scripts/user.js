import {hasItem, getItem, setItem} from './storage';
import axios from 'axios';

export const getUserData = async () => {
  return await axios.get('/user/me');
};

export const getCurrentWeek = async () => {
  return (await axios.get('/currentWeek')).data.weekId;
};

export const changePlantTime = async time => {
  return await axios.post('/user/changePlantTime', {time: time.getTime()});
};

export const getCurrentPlant = async () => {
  return (await axios.get('/user/plant/current')).data.plant;
};

export const uploadTrashImage = async imageFile => {
  const data = new FormData();

  data.append('trash', imageFile);

  return await axios.post('/user/plant/uploadTrashImage', data, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
};

export const getWeeklyPlants = async () => {
  const req = await axios.get('/user/plant/weeklyPlants');
  console.log(req.data);
  return req.data.plants;
};
