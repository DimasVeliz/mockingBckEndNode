module.exports={
    ensureAuth: function(req,res,next){
        if (req.isAuthenticated()) {
            return next()
        }
        else{
            res.status(401).send("Unauthorized")
        }
    },
    ensureGuest:function(req,res,next){
        if (req.isAuthenticated()) {
            res.redirect('/dashboard')
            
        }
        else{
            return next()
        }
    }
}