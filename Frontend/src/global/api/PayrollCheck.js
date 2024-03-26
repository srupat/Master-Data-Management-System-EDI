import { apiClient } from "./ApiClient"

export const payrollCheck = 
    (templateName,expressionName) =>  apiClient.get(`/evaluate/${templateName}/${expressionName}`)