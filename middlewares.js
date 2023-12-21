const {houseSchemaValidation} = require('./ValidationSchemas');
const ExpressError = require('./utilities/expressError');

//schema Validation---------------------------------------------------
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

//to check user is loggedIn or Not (authorization)------------------------
module.exports.isLoggedIn = (req,res,next)=>{

    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
        req.flash('error','You must be signed in')
        return res.redirect('/login');
    }
    next();
}


module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

