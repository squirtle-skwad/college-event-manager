import axios from "axios";
import { ENDPOINT } from "./constants";
import { useAuthToken } from "./hooks";

class Collection{
    constructor(endpoint, name) {
        this.endpoint = endpoint + '/' + name + '/';
        this.headers = {};
    }

    post = (data) => axios.post(this.endpoint, data, this.options());
    getAll = () => axios.get(this.endpoint, this.options());
    getOne = (id) => axios.get(this.endpoint + id, this.options());
    put = (id, data) => axios.put(this.endpoint + id, data, this.options());
    patch = (id, data) => axios.patch(this.endpoint + id, data, this.options());
    delete = (id) => axios.delete(this.endpoint + id, this.options());

    options = () => ({
        headers: {
            ...this.headers,
            Authorization: `Token ${useAuthToken()}`,
        }
    });

    header = (k, v) => {
        this.headers = {
            ...this.headers,
            [k]: v,
        };
    };
}

class Api{
    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    all = (resource) => {
        return new Collection(this.endpoint, resource);
    }
}

export default new Api(ENDPOINT);
export {
    ENDPOINT
};
