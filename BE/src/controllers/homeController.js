import db from "../models/index";

let getHomePage = async (req, res) => {
    try{
        return res.render("homePage.ejs", {
        });
    } catch(e) {
        console.log(e)
    }
}

module.exports = {
    getHomePage: getHomePage,
}