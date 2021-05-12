const pizzaMenu = require("../../models/menu.js");

function homeController() {
    return {
        index(req, res) {
            pizzaMenu.find().then(function (pizza) {
                return res.render('home', { pizzas: pizza });
            }).catch((e) => {
                console.log(e);
            })


        }
    }

}

module.exports = homeController;