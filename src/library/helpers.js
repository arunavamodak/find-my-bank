import { CACHE_CLEARING_INTERVAL } from "./Constants";

export const willCacheClear = (timestamp) =>{
    const current = new Date().getTime();
    const diff = (((current - timestamp)/1000)/60)/60;
    return (diff >= CACHE_CLEARING_INTERVAL);
}