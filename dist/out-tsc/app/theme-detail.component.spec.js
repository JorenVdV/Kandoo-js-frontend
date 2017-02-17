import { async, TestBed } from "@angular/core/testing";
import { ThemeService } from "./theme.service";
import { ThemeServiceStub } from "./testing/service-stubs";
import { Router, ActivatedRoute } from "@angular/router";
import { ThemeDetailComponent } from "./theme-detail.component";
import { ActivatedRouteStub, RouterStub } from "./testing/router-stubs";
import { FormsModule } from "@angular/forms";
var activatedRoute;
var comp;
var fixture;
var page;
describe('ThemeDetailComponent', function () {
    var themeServiceStub;
    var expectedTheme;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [
                ThemeDetailComponent
            ],
            imports: [
                FormsModule
            ],
            providers: [
                { provide: ThemeService, useValue: themeServiceStub },
                { provide: ActivatedRoute, useValue: activatedRoute },
                { provide: Router, useClass: RouterStub }
            ]
        }).compileComponents()
            .then(function () {
            themeServiceStub = new ThemeServiceStub;
            expectedTheme = themeServiceStub.themes[0];
            activatedRoute = new ActivatedRouteStub();
            activatedRoute.testParams = { id: expectedTheme.id };
            //createComponent();
        });
    }));
    it('should return theme id 15', function () {
        expect(themeServiceStub.readTheme()).toEqual({
            "name": "test02",
            "description": "test",
            "tags": "test",
            "publicAccess": false,
            "id": 15
        });
    });
});
function createComponent() {
    fixture = TestBed.createComponent(ThemeDetailComponent);
    comp = fixture.componentInstance;
    page = new Page();
    fixture.detectChanges();
    return fixture.whenStable().then(function () {
        fixture.detectChanges();
        page.addPageElements();
    });
}
var Page = (function () {
    function Page() {
        var router = TestBed.get(Router);
        this.navSpy = spyOn(router, 'navigateTo');
    }
    Page.prototype.addPageElements = function () {
        if (comp.theme) {
            this.saveBtn = fixture.debugElement.nativeElement.querySelector('button');
            this.nameDisplay = fixture.debugElement.nativeElement.querySelector('h1');
            this.nameInput = fixture.debugElement.nativeElement.querySelector('#name');
            this.descriptionInput = fixture.debugElement.nativeElement.querySelector('#description');
            this.tagsInput = fixture.debugElement.nativeElement.querySelector('#tags');
            this.publicAccessInput = fixture.debugElement.nativeElement.querySelector('#public');
        }
    };
    return Page;
}());
//# sourceMappingURL=C:/Users/Koen/Documents/KdG_05/IP2/Kandoo-js-frontend/src/app/theme-detail.component.spec.js.map