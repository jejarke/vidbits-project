const {assert} = require('chai');
const request = require('supertest');
const app = require('../../app');
const Item = require('../../models/video');
const {buildItemObject, seedItemToDatabase, parseTextFromHTML} = require('../test-utils');
const {connectDatabase, disconnectDatabase} = require('../database-utilities');

describe('Server path: /videos/new', () => {

    beforeEach(connectDatabase);
    afterEach(disconnectDatabase);

    describe('POST', () => {
        it('creates and saves a new video', async () => {
            const itemToCreate = buildItemObject();
            const response = await request(app)
                .post('/videos')
                .type('form')
                .send(itemToCreate);
            const createdItem = await Item.findOne(itemToCreate);
            assert.isOk(createdItem, 'Item was not created successfully in the database');
        });
        it('check if redirect to /videos/id after video create', async () => {
            const itemToCreate = buildItemObject();
            const response = await request(app)
                .post('/videos')
                .type('form')
                .send(itemToCreate);

            const nItem = await Item.findOne({});

            assert.equal(response.status, 302);
            assert.equal(response.headers.location, `/videos/${nItem._id}`);
        });
        it('Not possible add video without title', async () => {
            const oldVideo = await seedItemToDatabase();
            const newVideo = buildItemObject();
      
            newVideo.title = undefined;
      
            const response = await request(app)
              .post(`/videos/${oldVideo._id}/updates`)
              .type('form')
              .send(newVideo);
      
            assert.equal(response.status, 400);
            assert.include(parseTextFromHTML(response.text, 'form'), 'Title is required');
        });
        
        
    });

});