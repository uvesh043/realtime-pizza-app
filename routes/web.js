const homeController=require('../app/http/controllers/homeController')
const authController=require('../app/http/controllers/authController')
const cartControllers=require('../app/http/controllers/customers/cartControllers')
const guest=require('../app/http/middelware/guest')

function initRotues(app){
    app.get('/',homeController().index)
    //guest is middelware that ensure is if user is authenticate and after that user is not go to to login and registe page just typing in url such as 'http://localhost:3300/register'
    app.get('/login',guest,authController().login)
    app.post('/login',authController().PostLogin)
    app.get('/register',guest,authController().register)
    app.post('/register',authController().postRegister)
    app.post('/logout',authController().logout)

    app.get('/cart',cartControllers().index)
    app.post('/update-cart',cartControllers().update)
}

module.exports=initRotues;