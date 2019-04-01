import { assert, expect } from 'chai';
const { Given, When, Then } = require('cucumber');
import httpClient from '../helpers/httpClient';
import { ServiceContext } from '../../../service-with-state-strategy/ServiceContext';

When('I am on service endpoint I create a new service with default status', async function () {
    const response = await httpClient.post('/service', {});
    this.status = response.body;
    assert.strictEqual(response.statusCode, 201);
});

Then('Status of created service should I see', function () {
    assert.strictEqual(this.status, 'new');
});

Given('I have a service with state {string}', function (state) {
    this.state = state;
});

When('I change service state by sending new {string} to endpoint', function (action) {
    this.context = new ServiceContext(this.state, action);
});

Then('New state status of updated service should be {string}', function (expectedState) {
    if ( expectedState == 'exception' )
        assert.throws(() => { this.context.run(); } , Error);
    else
        assert.strictEqual(this.context.run(), expectedState);
});
