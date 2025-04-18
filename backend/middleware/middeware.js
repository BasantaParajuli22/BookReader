const logger =( req,res,next) =>{
    console.log(`${req.method} method is requesting ${req.url} `);
    next();
}

const errorHandler =(err, req,res,next) =>{
    if(err.status){
        return res.status(err.status).json( { errMessage : err.message } )
    }
    res.status(err.status).json( { errMessage : err.message } )
}

const pageNotFound =( req,res,next) =>{
    res.status(404).json( { errMessage : 'Page not found ' } );
}


export { logger, errorHandler, pageNotFound  };