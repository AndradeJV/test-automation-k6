import {
    Trend,
    Rate,
    Counter
} from "k6/metrics";
import {
    check,
    fail,
    sleep
} from "k6";
import http from 'k6/http';

import DevRequest from '../../support/requests/fakerApi/DevRequest.js';
import payloadExample from '../../fixtures/post.js'


export const options = {
    stages: [{
            duration: '20s',
            target: 10
        },
        {
            duration: '11s',
            target: 60
        },
        {
            duration: '13s',
            target: 5
        },
        {
            duration: '2s',
            target: 15
        },
    ],

    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(95)<300'], // 95% of requests should be below 300ms
    },

    ext: {
        loadimpact: {
            projectID: 3609106,
            // Test runs with the same name groups test runs together
            name: "Project test"
        }
    }
}


export default () => {
    const url = 'https://fakerestapi.azurewebsites.net/api/v1/Activities';
    const payload = JSON.stringify({
        id: 1,
        title: "Activity 1",
        dueDate: "2022-09-30T18:12:23.4832617+00:00",
        completed: false
    })

    const params = {
        headers: {
            'Content-Type': 'application/json; charset=utf-8; v=1.0',
        },
    };

    const getResponse = http.get(url + '/1');
    const getPayload = getResponse.body;

    const sendPayload = http.post(url, getPayload, params);

    console.log("REQUISIÇÃO GET: " + getResponse);
    console.log("PAYLOAD AQUI: " + getPayload);
    console.log("STATUS AQUI: " + sendPayload.status);

    check(sendPayload, {
        "Status deve ser igual a 200": r => r.status === 200
    });
}