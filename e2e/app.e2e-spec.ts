import { KandooJsFrontendPage } from './app.po';

describe('kandoo-js-frontend App', function() {
  let page: KandooJsFrontendPage;

  beforeEach(() => {
    page = new KandooJsFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
