import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {ThemeListComponent} from './theme-list.component';
import {DebugElement} from "@angular/core";
import {Router} from "@angular/router";
import {ThemeService} from "../../services/theme.service";
import {ThemeServiceStub} from "../../testing/theme.service.stub";
import {RouterStub} from "../../testing/router.stub";
import {NavbarComponent} from "../../navbar/navbar.component";
import {LoginComponent} from "../../login/login.component";
import {Ng2Bs3ModalModule} from "ng2-bs3-modal/ng2-bs3-modal";
import {FormsModule} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {Http, ConnectionBackend, RequestOptions} from "@angular/http";

describe('ThemeListComponent', () => {
    let comp: ThemeListComponent;
    let fixture: ComponentFixture<ThemeListComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    let themeServiceStub: ThemeServiceStub;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ThemeListComponent, NavbarComponent, LoginComponent],
            imports: [Ng2Bs3ModalModule, FormsModule],
            providers: [
                {provide: ThemeService, useValue: themeServiceStub},
                {provide: Router, useClass: RouterStub},
                AuthenticationService,
                Http,
                ConnectionBackend,
                RequestOptions
            ]
        }).compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(ThemeListComponent);
                comp = fixture.componentInstance;
                themeServiceStub = new ThemeServiceStub();
                de = fixture.debugElement;
                el = de.nativeElement;
            });
    }));

/*    it('should contain container element', () => {
        expect(el.querySelector('.container')).toBeTruthy();
    });

    it('should contain h2', () => {
        expect(el.querySelector('h2')).toBeTruthy();
    });

    it('should contain create button', () => {
        expect(el.querySelector('#create-btn')).toBeTruthy();
    });

    it('should contain row element', () => {
        expect(el.querySelector('.row')).toBeTruthy();
    });

    it('should contain hr', () => {
        expect(el.querySelector('hr')).toBeTruthy();
    });

    it('should contain col element', () => {
        expect(el.querySelector('.col-md-10')).toBeTruthy();
    });

    it('should return list of themes', () => {
        expect(themeServiceStub.readThemes()).toEqual([
            {"_id": "1", "title": "test01", "description": "test", "tags": "test", "publicAccess": false},
            {"_id": "2", "title": "test02", "description": "test", "tags": "test", "publicAccess": false}
        ]);
    });

    it('should return list of themes with new theme', () => {
        expect(themeServiceStub.createTheme('test03', 'test', 'test', false)).toEqual([
            {"_id": "1", "title": "test01", "description": "test", "tags": "test", "publicAccess": false},
            {"_id": "2", "title": "test02", "description": "test", "tags": "test", "publicAccess": false},
            {"_id": "3", "title": "test03", "description": "test", "tags": "test", "publicAccess": false}
        ]);
    });

    it('should return list of themes without theme (themeId: 2)', () => {
        expect(themeServiceStub.deleteTheme()).toEqual([
            {"_id": "1", "title": "test01", "description": "test", "tags": "test", "publicAccess": false}
        ]);
    });*/
});
