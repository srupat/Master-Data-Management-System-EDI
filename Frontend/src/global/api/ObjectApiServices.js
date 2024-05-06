import { apiClient } from "./ApiClient"

export const createObjectApi = 
    (objectJson) =>  apiClient.post(`/create/object`, objectJson)

export const getAllObjects = 
    () => apiClient.get(`/objects`)