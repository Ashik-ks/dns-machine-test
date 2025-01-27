exports.success_function = function success_function(api_data){
    let response = {
        status : true,
        statuscode : 200,
        message : api_data.message ? api_data.message : null,
        data :  api_data.data ? api_data.data : null
    }
    return response
}
exports.error_function = function error_function(api_data){
    let response = {
        status : false,
        statuscode : 400,
        message : api_data.message ? api_data.message : null,
        data :  api_data.data ? api_data.data : null
    }
    return response
}