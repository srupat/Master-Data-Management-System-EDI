import { apiClient } from "./ApiClient"

export const createTemplateApi = 
    (templateJson) =>  apiClient.post(`/create/template`, templateJson)

export const getAllTemplateForExpressionCreation = () => apiClient.get('/templates')

export const submitExpression = 
    (templateName,AttributeName,expression) => apiClient.put(`/template/attachAttributeExpression/${templateName}/${AttributeName}/${expression}`) 