const {houseSchemaValidation} = require('./ValidationSchemas');
const ExpressError = require('./utilities/expressError');

module.exports.validateHouse = (req,res,next)=>{
    
    const { error } = houseSchemaValidation.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else{
        next()
    }
}

