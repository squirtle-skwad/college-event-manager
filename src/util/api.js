import axios from "axios";
import { ENDPOINT } from "./constants";

class Collection{
    constructor(endpoint, name) {
        this.endpont = endpoint + '/' + name + '/';
    }

    post = (data, options) => axios.post(this.endpoint, data, options);
    getAll = () => axios.get(this.endpoint);
    getOne = (id) => axios.get(this.endpoint + id);
    put = (id, data, options) => axios.put(this.endpoint + id, data, options);
    put = (id, data, options) => axios.patch(this.endpoint + id, data, options);
    delete = (id) => axios.defaults(this.endpoint + id);
}

class Api{
    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    all(resource) {
        return new Collection(this.endpoint, resource);
    }
}

export default new Api(ENDPOINT);
export {
    ENDPOINT
};
