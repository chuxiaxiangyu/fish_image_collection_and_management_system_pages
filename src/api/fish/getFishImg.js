import {get,post} from "../http";

export const getFishImg = params => get('/fish/getfishimg',params);
