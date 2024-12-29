const {Review, Book, Image, Rent} = require('../../../models');

const getMyReviewsController = async (req,res) => {

    const reviews = await Review.findAll(
        {
            where: {
            readerId: req.session.user.id
            },

            include: [
                {
                    model: Book,
                    as: 'book'
                }
            ]

    });

    console.log(reviews[0],'fsdfdspfjdsp')
    res.render('reader/myreviews',{
        reviews
    })
};

const getReadBooksController = async (req, res) => {
    try {
        if (!req.session.user || !req.session.user.id) {
            return res.status(401).send('Unauthorized: User not logged in.');
        }

        const books = await Book.findAll({
            include: [
                // Include images for the book
                {
                    model: Image,
                    as: 'images',
                },
                // Include user's review if they reviewed the book
                {
                    model: Review,
                    as: 'reviews', // Ensure this alias matches your association
                    where: {
                        readerId: req.session.user.id, // Filter reviews by the logged-in user
                    },
                    required: false, // Allow books even if no review exists
                },
                // Include rent information for the user
                {
                    model: Rent,
                    as: 'rents', // Ensure this alias matches your association
                    where: {
                        readerId: req.session.user.id, // Filter rents by the logged-in user
                    },
                },
            ],
        });

        res.render('reader/readBooks', { books });
    } catch (error) {
        console.error('Error fetching read books:', error);
        res.status(500).send('Internal Server Error');
    }
};

const postReviewController = async (req,res) => {

    const review = await Review.create({
        readerId: req.session.user.id,
        bookId: req.params.bookId,
        review: req.body.review,
        rentId: req.params.rentId
    })

    await review.save();

    await Book.findByPk(req.params.bookId, {
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
    res.redirect('/old-books')

}


module.exports = {getMyReviewsController, getReadBooksController, postReviewController};