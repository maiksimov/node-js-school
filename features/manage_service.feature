Feature: As a user, I want to manage services

  Scenario: Create Service
    When I am on service endpoint I create a new service with default status
    Then Status of created service should I see

#  Scenario: Update Service
#    Given I send PUT request to endpoint of service with id "1"
#    When I change service state by sending new status to endpoint
#    Then New state status of updated service should I see