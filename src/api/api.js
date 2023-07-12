
import moment from "moment";
import "moment/locale/es";
import axios from "axios";

export const API = "https://apifruver.circuitosinteligentes.com";


export const CURRENT_DATE = moment().format("DD-MM-YY");

export const api = axios.create({
  baseURL: API,
});


