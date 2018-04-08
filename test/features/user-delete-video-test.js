const {assert} = require('chai');
const {buildVideoObject} = require('../test-utils');

describe('User deleting video', () => {
    describe('removes the Video from the list', () => {
      it('the video is saved successfully', () => {
        const {title, description, url} = buildVideoObject();

        //creating the video
        browser.url('/videos/new');
        browser.setValue('#url-input', url);
        browser.setValue('#title-input', title);
        browser.setValue('#description-input', description);
        browser.click('#submit-button');
        
        // remove the video
        browser.click('#delete');
        
        // check if video have been removed
        assert.notInclude(browser.getText('body'), title);
        assert.notInclude(browser.getText('body'), description);
        assert.notInclude(browser.getText('body'), url);
      });  
    });
});