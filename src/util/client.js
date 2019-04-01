import axios from "axios";
import api, { ENDPOINT } from "./api";

const eventsCollection = api.all('events');
const reportsCollection = api.all('reports');
const imagesCollection = api.all('images');
const datesCollection = api.all('dates');

reportsCollection.header("Content-Type", "multipart/form-data");
imagesCollection.header("Content-Type", "multipart/form-data");

export default {
    login: (form) =>
        axios.post(`${ENDPOINT}/auth/token/login`, form),
    signup: (form) =>
        axios.post(`${ENDPOINT}/signup/`, form),


    sendEmailToFaculty: (reportId) => 
        axios.get(`${ENDPOINT}/send-pdf/${reportId}`),
    getCalendarList: () =>
        axios.get(`${ENDPOINT}/event-calendar/`),
    getMonthEvents: (year, month) =>
        axios.get(`${ENDPOINT}/event-calendar/${year}/${month}/`),
    getDayEvents: (year, month, day) =>
        axios.get(`${ENDPOINT}/event-calendar/${year}-${month}-${day}`),
    postMultipleDates: (ls) =>
        axios.post(`${ENDPOINT}/dates-multiple/`, ls),
    postMultipleDepts: (ls) =>
        axios.post(`${ENDPOINT}/depts-multiple/`, ls),

    api: api,
    events: eventsCollection,
    reports: reportsCollection,
    images: imagesCollection,
    dates: datesCollection,
};
