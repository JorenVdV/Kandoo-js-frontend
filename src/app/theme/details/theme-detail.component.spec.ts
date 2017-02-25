import {ComponentFixture, async, TestBed} from "@angular/core/testing";
import {DebugElement} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {ThemeDetailComponent} from "./theme-detail.component";
import {FormsModule} from "@angular/forms";
import {ActivatedRouteStub, RouterStub} from "../../testing/router.stub";
import {ThemeServiceStub} from "../../testing/theme.service.stub";
import {Theme} from "../../models/theme";
import {ThemeService} from "../../services/theme.service";

let activatedRoute: ActivatedRouteStub;
let comp: ThemeDetailComponent;
let fixture: ComponentFixture<ThemeDetailComponent>;
let page: Page;

describe('ThemeDetailComponent', () => {
  let themeServiceStub: ThemeServiceStub;
  let expectedTheme: Theme;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ThemeDetailComponent
      ],
      imports: [
        FormsModule
      ],
      providers: [
        {provide: ThemeService, useValue: themeServiceStub},
        {provide: ActivatedRoute, useValue: activatedRoute},
        {provide: Router, useClass: RouterStub}
      ]
    }).compileComponents()
      .then(() => {
        themeServiceStub = new ThemeServiceStub;
        expectedTheme = themeServiceStub.themes[0];

        activatedRoute = new ActivatedRouteStub();
        activatedRoute.testParams = {id: expectedTheme._id};
        //createComponent();
      });
  }));

  /*it('should return theme _id 15', () => {
    expect(themeServiceStub.readTheme()).toEqual({
      "name": "test02",
      "description": "test",
      "tags": "test",
      "publicAccess": false,
      "_id": 15
    });
  });*/
});

function createComponent() {
  fixture = TestBed.createComponent(ThemeDetailComponent);
  comp = fixture.componentInstance;
  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    fixture.detectChanges();
    page.addPageElements();
  })
}

class Page {
  navSpy: jasmine.Spy;

  saveBtn: DebugElement;
  nameDisplay: HTMLElement;
  nameInput: HTMLInputElement;
  descriptionInput: HTMLInputElement;
  tagsInput: HTMLInputElement;
  publicAccessInput: HTMLInputElement;

  constructor() {
    const router = TestBed.get(Router);
    this.navSpy = spyOn(router, 'navigateTo');
  }

  addPageElements() {
    if (comp.theme) {
      this.saveBtn = fixture.debugElement.nativeElement.querySelector('button');
      this.nameDisplay = fixture.debugElement.nativeElement.querySelector('h1');
      this.nameInput = fixture.debugElement.nativeElement.querySelector('#name');
      this.descriptionInput = fixture.debugElement.nativeElement.querySelector('#description');
      this.tagsInput = fixture.debugElement.nativeElement.querySelector('#tags');
      this.publicAccessInput = fixture.debugElement.nativeElement.querySelector('#public');
    }
  }
}
