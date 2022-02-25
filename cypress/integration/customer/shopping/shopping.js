import { Given, Then, When, But } from 'cypress-cucumber-preprocessor/steps'

const cartUrl = '/index.php?route=checkout/cart'

Given('Client is on home page', () => {
    cy.intercept('GET', '/index.php?route=common/cart/info').as('addToCart')
    cy.visit('/')
})

When('An item is added to cart', () => {
    cy.get('.product-layout').eq(0).find('i.fa-shopping-cart').parents('button').eq(0).click()
    cy.wait('@addToCart')
})

When('{string} are added to cart', items => {
    items.split(',').forEach(item => {
        item = item.trim()
        cy.get('#search').find('input').click().clear().should('have.value', '')
            .type(item, { delay: 100 }).should('have.value', item)
            .type('{enter}')
        cy.get(`a:contains(${item})`).parents('div.product-layout')
            .find('i.fa-shopping-cart').parents('button').eq(0).click()
        cy.wait('@addToCart')
        cy.get('#cart').click().find('ul').should('contain', item)
    })

})

Then('Client can proceed to checkout', () => {
    cy.get('#cart').click().wait(1000)
        .children('ul')
        .should('not.contain', 'Your shopping cart is empty!')
    cy.visit(cartUrl)
    cy.get('table').find('thead').contains('Product Name').parents('table')
        .find('tbody').find('tr').its('length').should('be.gt', 0)
    cy.get('.btn-primary').contains('Checkout').scrollIntoView()
        .should('be.visible')
        .and('not.be.disabled')
})

But('All items are out of stock', () => {
    cy.get('.alert-danger').scrollIntoView()
        .should('be.visible')
        .and('contain', 'not available')
        .and('contain', 'not in stock')
    cy.get('h1').contains('Shopping Cart').next('form')
        .find('tbody').find('tr').each(row => {
            cy.wrap(row).find('td').eq(1).should('contain', '***')
        })
})