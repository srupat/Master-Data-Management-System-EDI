    import { apiClient } from "./ApiClient"

    export const createTemplateApi = 
        (templateJson) =>  apiClient.post(`/create/template`, templateJson)

    export const getAllTemplateForExpressionCreation = () => apiClient.get('/templates')

    export const submitExpressionForAttributeAttachment = 
        (templateName,AttributeName,expression) => apiClient.put(`/template/attachAttributeExpression/${templateName}/${AttributeName}/${expression}`) 

        export const submitExpressionForTemplateAttachment = 
        (templateName, expJson) => apiClient.put(`/template/attachTemplateExpression/${templateName}`, expJson)