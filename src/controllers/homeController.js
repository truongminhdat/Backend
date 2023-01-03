
import db from '../models/index'
import CRUDService from '../services/CRUDService'

let getHomePage = async (req,res)=>{
    try {
        let data = await db.User.findAll();      
        return res.render("home.ejs",{
                data:JSON.stringify(data)
        }
        );

    
    } catch (e) {
        console.log(e)
    }
   
}
let getCRUD = async (req,res)=>{
    return res.render("crud.ejs")
}
let postCRUD = async(req,res)=>{
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send('post crud from server');
}
let displayGETCRUD = async(req,res) => {
    let data = await CRUDService.getAllUser();
    return res.render("displayCRUD.ejs",{
        dataAll: data
    });
}
let getEditCrud = async(req,res) => {
   let userId = req.query.id;
    if(userId){
    let userData = await CRUDService.getUserInfoById(userId);
       return res.render('editCRUD.ejs',{
        userData: userData
       })
   }
   else{
    return res.send("Truong Minh Dat")
   }

}
let putCRUD =  async (req,res) =>{
    let data =req.body;
    let allUsers = await CRUDService.updateUserData(data);
    return res.render("displayCRUD.ejs",{
        dataAll: allUsers
    });
}
let deleteCRUD = async(req,res) =>{
    let id = req.query.id;
    if(id){
        await CRUDService.deleteUserById(id);
        return res.send('Deleted the user success!');
    }
    else{
        return res.send('User not found !')
    }
    

}
module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGETCRUD: displayGETCRUD,
    getEditCrud: getEditCrud,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD
}