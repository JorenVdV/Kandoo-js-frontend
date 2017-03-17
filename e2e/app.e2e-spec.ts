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
                browser.wait(ExpectedConditions.visibilityOf(element(by.id('loginModal'))), 1000);
            });
        });
    });

    it('should display the register modal window', () => {
        element.all(by.css('.intro-message login button')).then(function (items) {
            expect(items[1].getText()).toBe('REGISTER');
            items[1].click().then(function () {
                browser.wait(ExpectedConditions.visibilityOf(element(by.id('registerModal'))), 1000);
            });
        });
    });

    it('should login the user', () => {
        const loginModalWindow = element(by.id('loginModal'));
        element.all(by.css('.intro-message login button')).then(function (items) {
            expect(items[0].getText()).toBe('LOGIN');
            items[0].click().then(function () {
                browser.wait(ExpectedConditions.visibilityOf(loginModalWindow), 1000);
                const emailinput = loginModalWindow.element(by.name('emailAddress'));
                const passwordinput = loginModalWindow.element(by.name('password'));
                const loginbutton = loginModalWindow.element(by.buttonText('Login'));

                emailinput.sendKeys('sander@teamjs.xyz');
                passwordinput.sendKeys('sander');

                expect(emailinput.getAttribute('value')).toBe('sander@teamjs.xyz');
                loginbutton.click().then(function () {
                    browser.driver.sleep(1000);
                    // browser.waitForAngular();
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

                emailinput.sendKeys('sander@teamjs.xyz');
                passwordinput.sendKeys('sander');
                loginbutton.click().then(function () {
                    browser.driver.sleep(1000);
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
            // const tagsInput = element(by.id('tags'));

            nameInput.sendKeys('This is a theme');
            descriptionInput.sendKeys('This is a theme description');
            // tagsInput.sendKeys('tag1');
            // tagsInput.sendKeys(protractor.Key.ENTER);

            expect(nameInput.getAttribute('value')).toBe('This is a theme');
            expect(descriptionInput.getAttribute('value')).toBe('This is a theme description');
            // console.log(tagsInput.getAttribute('value'));
            // expect(tagsInput.getAttribute('value')).toBe('tag1');


        });

    });

    afterAll(() => {


        /*Logout user*/
    });
});
