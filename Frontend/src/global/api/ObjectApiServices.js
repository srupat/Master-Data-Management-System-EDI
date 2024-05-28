import { apiClient } from "./ApiClient"

export const createObjectApi = 
    (objectJson) =>  apiClient.post(`/create/object`, objectJson)

export const getAllObjects = 
    () => apiClient.get(`/objects`)

    export const getObjectsByTemplateName = (templateName) => {
        console.log(templateName);
        return apiClient.get(`/objects/${templateName}`)
            .then(response => {
                console.log(response.data);
                return response.data;   
            });
    };