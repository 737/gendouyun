import axios from 'axios';
import HomeInterface from '../../api/home.interface';

export default {
    getHomeStaticInfo: ({ commit, state }) => {

        return axios.post('http://gateway.m.fws.qa.nt.ctripcorp.com/restapi/soa2/12860/getNewHotSaleHomePageStaticInfo', {
            cityId: 2,
            checkInDate: '20181112',
            checkOutDate: '20181113'
        }).then((response) => {
            if (response && response.data) {
                const { topSliders = [], guessYouWantCity = [], activityInfos = [], activityRegions = [] } = response.data;

                commit('HOME_STATIC_INFO', {
                    topSliders,
                    guessYouWantCity,
                    activityInfos,
                    activityRegions,
                });
            }
        }).catch(err => {
            console.log(error);
        })
    }
}
