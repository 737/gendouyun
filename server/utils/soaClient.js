const AppVersionForSoa = 'App711';

const ServiceCode_HotelProductService = '10014';
const ServiceCode_HotelRecommendQuery = '14137';
const ServiceCode_HtlCrossRecommendV2 = '14673';

function soaClient(ctx) {
    return {
    /**
     *
     * @param {object} params
     */
        async getRecommendArticleDetailInfo(articleID, uid, tagID, channelID) {
            if (!(tagID > 0 && tagID != 1 && tagID != 100 && tagID != 999999)) { tagID = 0; }

            return await ctx.soaAgent(ServiceCode_HotelRecommendQuery, 'getRecommendArticleDetailInfo', {
                articleId: articleID,
                uid,
                channel: channelID,
                isContainSummary: true,
                version: AppVersionForSoa,
                labelId: tagID,
            });
        },

        /**
     *
     * @param {*} uid
     * @param {*} setID
     */
        async getAirAndHotelDetailInfo(uid, setID) {
            return await ctx.soaAgent(ServiceCode_HtlCrossRecommendV2, 'setDetailPage', {
                uid,
                setID,
            });
        },

        /**
     *
     * @param {Array} hotelIDs
     * @param {int} source 1=发现专题调用 2=卖点页点评调用 3=酒店轻量级列表调用 4=卖点页SellingPart 不传=卖点页调用
     */
        async getHotelStaticInfo(hotelIDs, source) {
            return await ctx.soaAgent(ServiceCode_HotelProductService, 'getHotelStaticInfo', {
                hotelIDs,
                source,
                checkIn: null,
                userLevel: null,
            });
        },
    };
}

module.exports = soaClient;
