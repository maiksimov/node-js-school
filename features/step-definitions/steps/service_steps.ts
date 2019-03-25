import { assert, expect } from 'chai';
const { Given, When, Then } = require('cucumber');
import httpClient from '../helpers/httpClient';

Given('I am on service endpoint', async function () {
    const response = await httpClient.post('/service', {});

    this.newService = response.body;
    assert.strictEqual(response.statusCode, 201);
});


When('I create a new service with default status', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('All the details of created service should I see', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});
