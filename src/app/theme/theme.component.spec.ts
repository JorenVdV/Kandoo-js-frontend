import {TestBed, async, ComponentFixture, inject} from '@angular/core/testing';
import {ThemeComponent} from './theme.component';
import {DebugElement} from "@angular/core";
import {Router} from "@angular/router";
import {ThemeService} from "../services/theme.service";
import {ThemeServiceStub} from "../testing/theme.service.stub";
import {RouterStub} from "../testing/router.stub";

describe('ThemeComponent', () => {
  let comp: ThemeComponent;
  let fixture: ComponentFixture<ThemeComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  let themeServiceStub: ThemeServiceStub;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ThemeComponent
      ],
      providers: [
        {provide: ThemeService, useValue: themeServiceStub},
        {provide: Router, useClass: RouterStub}
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ThemeComponent);
        comp = fixture.componentInstance;

        themeServiceStub = new ThemeServiceStub;

        de = fixture.debugElement;
        el = de.nativeElement;
      });
  }));

  it('should equal to "Voeg een thema toe"', () => {
    expect(el.querySelector('h1').textContent).toEqual('Voeg een thema toe');
  });

  it('should contain name textbox', () => {
    expect(el.querySelector('#name')).not.toBeNull();
  });

  it('should contain description textbox', () => {
    expect(el.querySelector('#description')).not.toBeNull();
  });

  it('should contain tags textbox', () => {
    expect(el.querySelector('#tags')).not.toBeNull();
  });

  it('should contain public checkbox', () => {
    expect(el.querySelector('#public')).not.toBeNull();
  });

  it('should contain submit button', () => {
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

  it('should return json stringify', () => {
    expect(themeServiceStub.createTheme('bier', 'bier en zo', 'test', false)).toEqual(JSON.stringify({
      name: 'bier',
      description: 'bier en zo',
      tags: 'test',
      publicAccess: false
    }));
  });

  it('should return list of themes', () => {
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

  it('should remove theme id 15', () => {
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
