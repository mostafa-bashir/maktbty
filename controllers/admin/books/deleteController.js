const {Book} = require('../../../models');

const deleteController = async (req,res) => {

    await Book.destroy({where:{id: req.params.id}});

    res.redirect('/admin/allbooks');

}

module.exports = deleteController;