const User=require('../../models/user');
const bcrypt=require('bcrypt');
const passport=require('passport');

function authController(){
    return {
        login:(req,res)=>{
            res.render('auth/login');
        },
        PostLogin:(req,res,next)=>{
           //passport.authenticate take first argument name of strategy and second is done function ..Here we defined passport.authenticate function  
            passport.authenticate('local',(err,user,info)=>{
                if(err){
                    req.flash('error',info.message);
                  return next(err)
                }
                if(!user){
                    req.flash('error',info.message);
                    return res.redirect('/login')
                }
                req.logIn(user,(err)=>{
                    if(err){
                        req.flash('error',info.message);
                     return   next(err)                 
                       }''
                      return res.redirect('/');
                     
                })
            })(req,res,next) //passport.authenticate return a function which is we calling here and passing three arguments
        },
        register:(req,res)=>{
            res.render('auth/register');
        },
        postRegister: async (req,res)=>{ 
            const cpassword=req.body.cpassword;
            const {username,email,password}= req.body;
            
            if(!username || !email || !password){
                //  flash is npm library to display error(flash message is for only for one request) 
                req.flash('error',"All field must be filled");
                req.flash("name",username)
                req.flash("email",email)
                return res.redirect('/register');
            }
            if(!(password===cpassword))
            {
                req.flash('error',"Password and confirm password does not match");
                req.flash("name",username);
                req.flash("email",email);
                return res.redirect('/register');
            }
            User.findOne({email:email}, (error,result)=>{
                if(result)
                {
                    req.flash('error',"Email already exits");
                    req.flash("name",username);
                    req.flash("email",email);
                    return res.redirect('/register');
                }
            })
            const hashPassword=await bcrypt.hash(password,10)
            const user=new User({
                name:username,
                email:email,
                password:hashPassword
            }) 
            user.save().then(()=>{
                // Login logic                
                return res.redirect('/')
            }).catch((error)=>{
                req.flash('error',"Something went Wrong");
                return res.redirect('/register');
            })
            },
            logout:(req,res)=>{
              req.logout()  
             return res.redirect('/login')
            }       
           
    }
}
module.exports=authController;