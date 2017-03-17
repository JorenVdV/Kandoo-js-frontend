import {browser, element, by, ExpectedConditions, protractor} from 'protractor';

describe('Landing page', function () {
    beforeEach(() => {
        browser.ignoreSynchronization = true;
        browser.get('/');
    });

    it('should display the home page', () => {
        expect(element(by.css('.intro-message h1')).getText()).toBe('KANDOE');
        expect(element(by.css('.intro-message h3')).getText()).toBe('Decisions made easy');
        element.all(by.css('.intro-message login button')).then(function (items) {
            expect(items[0].getText()).toBe('LOGIN');
            expect(items[1].getText()).toBe('REGISTER');
        });

    });

    it('should display the login modal window', () => {
        element.all(by.css('.intro-message login button')).then(function (items) {
            expect(items[0].getText()).toBe('LOGIN');
            items[0].click().then(function () {
                browser.wait(ExpectedConditions.visibilityOf(element(by.id('loginModal'))), 2000);
            });
        });
    });

    it('should display the register modal window', () => {
        element.all(by.css('.intro-message login button')).then(function (items) {
            expect(items[1].getText()).toBe('REGISTER');
            items[1].click().then(function () {
                browser.wait(ExpectedConditions.visibilityOf(element(by.id('registerModal'))), 2000);
            });
        });
    });

    it('should login the user', () => {
        const loginModalWindow = element(by.id('loginModal'));
        element.all(by.css('.intro-message login button')).then(function (items) {
            expect(items[0].getText()).toBe('LOGIN');
            items[0].click().then(function () {
                browser.wait(ExpectedConditions.visibilityOf(loginModalWindow), 2000);
                const emailinput = loginModalWindow.element(by.name('emailAddress'));
                const passwordinput = loginModalWindow.element(by.name('password'));
                const loginbutton = loginModalWindow.element(by.buttonText('Login'));

                emailinput.sendKeys('nick@teamjs.xyz');
                passwordinput.sendKeys('nick');

                expect(emailinput.getAttribute('value')).toBe('nick@teamjs.xyz');
                loginbutton.click().then(function () {
                    browser.driver.sleep(2000);
                    expect(browser.getCurrentUrl()).toBe('http://localhost:4200/themes');
                });
            });
        });
    });
});

describe('Home page', function () {
    beforeAll(() => {
        browser.ignoreSynchronization = true;
        browser.get('/');

        const loginModalWindow = element(by.id('loginModal'));
        element.all(by.css('.intro-message login button')).then(function (items) {
            items[0].click().then(function () {
                browser.wait(ExpectedConditions.visibilityOf(loginModalWindow), 1000);
                const emailinput = loginModalWindow.element(by.name('emailAddress'));
                const passwordinput = loginModalWindow.element(by.name('password'));
                const loginbutton = loginModalWindow.element(by.buttonText('Login'));

                emailinput.sendKeys('nick@teamjs.xyz');
                passwordinput.sendKeys('nick');
                loginbutton.click().then(function () {
                    browser.driver.sleep(2000);
                    expect(browser.getCurrentUrl()).toBe('http://localhost:4200/themes');
                });
            });
        });
    });

    it('should contain all default elements', () => {
        element.all(by.css('h2')).then(function (items) {
            expect(items[0].getText()).toBe('My Themes:');
            expect(items[1].getText()).toBe('Participating sessions:');
            expect(items[2].getText()).toBe('Invited sessions:');
        });

        expect(element(by.buttonText('CREATE THEME'))).toBeDefined();
        expect(element(by.linkText('Logout'))).toBeDefined();
    });

    it('should create a new theme', () => {
        element(by.buttonText('CREATE THEME')).click().then(() => {
            expect(element(by.css('h2')).getText()).toBe('Theme:');

            const nameInput = element(by.id('title'));
            const descriptionInput = element(by.id('description'));
            const saveButton = element(by.id('save'));

            nameInput.sendKeys('This is a theme');
            descriptionInput.sendKeys('This is a theme description');

            expect(nameInput.getAttribute('value')).toBe('This is a theme');
            expect(descriptionInput.getAttribute('value')).toBe('This is a theme description');

            saveButton.click().then(() => {
                browser.driver.sleep(2000);
                expect(browser.getCurrentUrl()).toBe('http://localhost:4200/themes');
                element(by.id('themes')).all(by.css('div.panel.panel-default')).then((themes) => {
                    const bodyTheme = themes[themes.length - 1].element(by.css('.panel-body'));
                    expect(bodyTheme.element(by.css('h4')).getText()).toBe('This is a theme: This is a theme description');
                });
            });
        });
    });

    it('should see the info of the theme', () => {
        element(by.id('themes')).all(by.css('div.panel.panel-default')).then((themes) => {
            const bodyTheme = themes[themes.length - 1].element(by.css('.panel-body'));
            bodyTheme.all(by.css('.btn.btn-primary')).first().click().then(() => {
                browser.driver.sleep(2000);
                expect(element(by.css('h2')).getText()).toBe('Theme:');
                expect(element(by.id('title')).getAttribute('value')).toBe('This is a theme');
                expect(element(by.id('description')).getAttribute('value')).toBe('This is a theme description');
            });
        });
    });

    afterAll(() => {
        browser.get('/themes');
        element(by.id('themes')).all(by.css('div.panel.panel-default')).then((themes) => {
            const bodyTheme = themes[themes.length - 1].element(by.css('.panel-body'));
            bodyTheme.element(by.css('.btn.btn-danger')).click();
            browser.driver.sleep(2000);
        });

        /*Logout user*/
    });
});
