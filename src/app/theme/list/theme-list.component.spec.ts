import {TestBed, async, ComponentFixture, inject} from '@angular/core/testing';
import {ThemeListComponent} from './theme-list.component';
import {DebugElement} from "@angular/core";
import {Router} from "@angular/router";
import {ThemeService} from "../../services/theme.service";
import {ThemeServiceStub} from "../../testing/theme.service.stub";
import {RouterStub} from "../../testing/router.stub";

describe('ThemeListComponent', () => {
    let comp: ThemeListComponent;
    let fixture: ComponentFixture<ThemeListComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    let themeServiceStub: ThemeServiceStub;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ThemeListComponent
            ],
            providers: [
                {provide: ThemeService, useValue: themeServiceStub},
                {provide: Router, useClass: RouterStub}
            ]
        }).compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(ThemeListComponent);
                comp = fixture.componentInstance;

                themeServiceStub = new ThemeServiceStub;

                de = fixture.debugElement;
                el = de.nativeElement;
            });
    }));

    /*  it('should tell ROUTER to navigate when theme title clicked',
     inject([Router], (router: Router) => {
     const spy = spyOn(router, 'navigateTo');
     el.querySelector('li').click();
     const navArgs = spy.calls.first().args[0];
     const _id =  comp.themes[0]._id;
     expect(navArgs).toBe('/theme/' + _id, 'should nav to ThemeDetail for first theme');
     }));*/

    /*it('should return json stringify', () => {
     expect(themeServiceStub.createTheme('bier', 'bier en zo', 'test', false)).toEqual(JSON.stringify({
     title: 'bier',
     description: 'bier en zo',
     tags: 'test',
     publicAccess: false
     }));
     });

     it('should return list of themes', () => {
     expect(themeServiceStub.readThemes()).toEqual([
     {
     "title": "test01",
     "description": "test",
     "tags": "test",
     "publicAccess": false,
     "_id": 14
     },
     {
     "title": "test02",
     "description": "test",
     "tags": "test",
     "publicAccess": false,
     "_id": 15
     },
     {
     "title": "test03",
     "description": "djsmfqjm",
     "tags": "mjm",
     "publicAccess": false,
     "_id": 17
     }
     ]);
     });

     it('should remove theme _id 15', () => {
     expect(themeServiceStub.deleteTheme()).toEqual([
     {
     "title": "test01",
     "description": "test",
     "tags": "test",
     "publicAccess": false,
     "_id": 14
     },
     {
     "title": "test03",
     "description": "djsmfqjm",
     "tags": "mjm",
     "publicAccess": false,
     "_id": 17
     }
     ]);
     });*/
});
