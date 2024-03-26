import { apiClient } from "./ApiClient"

export const payrollCheck = 
    (templateName) =>  apiClient.post(`/evaluate/${templateName}/evaluate`)