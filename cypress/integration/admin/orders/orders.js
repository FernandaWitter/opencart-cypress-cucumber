import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps'

const dashboardElements = [
    'Total Orders', 'Total Sales', 'Total Customers', 'People Online',
    'World Map', 'Sales Analytics', 'Recent Activity', 'Latest Orders'
]

const order = {
    cards: [
        { title: "Order Details", data: ['Your Store', '25/02/2022', 'Cash On Delivery', 'Flat Shipping Rate'], },
        { title: "Customer Details", data: ['Giridev Rabha', 'Default', 'soul@you.com', '911'], },
        { title: "Order (#", data: ['Shivam Roy', 'GAU', 'NAU 10101011', 'Assam', 'India', 'HP LP3065'] }
    ],
    total: '£79.20'
}

Given('Admin accesses {string} under {string} menu', (subitem, item) => {
    cy.get('#menu').contains(item).click().next('ul').find('a[href^="https"]')
        .contains(subitem).click()
    cy.get('h1').contains(subitem).should('be.visible')
})

When('Admin applies filter for {string} with value {string}', (filter, val) => {
    cy.get('#filter-order').find('label').contains(filter, { matchCase: false })
        .invoke('attr', 'for').then(field => {
            cy.get('#' + field).click({ force: true }).clear().should('have.value', '')
                .type(val, { delay: 100 }).should('contain.value', val)
        })

    cy.get('#button-filter').click()
})

And('Admin opens last order details', () => {
    cy.get('#form-order').find('table').as('ordersTable')
    cy.get('@ordersTable').find('thead').find('td').contains('Date Added')
        .click()
    cy.get('@ordersTable').find('tbody').find('tr').eq(-1)
        .find('[data-original-title="View"]').click()

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

Then('Order data is correct', () => {
    order.cards.forEach(card => {
        cy.get('.panel-heading').contains(card.title)
            .scrollIntoView().should('be.visible')
            .parents('div.panel').as('dataCard')
        card.data.forEach(data => {
            cy.get('@dataCard').should('contain', data)
        })
    })
    cy.get('i.fa-info-circle').parents('div.panel')
        .find('table').eq(-1).find('tr').eq(-1)
        .should('contain', 'Total')
        .and('contain', order.total)
})