import { NexhealthcarePage } from './app.po';

describe('nexhealthcare App', function() {
  let page: NexhealthcarePage;

  beforeEach(() => {
    page = new NexhealthcarePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
