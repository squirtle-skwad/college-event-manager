import axios from "axios";
import api, { ENDPOINT } from "./api";

const eventsCollection = api.all('events');
const reportsCollection = api.all('reports');
const imagesCollection = api.all('images');

reportsCollection.header("Content-Type", "multipart/form-data");
imagesCollection.header("Content-Type", "multipart/form-data");

export default {
    login: (form) =>
        axios.post(`${ENDPOINT}/auth/token/login`, form).then((r) => r.data),
    signup: (form) =>
        axios.post(`${ENDPOINT}/signup/`, form).then((r) => r.data),
    getMonthEvents: (year, month) =>
        axios.get(`${ENDPOINT}/event-calendar/${year}/${month}/`).then((r) => r.data),
    getDayEvents: (year, month, day) =>
        axios.get(`${ENDPOINT}/event-calendar/${year}-${month}-${day}`).then((r) => r.data),

    api: api,
    events: eventsCollection,
    reports: reportsCollection,
    images: imagesCollection,
};
