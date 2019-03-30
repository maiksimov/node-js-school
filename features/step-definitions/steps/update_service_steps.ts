import { assert, expect } from 'chai';
const { Given, When, Then } = require('cucumber');
import httpClient from '../helpers/httpClient';

Given('I am on service endpoint', async function () {
    const response = await httpClient.post('/service', {});
    this.newService = response.body;
    assert.strictEqual(response.statusCode, 201);
});


When('I change service state by sending new status to endpoint', async function () {

    const response = await httpClient.put('/service/' + this.newService.id, { state: 'next' });
    this.state = response.body;
    assert.strictEqual(response.statusCode, 200);
});

Then('New state status of updated service should I see', function () {
    assert.strictEqual(this.state, 'processing');
});
