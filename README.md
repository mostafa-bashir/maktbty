My Library - مكتبي
My Library - مكتبي is a Node.js-based library management system with distinct roles for admins and readers. It simplifies book borrowing, tracking, and reviewing processes while ensuring robust access control and user-friendly navigation.

Features
Admin Section
Add book titles and images.
Edit book details.
Review feedback from readers.
Check the current borrower if a book is unavailable.
Reader Section
Borrow books for a chosen period (availability-dependent).
Submit reviews for books they have read.
View the history of previously borrowed books.
Security Features
Role-based access control with restricted access to unauthorized sections.
Session-based authentication:
Redirects unauthenticated users to the login page.
Ensures logged-in users bypass login screens.
Technologies Used
Backend: Node.js, Express
Database: MySQL (with Sequelize ORM)
Authentication & Security: Sessions, Bcrypt, dotenv
Frontend: HTML, EJS, CSS, JavaScript
File Management: Multer
Utilities: Body-parser, Moment
Installation
Clone this repository:

bash
Copy code
git clone <https://github.com/mostafa-bashir/maktbty.git>  
cd my-library  
Install dependencies:

bash
Copy code
npm install  
Set up the environment variables in a .env file:

plaintext
Copy code
DB_HOST=your_database_host  
DB_USER=your_database_user  
DB_PASSWORD=your_database_password  
DB_NAME=your_database_name  
SESSION_SECRET=your_session_secret  
Run database migrations using Sequelize CLI:

bash
Copy code
npx sequelize-cli db:migrate  
Start the application:

bash
Copy code
npm start  
Usage
Admin Login: Access admin features like adding/editing books, viewing reviews, and tracking borrowers.
Reader Login: Borrow books, leave reviews, and check personal reading history.
Unauthorized access to paths results in a Forbidden screen.
Future Enhancements
Add user notifications for overdue books.
Integrate advanced search and filtering options.
Enable multi-language support.
License
This project is licensed under the MIT License.