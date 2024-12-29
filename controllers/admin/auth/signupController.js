const bcrypt = require('bcrypt');
const {User} = require('../../../models');

const getSignupController = (req,res) => {
    res.render('auth/signup', {
        error: null
    });
}

const postSignupController = async (req,res,type)=>{
    
    const {email, name, password} = req.body;

    const userExistance = await User.findOne({where: {email}});

    if (userExistance){
        res.render('auth/signup',{
            error: 'User already exists'
        });
    }else{
        
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({ name, email, password: hashedPassword, type});

        res.redirect('/login');
    } 

}

module.exports = {getSignupController, postSignupController};