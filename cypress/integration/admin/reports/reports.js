import { Then, When } from 'cypress-cucumber-preprocessor/steps'

When('Admin accesses {string} report', report => {
    cy.clickAdminMenuItem('#menu-report', 'Reports')
    cy.url().should('contain', 'report')
    cy.get('select[name="report"]')
        .select(report + ' Report')
})

And('Filters Reports for period {string} to {string}', (start, end) => {
    cy.get('[name="filter_date_start"]').clear().type(start)
    cy.get('[name="filter_date_end"]').clear().type(end)
    cy.get('#button-filter').click()
})

Then('{string} report is shown', report => {
    cy.adminCardIsVisible(report + ' Report')
})

And('All Records are for month {string}', month => {
    cy.get('.table-responsive').find('tbody').find('tr').each(row => {
        cy.wrap(row).find('td').eq(0).should('contain', '/' + month + '/')
        cy.wrap(row).find('td').eq(1).should('contain', '/' + month + '/')
    })
})