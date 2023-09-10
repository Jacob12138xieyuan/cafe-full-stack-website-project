# Getting Started with Full Stack Practice Project

It is Fantastic Cafe website

   
## Frontend
It is written in react, redux-toolkit for state management, material UI as CSS framework, agGrid as table component.
It mainly has four pages.
1. /cafes: It renders all available cafes in a table. A button to add new cafe.
2. /edit-cafe: It renders a form for user to create/edit a cafe information with basic validation.
3. /employees: It renders all employees working in cafes in a table. A button to add new employee.
3.5. /employees?cafe_id=<cafe_id>: It filter employee by cafe_id 
4. /edit-employee: It renders a form for user to create/edit an employee information with basic validation.

Start frontend server by running
`npm start` in /frontend folder

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Backend
It is written in Nodejs (Expressjs), SQLite. It implements RESTful API for the frontend.
1. employees. GET /employees, GET /employees?cafe=<cafe_name>, POST /employees, PUT /employees, DELETE /employees
2. cafes. GET /cafes, GET /cafes?location=<location>, POST /cafes, PUT /cafes, DELETE /cafes

Start backend server by running
`npm start` in /backend folder

BaseURL: [http://localhost:5000](http://localhost:5000) to test APIs it in your browser.