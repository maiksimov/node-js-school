Feature: As a user, I want to change state of service flow

  Scenario: Update Service
    Given I am on service endpoint
    When I change service state by sending new status to endpoint
    Then New state status of updated service should I see