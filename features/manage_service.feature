Feature: As a user, I want to manage services

  Scenario: Create Service
    When I am on service endpoint I create a new service with default status
    Then Status of created service should I see

  Scenario Outline: Update Service
    Given I have a service with state <state>
    When I change service state by sending new <action> to endpoint
    Then New state status of updated service should be <response>

  Examples:
  |    state        |    action      |    response      |
  |    'new'        |    'next'      |    'processing'  |
  |    'new'        |    'close'     |    'exception'   |
  |    'new'        |    'refund'    |    'exception'   |
  |    'processing' |    'next'      |    'pending'     |
  |    'processing' |    'close'     |    'close'       |
  |    'processing' |    'refund'    |    'exception'   |
  |    'pending'    |    'next'      |    'deploy'      |
  |    'pending'    |    'close'     |    'exception'   |
  |    'pending'    |    'refund'    |    'refund'      |
  |    'deploy'     |    'next'      |    'exception'   |
  |    'deploy'     |    'close'     |    'exception'   |
  |    'deploy'     |    'refund'    |    'refund'      |
  |    'refund'     |    'next'      |    'exception'   |
  |    'refund'     |    'close'     |    'close'       |
  |    'refund'     |    'refund'    |    'exception'   |
