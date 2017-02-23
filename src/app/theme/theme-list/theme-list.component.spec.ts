import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ThemeListComponent} from './theme-list.component';
import {FormsModule} from "@angular/forms";
import {ThemeService} from "../../services/theme.service";
import {ThemeServiceStub} from "../../testing/theme.service.stub";

describe('ThemeListComponent', () => {
    let component: ThemeListComponent;
    let fixture: ComponentFixture<ThemeListComponent>;
    let themeServiceStub: ThemeServiceStub;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ThemeListComponent
            ],
            providers: [
                {provide: ThemeService, useValue: themeServiceStub}
            ],
            imports: [
                FormsModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThemeListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
