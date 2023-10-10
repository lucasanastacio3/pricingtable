import { AxiosInstance } from "axios";
import axios from "axios";

class Api {
    private _api: AxiosInstance;

    constructor() {
        this._api = axios.create({
            baseURL: 'http://localhost:3000/api/',
        });
    }

    async getPlans() {
        const { data } = await this._api.get('/plans');
        return data;
    }
}

export default new Api();