import axios from "axios";
import { ENDPOINT } from "./constants";
import { useAuthToken } from "./hooks";

class Collection{
    constructor(endpoint, name) {
        this.endpont = endpoint + '/' + name + '/';
        this.opts = {};
    }

    post = (data) => axios.post(this.endpoint, data, this.options());
    getAll = () => axios.get(this.endpoint, this.options());
    getOne = (id) => axios.get(this.endpoint + id, this.options());
    put = (id, data) => axios.put(this.endpoint + id, data, this.options());
    put = (id, data) => axios.patch(this.endpoint + id, data, this.options());
    delete = (id) => axios.defaults(this.endpoint + id, this.options());

    options = () => ({
        ...this.opts,
        Authentication: useAuthToken(),
    });

    header = (k, v) => {
        this.opts = {
            headers: {
                [k]: v,
            }
        };
    };
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
