Feature: As a user, I want to manage services

  Scenario: Create Service
    When I create a new service with default status by sending query to endpoint
    Then All the details of created service should I see