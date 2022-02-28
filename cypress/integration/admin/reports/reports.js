import { Then, When, And } from 'cypress-cucumber-preprocessor/steps'

const stats = ['Order Sales', 'Orders Processing', 'Orders Complete', 'Orders Other',
    'Returns', 'Out of stock products', 'Pending Reviews'
]

When('Admin accesses {string} report', report => {
    cy.clickAdminMenuItem('#menu-report', 'Reports')
    cy.url().should('contain', 'report')
    cy.get('select[name="report"]')
        .select(report + ' Report')
})

When('Admin accesses statistics page', () => {
    cy.clickAdminMenuItem('#menu-report', 'Statistics')
    cy.url().should('contain', 'statistics')
})

And('Filters Reports for period {string} to {string}', (start, end) => {
    cy.get('[name="filter_date_start"]').clear().type(start)
    cy.get('[name="filter_date_end"]').clear().type(end)
    cy.get('#button-filter').click()
})

Then('{string} report is shown', report => {
    cy.adminCardIsVisible(report + ' Report')
})

Then('Shop stats are shown', () => {
    cy.adminCardIsVisible('Statistics List')
    stats.forEach(stat => {
        cy.get('table').find('tbody').find('tr').contains(stat)
            .parents('tr').find('td').eq(1).should('not.be.empty')
    })
})

And('All Records are for month {string}', month => {
    cy.get('.table-responsive').find('tbody').find('tr').each(row => {
        cy.wrap(row).find('td').eq(0).should('contain', '/' + month + '/')
        cy.wrap(row).find('td').eq(1).should('contain', '/' + month + '/')
    })
})