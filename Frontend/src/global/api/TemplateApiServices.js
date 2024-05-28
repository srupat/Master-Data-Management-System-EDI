import { apiClient } from "./ApiClient"

export const createTemplateApi = 
    (templateJson) =>  apiClient.post(`/create/template`, templateJson)

export const getAllTemplates = () => apiClient.get('/templates')

export const submitExpressionForAttributeAttachment = 
    (templateName,AttributeName,expression) => apiClient.put(`/template/attachAttributeExpression/${templateName}/${AttributeName}/${expression}`) 

export const submitExpressionForTemplateAttachment = 
    (templateName, expJson) => apiClient.put(`/template/attachTemplateExpression/${templateName}`, expJson)


export const updateTemplateNameApi = (oldName, newTemplateName) => 
    apiClient.put(`/template/${oldName}/${newTemplateName}`);

export const updateAttributeForTemplateApi = (tempName, oldAttributeName, newAttributeName, newAttributeType) => 
    apiClient.put(`/attributes/${tempName}/${oldAttributeName}/${newAttributeName}/${newAttributeType}`);

export const deleteTemplateApi = (templateName) => 
    apiClient.delete(`/delete/template/${templateName}`);