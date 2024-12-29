const {Book, Image, Review, Rent} = require('../../../models');
const { Op } = require('sequelize');

const getBooksController = async (req,res) => {
        const books = await Book.findAll({
          attributes: ['id', 'bookName'],
          include: [
            {
                model: Image,
                as: 'images'
            }
          ]
        });
        
        res.render('reader/books', {
            books
        });
}

const getRentBookController = async (req,res) => {
  const book = await Book.findByPk(req.params.id, {
      include: [
        {
          model: Image,
          as: 'images'
        },
        {
          model: Review,
          as: 'reviews'
        },
        {
          model: Rent,
          as: 'rents'
        }
      ]
  })
  res.render('reader/rentBook', {
    book,
    showError: false
  })
}

const postRentBookController = async (req,res) => {
  
  const conflictingRents = await Rent.findOne({
    where: {
      readerId: req.session.user.id,
      bookId: req.params.id,
      [Op.or]: [
        {
          startDate: {
            [Op.between]: [req.body.startDate, req.body.endDate],
          },
        },
        {
          endDate: {
            [Op.between]: [req.body.startDate, req.body.endDate],
          },
        },
        {
          [Op.and]: [
            {
              startDate: {
                [Op.lte]: req.body.startDate,
              },
            },
            {
              endDate: {
                [Op.gte]: req.body.endDate,
              },
            },
          ],
        },
      ],
    },
  });
  
  if(!conflictingRents){
    const rent = await Rent.create({
      readerId: req.session.user.id,
      bookId: req.params.id,
      startDate: req.body.startDate,
      endDate: req.body.endDate
    })
  
    await rent.save()
  
    res.redirect('/books');
  }else{
    const book = await Book.findByPk(req.params.id, {
      include: [
        {
          model: Image,
          as: 'images'
        },
        {
          model: Review,
          as: 'reviews'
        },
        {
          model: Rent,
          as: 'rents'
        }
      ]
  });
    res.render('reader/rentBook',{
      book,
      showError: true
    });
  }
}

module.exports = {getBooksController, getRentBookController, postRentBookController};