Feature: As a user, I want to manage services

  Scenario: Create Service
    Given I am on service endpoint
    When I create a new service with default status
    Then All the details of created service should I see