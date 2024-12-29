const { Image, Book, sequelize } = require("../../../models");

const getAddBookController = (req, res) => {
  res.render("admin/addBook");
};

const postAddBookController = async (req, res) => {
    const transaction = await sequelize.transaction(); // Start a new transaction
  
    try {
      const { bookName } = req.body;
      const bookImages = req.files.map((file) => ({
        path: file.path, // Store the file path in the Image table
      }));
  
      // Step 1: Create the Book within the transaction
      const newBook = await Book.create(
        {
          bookName, // Set the name of the book
        },
        { transaction } // Pass the transaction object to Book.create
      );
      
      // Step 2: Prepare the images data for bulk creation
      const images = bookImages.map((imagePath) => ({
        bookId: newBook.id, // Associate the image with the newly created book
        imagePath: imagePath.path.replace('public', ''), // Path to the image
      }));
  
      // Step 3: Use bulkCreate to add multiple images at once
      await Image.bulkCreate(images, { transaction });
  
      // Commit the transaction (save changes to the database)
      await transaction.commit();
  
      res.redirect("/admin/allbooks"); // Redirect to the books page
    } catch (error) {
      // If something goes wrong, rollback the transaction
      await transaction.rollback();
      console.error(error);
      res.status(500).send('An error occurred while adding the book.');
    }
  };
  

module.exports = { getAddBookController, postAddBookController };
