Feature: Order management
    Validates an assortment of scenarios related to orders from the admin system

Background: Admin is logged in
    Given Admin is logged in

Scenario: Admin validates dashboard data
    Given Admin is on 'dashboard' page
    Then All dashboard elements are shown

Scenario: Admin obtains all orders placed on Feb 24th, 2022
    Given Admin accesses 'Orders' under 'Sales' menu
    When Admin applies filter for 'Date Added' with value '2022-02-24'
    Then All listed items have 'Date Added' data as '24/02/2022'

@skip
Scenario: Admin validates details for the last order placed by Giridev Rabha
    Given Admin accesses 'Orders' under 'Sales' menu
    When Admin applies filter for 'customer' with value 'Giridev Rabha'
    And Admin opens last order details
    Then Order data is correct

@skip
Scenario: Admin validates registrarion data for client Giridev Rabha
    Given Admin accesses 'Customers' under 'Customers' menu
    When Admin applies filter for 'customer name' with value 'Giridev Rabha'
    And Admin opens customer details
    Then Registration data for 'Giridev Rabha' is correct

@skip
Scenario: Admin tries to emit new gift voucher
    Given Admin accesses 'Gift Vouchers' under 'Sales' menu
    And Gift voucher form is complete
    When Admin tries to save gift voucher
    Then Permission error is show

@skip    
Scenario: Admin obtains all return orders for product HP LP3065
    Given Admin accesses 'Returns' under 'Sales' menu
    When Admin applies filter for 'product' with value 'HP LP3065'
    Then All listed items have 'product' data as 'HP LP3065'

@skip
Scenario: Admin validates registered coupons
    Given Admin accesses 'Coupons' under 'Marketing' menu
    Then Only expected coupons are listed
