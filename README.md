# Application-MERN
The candidate is required to implement a simple application using the MERN stack (MongoDB, Express, React, Node.js) that covers the following modules: 
Objective: 
The candidate is required to implement a simple application using the MERN stack (MongoDB, Express, React, Node.js) that covers the following modules: 
● Register 
● Login 
● Courses CRUD operations (Create, Read, Edit, Delete) 
This interview will evaluate the candidate's ability to structure and implement these modules using best practices in full-stack development. 
Modules to Implement: 
1. Register 
○ Endpoint to register a new user. 
○ Fields: Name, Email, Password, etc. 
○ Ensure proper validation and error handling (e.g., check if the email is unique). ○ Hash the password before saving to the database. 
2. Login 
○ Endpoint for users to log in. 
○ Fields: Email, Password. 
○ The endpoint should return a JWT token if the login is successful. 
○ Handle errors such as invalid credentials. 
3. Courses (CRUD operations) 
○ Create: Endpoint to create a new course. 
■ Fields: Course Name, Description, Instructor, etc. 
○ Read: Endpoint to fetch all courses or a specific course by ID. 
○ Edit: Endpoint to edit/update course details. 
○ Delete: Endpoint to delete a course.
Assessment Criteria: 
Naming Structure: 
● Consistency: The candidate should use consistent naming conventions for variables, functions, files, models, and API endpoints. 
● API Routes: Use plural nouns for collections (/api/courses) and singular for single entities (/api/course/:id). 
● Clarity: Names should clearly reflect the data or functionality they represent. For example: 
■ User Model: user.js 
■ Course Model: course.js 
■ Register Route: auth/register.js 
■ Login Route: auth/login.js 
Database (MongoDB): 
● Schema Design: The candidate should design clean MongoDB schemas for both Users and Courses with proper validation (using Mongoose, for example). 
● Data Validation: Implement validation for the fields, such as email format, password strength, and required fields for courses. 
Well-Commented Code: 
● Documentation: The candidate should add clear comments and documentation explaining the purpose of functions, classes, and components. This includes explaining any non-obvious logic, especially around authentication, authorization, or complex operations. 
