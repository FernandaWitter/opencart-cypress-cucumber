import { Then } from 'cypress-cucumber-preprocessor/steps'

const dashboardElements = [
    'Total Orders', 'Total Sales', 'Total Customers', 'People Online',
    'World Map', 'Sales Analytics', 'Recent Activity', 'Latest Orders'
]

Then('All dashboard elements are shown', () => {
    dashboardElements.forEach(el => {
        cy.get('div').contains(el).scrollIntoView().should('be.visible')
    })
})