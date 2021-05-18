const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');
function init(passport) {
  passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    const user = await User.findOne({ email: email })
    if (!user) {
      return done(null, false, { message: "Email is not found" })
    }
    bcrypt.compare(password, user.password).then((match) => {
      if (match) {
        return done(null, user, { message: "Logged is successfully" }) //here we calling done function (it info functi in on)
      }
      return done(null, false, { message: "Invalid credentials" })
    }).catch((error)=>{
      console.log(error)
        return done(null,false,{message: "Something Went wrong"})
    })

  }))
  // The user id (we provide as the second argument of the done function) is saved in the session and is later used to retrieve the whole object via the deserializeUser function
  passport.serializeUser((user,done)=>{
    done(null,user._id)
  })
  // The first argument of deserializeUser corresponds to the key of the user object that was given to the done function (see serializeUser). So, the whole object is retrieved with the help of that key. <-----> The fetched object is attached to the request object as req.user. deserializeUser is called when we send a request with an attached session Cookie containing a serialized user id.
  passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
      done(err,user );
    })
  })
}
module.exports = init;