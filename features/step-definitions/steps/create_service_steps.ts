// import { assert, expect } from 'chai';
// const { Given, When, Then } = require('cucumber');
// import httpClient from '../helpers/httpClient';
//
//
// When('I create a new service with default status by sending query to endpoint', async function () {
//     const response = await httpClient.post('/service', {});
//     this.newService = response.body;
//     assert.strictEqual(response.statusCode, 201);
//
//
//     const response = await httpClient.put('/service/' + this.newService.id, { state: 'next' });
//     this.state = response.body;
//     assert.strictEqual(response.statusCode, 200);
// });
//
// Then('All the details of created service should I see', function () {
//     assert.strictEqual(this.state, 'processing');
// });
