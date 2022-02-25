# Testing with Cypress and Cucumber on OpenCart Platform

This sample project explores the usage of Cucumber and Cypress to create BDD-style testing for the OpenCart Demo Platform.

The project is divided in different modules:
- **Admin:** groups user stories for admin users, utilizing the administrative system
- **Common:** gruups steps and functions called in different modules, such as page navigation
- **Customer:** groups user stories for marketplace customers

## Concepts Included
- BDD flows and Gherkin sintax
- Shared state across cucumber step definitions
- Scenario outlines wit data tables
- Common web page interaction methods
- Multiple page navigation

## Resources Used

### Cypress

As per their documentation, "Cypress is a next generation front end testing tool built for the modern web.". It allows for different types of testing, such as integration, regression, and visual testing, and it's particularly suited for E2E testing. It has native support for Chai, Chai-JQuery, and Sinon-Chai, and a myriad of community-provided resouces to expand its capabilities.

For more information, visit https://docs.cypress.io/

### Cypress-Cucumber-Preprocessor

"The cypress-cucumber-preprocessor adds support for using feature files when testing with Cypress."

For more information, visit https://github.com/TheBrainFamily/cypress-cucumber-preprocessor

### OpenCart Demo

Opencart is a marketplace solution for companies, and offers a demo platform with both the storefront for end customers and administrative resources which would be accessible only to shop admin staff. It provides a great variety of workflows to be tested, even if they're ultimately incomplete.

For more information, visit https://www.opencart.com/
