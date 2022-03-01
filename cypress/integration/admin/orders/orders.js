import { Then } from 'cypress-cucumber-preprocessor/steps'

const dashboardElements = [
    'Total Orders', 'Total Sales', 'Total Customers', 'People Online',
    'World Map', 'Sales Analytics', 'Recent Activity', 'Latest Orders'
]

Given('Admin accesses {string} under {string} menu', (subitem, item) => {
    cy.get('#menu').contains(item).click().next('ul').find('a[href^="https"]')
        .contains(subitem).click()
    cy.get('h1').contains(subitem).should('be.visible')
})

When('Admin applies filter for {string} with value {string}', (filter, val) => {
    cy.get('#filter-order').find('label').contains(filter, { matchCase: false })
        .invoke('attr', 'for').then(field => {
            cy.get('#' + field).click().clear().should('have.value', '')
                .type(val, { delay: 100 }).should('contain.value', val)
        })

    cy.get('#button-filter').click()
})

Then('All dashboard elements are shown', () => {
    dashboardElements.forEach(el => {
        cy.get('div').contains(el).scrollIntoView().should('be.visible')
    })
})

Then('All listed items have {string} data as {string}', (col, data) => {
    cy.getColIndex(col).then(ind => {
        cy.get('#form-order').find('tbody').find('tr').each(row => {
            cy.wrap(row).find('td').eq(ind).should('contain', data)
        })
    })
})