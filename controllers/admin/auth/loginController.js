const bcrypt = require('bcrypt');
const {User} = require('../../../models');

const getLoginController = (req,res) => {
    res.render('auth/login', {
        error: '',
        currentUrl: req.originalUrl
    });
}

const postLoginController = async (req,res) => {
    
    const {email, password} = req.body;

    const user = await User.findOne({where: {email}});

    if(user){

        const isMatch = await bcrypt.compare(password, user.password);

        if(isMatch){
            req.session.user = user;
            // hnro7 ll feed
            res.redirect('/admin/allbooks');
            
        }else{
            res.render('auth/login', {
                error: 'Email or Password is incorrect'
            });  
        }

    }else{
        res.render('auth/login', {
            error: 'Email or Password is incorrect'
        })
    }
};

const getLogoutController = async (req,res) => {
    req.session.destroy((err) => {
        if (err) {
          return res.status(500).send('Error logging out');
        }
        res.redirect('/admin/login'); // Redirect to login page after logging out
      });
}

module.exports = {getLoginController, postLoginController, getLogoutController};