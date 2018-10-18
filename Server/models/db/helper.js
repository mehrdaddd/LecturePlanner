module.exports = app => {
    return {
        getId: function(model){
            return {
                '_id': model.id
            }
        },
        //Return if success
        success: function(module){
            if(module !== null || module !== undefined){
                return {
                    status: true,
                    code: 0,
                    data: module
                }
            }
            else{
                return {
                    status:true,
                    code: -1
                }
            }
        },
        //return if failed
        failed: function(module){
            return {
                status: false,
                code: -2,
                data: module
            }
        }
    }
}