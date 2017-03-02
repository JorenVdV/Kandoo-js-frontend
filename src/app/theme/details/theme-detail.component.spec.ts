import {ComponentFixture, async, TestBed, fakeAsync} from "@angular/core/testing";
import {DebugElement} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {ThemeDetailComponent} from "./theme-detail.component";
import {FormsModule} from "@angular/forms";
import {ActivatedRouteStub, RouterStub} from "../../testing/router.stub";
import {ThemeServiceStub} from "../../testing/theme.service.stub";
import {Theme} from "../../models/theme";
import {ThemeService} from "../../services/theme.service";
import {TagInputModule} from 'ng2-tag-input';
import {NavbarComponent} from "../../navbar/navbar.component";

describe('ThemeDetailComponent', () => {
    let activatedRoute: ActivatedRouteStub;
    let comp: ThemeDetailComponent;
    let fixture: ComponentFixture<ThemeDetailComponent>;
    let page: Page;
    let themeServiceStub: ThemeServiceStub;
    let expectedTheme: Theme;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ThemeDetailComponent, NavbarComponent],
            imports: [FormsModule, TagInputModule],
            providers: [
                {provide: ThemeService, useValue: themeServiceStub},
                {provide: ActivatedRoute, useValue: activatedRoute},
                {provide: Router, useClass: RouterStub}
            ]
        }).compileComponents()
            .then(() => {
                themeServiceStub = new ThemeServiceStub();
                activatedRoute = new ActivatedRouteStub();
            });
    }));

    // it('should display first theme', fakeAsync(() => {
    //     expectedTheme = themeServiceStub.themes[0];
    //     activatedRoute.testParams = {_id: expectedTheme._id};
    //     createComponent().then(() => {
    //         expect(page.titleInput.textContent).toBe(expectedTheme.title);
    //     });
    // }));

/*    it('should return theme with id 2', () => {
        expect(themeServiceStub.readTheme()).toEqual({
            "_id": "2", "title": "test02", "description": "test", "tags": "test", "publicAccess": false
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
    titleInput: HTMLInputElement;
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
            this.titleInput = fixture.debugElement.nativeElement.querySelector('#title');
            this.descriptionInput = fixture.debugElement.nativeElement.querySelector('#description');
            this.tagsInput = fixture.debugElement.nativeElement.querySelector('#tags');
            this.publicAccessInput = fixture.debugElement.nativeElement.querySelector('#public');
        }
    }
}
