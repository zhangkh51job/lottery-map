import axios from "./myAxios";
import store from '@/store'
export default (data) => {
    const method = data.method
    const url = data.url
    const callback = data.callback

    data.params = data.params || {}
    // data.params.httpRequestIndex = data.params.httpRequestIndex == undefined ? 0 : data.params.httpRequestIndex;
    // data.params.httpRequestCount = data.params.httpRequestCount || 0;
    store.commit('setLoading', true)
    return  axios[method?method:'post'](url, data.params).then(res => {
        callback && callback(res.data)
        store.commit('setLoading', false)
        return Promise.resolve(res.data)
    }).catch(() => {
        store.commit('setLoading', false)
    });
}