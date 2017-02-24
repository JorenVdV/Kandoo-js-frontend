import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from "@angular/router/testing";
import {ThemeComponent} from './theme.component';
import {ThemeListComponent} from "../theme-list/theme-list.component";
import {SessionComponent} from "../../session/session.component";
import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";



describe('ThemeComponent', () => {
    let component: ThemeComponent;
    let fixture: ComponentFixture<ThemeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ThemeComponent],
            imports: [
                RouterTestingModule.withRoutes([
                {path: '/themes', component: ThemeListComponent},
                {path: '/sessions', component: SessionComponent}
            ])],

        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThemeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
