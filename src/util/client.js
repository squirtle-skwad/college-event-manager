import axios from "axios";
import { ENDPOINT } from "./constants";

export default {

    login: (form) => axios.post(`${ENDPOINT}/auth/token/login`, form).then(r => r.data),
    signup: (form) => axios.post(`${ENDPOINT}/signup/`, form).then(r => r.data),

    addEvent: (form) => axios.post(`${ENDPOINT}/event/`, form).then(r => r.data),
    addReport: (form) => axios.post(`${ENDPOINT}/report/`, form, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }).then(r => r.data),
    addImage: (form) => axios.post(`${ENDPOINT}/image/`, form, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }).then(r => r.data),

    getAllEvents: () => axios.get(ENDPOINT + "/event/").then(r => r.data),
    getMonthEvents: (month) => undefined,
    getDayEvents: (year, month, day) => axios.get(`${ENDPOINT}/event/${year}-${month}-${day}`).then(r => r.data),

    deleteReport: (id) => axios.delete(`${ENDPOINT}/report/${id}`).then(r => r.data),

};
