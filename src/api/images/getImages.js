import {get,post} from "../http";

export const getImages = (params) => post('/images/getImages',params);
