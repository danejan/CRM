
import axios from "axios";
const apiPath="http://192.168.2.18:5001"
export default {

  getOfferList() {
return axios.get(apiPath+"/api/offer/list/");

  },

  getOffer(Id) {
    return axios.get(apiPath + "/api/offer/Infobyid/"+Id);
  },

  addOffer(offer){
    return axios.post(apiPath + "/api/offer/create",offer);
  },
  update (offer){
    return axios.put(apiPath +"/api/offer/update",offer);

  },
  deleteOffer(Id) {
    return axios.delete(apiPath +"/api/offer/delete/"+ Id)
  }
};
