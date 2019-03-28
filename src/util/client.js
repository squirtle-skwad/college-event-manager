import axios from "axios";
import { ENDPOINT } from "./constants";

export default {
    login: (form) =>
        axios.post(`${ENDPOINT}/auth/token/login`, form).then((r) => r.data),
    signup: (form) =>
        axios.post(`${ENDPOINT}/signup/`, form).then((r) => r.data),

    // Event

    addEvent: (form) => axios.post(`${ENDPOINT}/events/`, form).then((r) => r.data),
    getAllEvents: () => axios.get(`${ENDPOINT}/events/`).then((r) => r.data),

    // Report

    addReport: (form) =>
        axios
            .post(`${ENDPOINT}/reports/`, form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((r) => r.data),
    deleteReport: (id) =>
        axios.delete(`${ENDPOINT}/report/${id}`).then((r) => r.data),

    addImage: (form) =>
        axios
            .post(`${ENDPOINT}/images/`, form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((r) => r.data),

    getMonthEvents: (year, month) =>
        axios.get(`${ENDPOINT}/event-calendar/${year}/${month}/`).then((r) => r.data),
    getDayEvents: (year, month, day) =>
        axios
            .get(`${ENDPOINT}/event-calendar/${year}-${month}-${day}`)
            .then((r) => r.data),
};
