const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

describe('check if is possible add a new video', () => {
  describe('posts a new video', () => {
    it('and is rendered', () => {
      const itemToCreate = buildItemObject();
      browser.url('/videos/create.html');
      browser.setValue('#title-input', itemToCreate.title);
      browser.setValue('#description-input', itemToCreate.description);
      browser.setValue('#videoUrl-input', itemToCreate.url);
      browser.click('#submit-button');
      assert.include(browser.getText('body'), itemToCreate.title);
      assert.include(browser.getAttribute('body img', 'src'), itemToCreate.url);
    });
  });
});