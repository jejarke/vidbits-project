const {assert} = require('chai');

describe('check when does not exist videos', () => {
    it('starts blank', () => {
        browser.url('/');
        assert.equal(browser.getText('#videos-container'), '');
      });
});

describe('can navigate', () => {
    it('to the create video', () => {
      browser.url('/');
      browser.click('a[href="/videos/new"]');
      assert.include(browser.getText('body'), 'Insert a new video');
    });
    it('to the edit video', () => {
      const {title, description, url} = buildVideoObject();
    
      //create video
      browser.url('/videos/new');
      browser.setValue('#url-input', url);
      browser.setValue('#title-input', title);
      browser.setValue('#description-input', description);
      browser.click('#submit-button');

      //check if video exist to edit
      browser.url('/videos');
      browser.click('.video-title a');
      browser.click('#edit-button')
      assert.include(browser.getText('#videos-container'), 'Edit video');
  });
});

describe('posts a new video', () => {
  it('and is rendered', () => {
    const itemToCreate = buildItemObject();
    browser.url('/videos/new');
    browser.setValue('#title-input', itemToCreate.title);
    browser.setValue('#description-input', itemToCreate.description);
    browser.setValue('#videoUrl-input', itemToCreate.url);
    browser.click('#submit-button');
    assert.include(browser.getText('body'), itemToCreate.title);
    assert.include(browser.getAttribute('body img', 'src'),   itemToCreate.url);
  });
});