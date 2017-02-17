import { TestBed, async } from '@angular/core/testing';
import { ThemeComponent } from './theme.component';
import { ThemeService } from "./theme.service";
import { Router } from "@angular/router";
import { RouterStub } from "./testing/router-stubs";
import { ThemeServiceStub } from "./testing/service-stubs";
describe('ThemeComponent', function () {
    var comp;
    var fixture;
    var de;
    var el;
    var themeServiceStub;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [
                ThemeComponent
            ],
            providers: [
                { provide: ThemeService, useValue: themeServiceStub },
                { provide: Router, useClass: RouterStub }
            ]
        }).compileComponents()
            .then(function () {
            fixture = TestBed.createComponent(ThemeComponent);
            comp = fixture.componentInstance;
            themeServiceStub = new ThemeServiceStub;
            de = fixture.debugElement;
            el = de.nativeElement;
        });
    }));
    it('should equal to "Voeg een thema toe"', function () {
        expect(el.querySelector('h1').textContent).toEqual('Voeg een thema toe');
    });
    it('should contain name textbox', function () {
        expect(el.querySelector('#name')).not.toBeNull();
    });
    it('should contain description textbox', function () {
        expect(el.querySelector('#description')).not.toBeNull();
    });
    it('should contain tags textbox', function () {
        expect(el.querySelector('#tags')).not.toBeNull();
    });
    it('should contain public checkbox', function () {
        expect(el.querySelector('#public')).not.toBeNull();
    });
    it('should contain submit button', function () {
        expect(el.querySelector('#submit')).not.toBeNull();
    });
    /*  it('should tell ROUTER to navigate when theme name clicked',
     inject([Router], (router: Router) => {
     const spy = spyOn(router, 'navigateTo');
     el.querySelector('li').click();
     const navArgs = spy.calls.first().args[0];
     const id =  comp.themes[0].id;
     expect(navArgs).toBe('/theme/' + id, 'should nav to ThemeDetail for first theme');
     }));*/
    it('should return json stringify', function () {
        expect(themeServiceStub.createTheme('bier', 'bier en zo', 'test', false)).toEqual(JSON.stringify({
            name: 'bier',
            description: 'bier en zo',
            tags: 'test',
            publicAccess: false
        }));
    });
    it('should return list of themes', function () {
        expect(themeServiceStub.readThemes()).toEqual([
            {
                "name": "test01",
                "description": "test",
                "tags": "test",
                "publicAccess": false,
                "id": 14
            },
            {
                "name": "test02",
                "description": "test",
                "tags": "test",
                "publicAccess": false,
                "id": 15
            },
            {
                "name": "test03",
                "description": "djsmfqjm",
                "tags": "mjm",
                "publicAccess": false,
                "id": 17
            }
        ]);
    });
    it('should remove theme id 15', function () {
        expect(themeServiceStub.deleteTheme()).toEqual([
            {
                "name": "test01",
                "description": "test",
                "tags": "test",
                "publicAccess": false,
                "id": 14
            },
            {
                "name": "test03",
                "description": "djsmfqjm",
                "tags": "mjm",
                "publicAccess": false,
                "id": 17
            }
        ]);
    });
});
//# sourceMappingURL=C:/Users/Koen/Documents/KdG_05/IP2/Kandoo-js-frontend/src/app/theme.component.spec.js.map