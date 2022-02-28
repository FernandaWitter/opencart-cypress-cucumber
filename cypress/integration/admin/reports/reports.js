import { Then, When } from 'cypress-cucumber-preprocessor/steps'

When('Admin accesses {string} report', report => {
    cy.clickAdminMenuItem('#menu-report', 'Reports')
    cy.url().should('contain', 'report')
    cy.get('select[name="report"]')
        .select(report + ' Report')
})

Then('{string} report is shown', report => {
    cy.adminCardIsVisible(report + ' Report')
})