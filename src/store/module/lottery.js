import request from '@/net/request'

export default {
    namespaced: true,
    state: {
    },
    mutations:{
    },
    actions:{
        getMapData(ctx, params){
            const data = {
                url: 'api/queryLotteryAll',
                params: {
                    ...params
                },
            }
            return request(data)
        },

        query(ctx, params){
            const data = {
                url: 'api/query',
                params: {
                    ...params
                },
            }
            return request(data)
        },

        getLottery(ctx, params){
            const data = {
                url: 'api/getLottery',
                params: {
                    ...params
                },
            }
            return request(data)
        },

        getPlatFormLottery(ctx, params){
            const data = {
                url: 'api/getPlatFormLottery',
                params: {
                    ...params
                },
            }
            return request(data)
        },
    }
}