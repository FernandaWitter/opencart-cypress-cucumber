Feature: Admin reports
    Validates an assortment of report-related scenarios

Scenario: Admin obtains Sales Report
    Given Admin is logged in
    When Admin accesses 'Sales' report
    Then 'Sales' report is shown

Scenario: Admin obtains Tax Reports for the month of July
    Given Admin is logged in
    When Admin accesses 'Tax' report
    And Filters Reports for period '2017-07-01' to '2017-07-31'
    Then 'Tax' report is shown
    And All Records are for month '07'

Scenario: Admin accesses shop statistics
    Given Admin is logged in
    When Admin accesses statistics page
    Then Shop stats are shown