import {get, post} from "../http";

export const getSearchHistory = (params) => get('/recommend/getSearchHistory', params);
export const getRecommendOptions = (params) => get('/recommend/getRecommendOptions', params);
export const changeRecommendOptions = (params) => post('/recommend/changeRecommendOptions',params);
export const getRecommendCoefficient = (params) => get('/recommend/getRecommendCoefficient',params);
export const getRecommendList = (params) => get('/recommend/getRecommendList',params);
