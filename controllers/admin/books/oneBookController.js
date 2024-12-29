const {Book, User, Image, Review} = require('../../../models');

const getOneBookController = async (req,res) => {
    
    const id = req.params.id;

    const book = await Book.findByPk(id, {
        include: [
          {
            model: Image,
            as: 'images', // Alias defined in the association
          },
          {
            model: Review,
            as: 'reviews', // Alias defined in the association
            include: [
              {
                model: User,
                as: 'reader', // Alias defined in the association
              },
            ],
          },
        ],
      });

      res.render('admin/oneBook', {
        book
      });
}

module.exports = getOneBookController;