import { KandoeJsFrontendPage } from './app.po';

describe('kandoe-js-frontend App', function() {
  let page: KandoeJsFrontendPage;

  beforeEach(() => {
    page = new KandoeJsFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});