const {constants} = require("../constants")
const errorhandler = (err, req, res , next)=>
{
const statusCode = res.statusCode? res.statusCode:500;
switch (statusCode) {
    case constants.NOT_FOUND:
        res.json({title:"Not Found", message: err.message, stackTrace: err.stack})
        break;
    case constants.VALIDATION_ERROR:
        res.json({title:"Validation error", message: err.message, stackTrace: err.stack})
        break;
    case constants.UNAUTHORIZED:
        res.json({title:"UNAUTHORIZED error", message: err.message, stackTrace: err.stack})
        break;
    case constants.FORBIDDEN:
        res.json({title:"FORBIDDEN error", message: err.message, stackTrace: err.stack})
        break;
    case constants.SERVER_ERROR:
        res.json({title:"SERVER error", message: err.message, stackTrace: err.stack})
        break;
    default:
       console.log("No error") 
        break;
}

}
 module.exports= errorhandler