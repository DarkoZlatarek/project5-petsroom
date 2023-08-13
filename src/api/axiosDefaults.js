import axios from "axios";

axios.defaults.baseURL = "https://petsroom-drf-api-11e537707187.herokuapp.com/"
axios.defaults.headers.post["Content-Type"] = "multipart/form-data"
axios.defaults.withCredentials = true
