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
const customers = [{
    name: 'Giridev Rabha',
    group: 'Default',
    email: 'soul@you.com',
    phone: '911',
    address: 'Kya karega janke',
    city: 'Nhi pata'
}]

const voucher = {
    code: 'asd123',
    fromName: 'Admin',
    fromEmail: 'admin@youstore.com',
    toName: 'Lucky User',
    toEmail: 'lucky@user.com',
    amount: '£20.00'
}

Given('Admin accesses {string} under {string} menu', (subitem, item) => {
    cy.get('#menu').contains(item).click().next('ul').find('a[href^="https"]')
        .contains(subitem).click({ force: true })
    cy.get('h1').contains(subitem).should('be.visible')
})

When('Admin tries to create new gift voucher', () => {
    cy.get('[data-original-title="Add New"]').click()
    cy.get('#input-code').clear().type(voucher.code)
        .should('have.value', voucher.code)
    cy.get('#input-from-name').clear().type(voucher.fromName)
        .should('have.value', voucher.fromName)
    cy.get('#input-from-email').clear().type(voucher.fromEmail)
        .should('have.value', voucher.fromEmail)
    cy.get('#input-to-name').clear().type(voucher.toName)
        .should('have.value', voucher.toName)
    cy.get('#input-to-email').clear().type(voucher.toEmail)
        .should('have.value', voucher.toEmail)
    cy.get('#input-amount').clear().type(voucher.amount)
        .should('have.value', voucher.amount)
    cy.get('[data-original-title="Save"]').click()
})

When('Admin applies filter for {string} with value {string}', (filter, val) => {
    cy.get('label').contains(filter, { matchCase: false })
        .invoke('attr', 'for').then(field => {
            cy.get('#' + field).click({ force: true }).clear().should('have.value', '')
                .type(val, { delay: 100 }).should('contain.value', val)
        })

    cy.get('#button-filter').click({ force: true })
})

And('Admin opens {string} details', () => {
    cy.get('form').find('table').as('ordersTable')
    cy.get('@ordersTable').find('thead').find('td').contains('Date Added')
        .click()
    cy.get('@ordersTable').find('tbody').find('tr').eq(-1)
        .find('[data-original-title="View"], [data-original-title="Edit"]').click()

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

Then('Registration data for {string} is correct', customer => {
    let c = customers.filter(obj => { return obj.name == customer })[0]
    cy.get('#input-firstname').should('have.value', c.name.split(" ")[0])
    cy.get('#input-lastname').should('have.value', c.name.split(" ")[1])
    cy.get('#input-customer-group').should('contain', c.group)
    cy.get('#input-email').should('have.value', c.email)
    cy.get('#input-telephone').should('have.value', c.phone)

    cy.get('a[href="#tab-address1"]').click()
    cy.get('#input-address-11').should('have.value', c.address)
    cy.get('#input-city1').should('have.value', c.city)

})

Then('Permission error is show', () => {
    let errorMsg = ' Warning: You do not have permission to modify vouchers!'
    cy.get('.alert-danger.alert-dismissible').should('contain', errorMsg)
})