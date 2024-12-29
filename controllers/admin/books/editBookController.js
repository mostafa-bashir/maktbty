const {Book, Image} = require('../../../models');

const getEditBookController = async (req,res) => {

    const book = await Book.findByPk(req.params.id, {
        include : [
            {
            model: Image,
            as: 'images'
            }
        ]
    });

    res.render('admin/editBook',{
        book
    });
}

const fs = require('fs'); // File system module for file operations

const postEditBookController = async (req, res) => {
    try {
        const bookId = req.params.id;
        const { bookName, deletedImages } = req.body;

        // Fetch the book and its associated images
        const book = await Book.findByPk(bookId, {
            include: { model: Image , as: 'images'}, // Ensure `Image` is associated with `Book`
        });

        if (!book) {
            return res.status(404).send('Book not found');
        }

        // Update the book name
        if (bookName) {
            book.bookName = bookName;
            await book.save();
        }

        // Handle image deletions
        if (deletedImages) {
            const imagesToDelete = Array.isArray(deletedImages) ? deletedImages : [deletedImages];
            for (const imageId of imagesToDelete) {
                // Find the image in the database
                const image = await Image.findByPk(imageId);
                if (image) {
                    const fullPath = `public${image.path}`; // Construct full file path
                    if (fs.existsSync(fullPath)) {
                        fs.unlinkSync(fullPath); // Delete the file
                    }
                    await image.destroy(); // Remove image record from the database
                }
            }
        }

        // Handle new image uploads
        if (req.files && req.files.length > 0) {
            const newImages = req.files.map((file) => ({
                imagePath: `/images/${file.filename}`,
                bookId: book.id, // Associate image with the book
            }));
            await Image.bulkCreate(newImages); // Add new image records
        }

        // Redirect to the book details page
        res.redirect(`/admin/book/${book.id}`);
    } catch (error) {
        console.error('Error updating the book:', error);
        res.status(500).send('An error occurred while updating the book.');
    }
};



module.exports = {getEditBookController, postEditBookController};