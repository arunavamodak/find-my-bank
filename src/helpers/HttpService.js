import axios from "axios";

export const getBanks = (currentCity) => new Promise( (resolve,reject) => {
    axios.get(`https://vast-shore-74260.herokuapp.com/banks?city=${currentCity}`).then(res=>{
        resolve(res);
    }).catch(err=>{
        reject(err);
    })
}); 