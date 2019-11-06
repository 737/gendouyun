import axios from 'axios';

export default class HomeInterface {
    getHomeStaticInfo(params = {}) {
        const { cityId = 2, checkInDate = new Date(), checkOutDate = new Date().addDay(1) } = params;
        return axios.post('http://gateway.m.fws.qa.nt.ctripcorp.com/restapi/soa2/12860/getNewHotSaleHomePageStaticInfo', {
            cityId,
            checkInDate,
            checkOutDate
        })
    }
}
