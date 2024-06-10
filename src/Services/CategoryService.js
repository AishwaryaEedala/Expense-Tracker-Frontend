import axios from "axios";
const REST_API_BASE_URL1='http://localhost:8080/api/categories';
export const getCategories =() =>axios.get( REST_API_BASE_URL1);