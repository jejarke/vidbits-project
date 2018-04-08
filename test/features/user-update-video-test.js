const {assert} = require('chai');
const {buildVideoObject} = require('../test-utils');


describe('update the video', () => {
    it('Check if video have been updated correctly', () => {
    
    const {title, description, url} = buildVideoObject();
    
    //create video
    browser.url('/videos/new');
    browser.setValue('#url-input', url);
    browser.setValue('#title-input', title);
    browser.setValue('#description-input', description);
    browser.click('#submit-button');

    const newTitle = 'New title';
    const newDescription = 'New description';
    const newVideoUrl = 'https://www.youtube.com/watch?v=iUQaxSE_dGg';

    // save the video
    browser.click('#edit-button');
    browser.setValue('#title-input', newTitle);
    browser.setValue('#description-input', newDescription);
    browser.setValue('#url-input', newVideoUrl);
    browser.click('#submit-button');

    // check if the video have been updated correctly
    assert.include(browser.getText('body'), newTitle);
    assert.notInclude(browser.getText('body'), title);
    assert.include(browser.getText('body'), newDescription);
    assert.notInclude(browser.getText('body'), description);
    assert.include(browser.getAttribute('body iframe', 'src'), newUrl);
    assert.notInclude(browser.getAttribute('body iframe', 'src'), url);
    });
});