import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {ThemeComponent} from './theme.component';
import {DebugElement} from "@angular/core";
import {ThemeService} from "./theme.service";

describe('ThemeComponent', () => {
  let comp:ThemeComponent;
  let fixture:ComponentFixture<ThemeComponent>;
  let de:DebugElement;
  let el:HTMLElement;

  let themeService:ThemeService;
  let themeServiceStub:MockThemeService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ThemeComponent
      ],
      providers: [
        {provide: ThemeService, useValue: themeServiceStub}
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ThemeComponent);
        comp = fixture.componentInstance;

        themeService = TestBed.get(ThemeService);
        themeServiceStub = new MockThemeService;
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

  it('should return json stringify', () => {
    themeServiceStub.name = 'bier';
    themeServiceStub.description = 'bier en zo';
    themeServiceStub.tags = 'test';
    themeServiceStub.publicAccess = false;

    expect(themeServiceStub.create()).toEqual(JSON.stringify({name: 'bier',description: 'bier en zo',tags: 'test',publicAccess: false}));
  })
});

class MockThemeService {
  public name: string = 'theme';
  public description: string = 'mock theme';
  public tags: string = 'test';
  public publicAccess: boolean = true;

  create() {
    return JSON.stringify({name: this.name, description: this.description, tags: this.tags, publicAccess: this.publicAccess})
  }
}
