const {Book, User, Rent} = require('../../../models');

const moment = require('moment');


const allBooksController = async (req, res) => {
  const today = moment().format('YYYY-MM-DD'); // Get today's date

  // Fetch all books with their rents and associated users
  const books = await Book.findAll({
    attributes: ['id', 'bookName'],
    include: [
      {
        model: Rent,
        as: 'rents',
        attributes: ['startDate', 'endDate'],
        include: [
          {
            model: User,
            as: 'reader',
            attributes: ['name'], // Include the reader's name
          },
        ],
      },
    ],
  });

  // Process availability for each book
  const processedBooks = books.map(book => {
    // Check for current rents for this book
    const currentRent = book.rents.find(rent => {
      const rentStartDate = moment(rent.startDate);
      const rentEndDate = moment(rent.endDate);

      // Check if today's date is within the rent period (inclusive of start and end date)
      return moment(today).isBetween(rentStartDate, rentEndDate, null, '[]');
    });
  
    return {
      ...book.toJSON(),
      availability: currentRent
        ? { status: 'Taken', reader: currentRent.reader.name }
        : { status: 'Available' },
    };
  });

  // Render the view with the processed books
  res.render('admin/allBooks', { books: processedBooks });
}

module.exports = allBooksController;