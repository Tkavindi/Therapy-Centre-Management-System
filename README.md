# Therapy Centre Management System

## Overview
Therapy Centre Management System is a web application designed to manage therapy centre operations, including booking appointments, managing employees, tracking expenses and income, handling salaries, and maintaining massage service records. The system consists of a **back-end** (Node.js with Express) deployed on **Fly.io** and a **front-end** (React with Vite) deployed on **Vercel**.

## Features
- **Booking Management**: Patients can book therapy sessions online.
- **Employee Management**: Manage therapist and staff details.
- **Expense & Income Tracking**: Keep track of financial transactions.
- **Massage Services**: Manage different massage therapies offered.
- **Salary Management**: Calculate and manage employee salaries.

## Tech Stack
### Back-end:
- **Node.js**
- **Express.js**
- **MongoDB** (Database)
- **Fly.io** (Deployment)

### Front-end:
- **React.js (Vite)**
- **Bootstrap** (Styling)
- **Vercel** (Deployment)

## File Structure
### Back-end:
```
back-end/
├── Controllers/
│   ├── BookingController.js
│   ├── EmployeeController.js
│   ├── ExpensesController.js
│   ├── IncomeController.js
│   ├── MassageController.js
│   ├── SalaryController.js
│
├── Models/
│   ├── BookingModels.js
│   ├── EmployeeModel.js
│   ├── ExpensesModels.js
│   ├── IncomeModel.js
│   ├── MassageModel.js
│   ├── SalaryModel.js
│
├── Routes/
│   ├── BookingRoute.js
│   ├── EmployeeRoute.js
│   ├── ExpensesRoutes.js
│   ├── IncomeRoute.js
│   ├── MassageRoute.js
│   ├── SalaryRoute.js
│
├── Utils/
│   ├── Connectdb.js
│   ├── Database.js
│
├── .dockerignore
├── Dockerfile
├── fly.toml
├── index.js
├── package.json
└── package-lock.json
```

### Front-end:
```
front-end/
├── public/
│   ├── spa_logo.png
│
├── src/
│   ├── assets/
│   ├── Admin.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── BookingForm.css
│   ├── BookingForm.jsx
│   ├── BookingView.css
│   ├── BookingView.jsx
│   ├── Expenses.jsx
│   ├── Home.jsx
│   ├── Income.jsx
│   ├── Login.jsx
│   ├── ManageEmployee.jsx
│   ├── ManageMassage.jsx
│   ├── NavBar.css
│   ├── NavBar.jsx
│   ├── Salary.jsx
│   ├── index.css
│   ├── main.jsx
│
├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

## Setup Instructions
### Back-end Setup
1. **Clone the repository**
   ```sh
   git clone https://github.com/Tkavindi/Therapy-Centre-Management-System.git
   cd back-end
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Run the server locally**
   ```sh
   npm start
   ```
4. **Deploy on Fly.io**
   - Install Fly.io CLI and log in.
   - Deploy using:
   ```sh
   fly deploy
   ```

### Front-end Setup
1. **Navigate to the front-end directory**
   ```sh
   cd front-end
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Run locally**
   ```sh
   npm run dev
   ```
4. **Deploy on Vercel**
   ```sh
   vercel
   ```

## Contributing
1. Fork the repository.
2. Create a new branch (`feature-branch`).
3. Commit your changes.
4. Push to the branch and submit a Pull Request.

## License
This project is licensed under the MIT License.


