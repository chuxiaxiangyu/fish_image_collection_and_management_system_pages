import {get, post} from "../http";

export const login = params => post('/user/login',params);
export const register = params => post('/user/register',params);
export const find = (params={}) => post('/user/find',params);
