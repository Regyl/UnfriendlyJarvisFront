import * as axios from "axios";

const hostname = "localhost";
const BASE_URL = `http://${hostname}:8090/jarvis`;
const AUTH_URL = `http://${hostname}:8760/auth`;
const DIC_URL = `http://${hostname}:8070/jarvis`;

const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "JSESSIONID": "28cb795c-b3e0-4a59-8fa8-4d58c785cd0a"
    },
});

const dictionaries = axios.create({
    baseURL: DIC_URL,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "JSESSIONID": "28cb795c-b3e0-4a59-8fa8-4d58c785cd0a"
    },
});

const auth = axios.create({
    baseURL: AUTH_URL,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
        "JSESSIONID": "28cb795c-b3e0-4a59-8fa8-4d58c785cd0a"
    },
});


export const API = {
    signUp(user) {
        return auth.post('/basic/sign-up', user);
    },
    signInBasic(login, password) {
        return auth.get('/basic/sign-in', {params: {username: login, password: password}});
    },

    signUpOauth(oAuthData) {
        return auth.post('/oauth/sign-up', oAuthData);
    },
    signInOauth(code, state, oAuthProviderType) {
        return auth.get('/oauth/sign-in', {params: {code: code, state: state, oAuthProviderType: oAuthProviderType}})
    },

    logout() {
        return auth.post('/logout', {withCredentials: true});
    },

    CORE: {
        getRecommendations() {
            return instance.get('/recommendations/list')
        },
        getTourPreview(id) {
            return instance.get('/tours/', {params: {id: id}})
        },
        getTourPaths(dto) {
            return instance.post('/paths/', dto)
        },
        getHotels(dto) {
            return instance.get('/hotels/', {params: dto})
        },
        saveTour(dto) {
            return instance.post('/tours/calculate', dto)
        },
        getAdditServiceList() {
            return instance.get('/additional-service/all')
        },
        getCompanies() {
            return instance.get('/companies/all')
        },
        saveAdditService(dto) {
            return instance.post('/additional-service/save', dto)
        }
    },

    DICTIONARIES: {
        getCatalogRecords(catalog) {
            return dictionaries.get('/list', {params: {catalog: catalog}})
        }
    },

    AUTH: {
        getUserData(login) {
            return auth.get('/users/' + login)
        },
        updateUserData(user) {
            return auth.post('/users/', user)
        }
    }
}
