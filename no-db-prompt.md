# Machine Coding Interview Prompt Template

I need help creating a Node.js/Express.js application with the following requirements:

[INTERVIEW REQUIREMENTS BELOW HERE]
For the specific requirements of my interview question:
- hospital management
- one doctor, one patient, doctor can register and give speciality, slot register appointment for doctor, patient registration and selects slot based on doctor's speciality. patient should be able to book appointment. patient cannot book same timeslot with 2 doctor. all patients and doctor can see their own appointments. all types of sorting for checking appointments
- bonus: patients can cancel appointment, every doctor can be rated based on ranking, ranking calculated based on patient who rated them
Please help me set up the project with the following structure and best practices:

## 1. Project Structure
```
src/
├── routes/           # All route handlers organized by feature
│   ├── feature1/     # Each feature has its own directory
│   │   └── index.js  # Routes for feature1
│   └── feature2/
│       └── index.js
├── middleware/ 
│   ├── errorHandler.js
├── services/         # Business logic layer
│   ├── feature1Service.js
│   └── feature2Service.js
├── models/          # Data models/schemas
│   ├── feature1Model.js
│   └── feature2Model.js
├── utils/           # Utility functions and helpers
│   └── helpers.js
├── config/          # Configuration files
│   └── config.js
└── index.js         # Main application file
```

## 2. Key Requirements
- Use Express.js for the backend
- Use commonjs everywhere i.e. require, module.exports etc
- Implement dynamic route loading (routes should be automatically loaded based on directory structure)
- Follow RESTful API design principles
- Implement proper error handling
- Use async/await for asynchronous operations
- Include input validation
- Follow the MVC pattern (Model-View-Controller) or similar architecture
- Include proper comments and documentation
- Give me code for each file so that i can copy it, dont want to download files.
- This is for 90 min machine coding interview

## 3. Specific Implementation Details
- The main index.js should dynamically load routes from the routes directory
- Each route file should export an Express Router
- Services should contain business logic
- Models should handle data structure and validation
- Include proper error handling middleware
- Use environment variables for configuration
- Include basic security measures (input sanitization, etc.)

## 4. Additional Requirements
- The code should be production-ready
- Include proper error handling and logging
- Follow Node.js best practices
- Use ES6+ features
- Include proper comments and documentation

Please help me implement this structure and provide the necessary code for each component. Also, include a package.json with the required dependencies.