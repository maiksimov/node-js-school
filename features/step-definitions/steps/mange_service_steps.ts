import { assert, expect } from 'chai';
const { Given, When, Then } = require('cucumber');
import httpClient from '../helpers/httpClient';
import { getConnection } from 'typeorm';

When('I am on service endpoint I create a new service with default status', async function () {
    await getConnection().synchronize(true);
    const response = await httpClient.post('/service', {});
    this.status = response.body;
    assert.strictEqual(response.statusCode, 201);
});

Then('Status of created service should I see', function () {
    assert.strictEqual(this.status, 'new');
});
