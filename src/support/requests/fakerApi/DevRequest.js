import http from 'k6/http';
import ENV from '../../env.js';


export default new class DevRequest {
    get(endpoint){
        return http.get(`${ENV.devUrls.baseUrl}/${endpoint}`);
    }


    post(endpoint, payload, params = ''){
        return http.post(`${ENV.devUrls.baseUrl}/${endpoint}`, payload, params);
    }


    put(endpoint, payload, params = ''){
        return http.put(`${ENV.devUrls.baseUrl}/${endpoint}`, payload, params);
    }


    del(endpoint, payload = '', params = ''){
        return http.del(`${ENV.devUrls.baseUrl}/${endpoint}`, payload, params);
    }
}