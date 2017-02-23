import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeListComponent } from './theme-list.component';
import {RouterTestingModule} from "@angular/router/testing";
import {SessionComponent} from "../../session/session.component";
import {ThemeComponent} from "../details/theme.component";

describe('ThemeListComponent', () => {
  let component: ThemeListComponent;
  let fixture: ComponentFixture<ThemeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeListComponent ],
      imports: [
        RouterTestingModule.withRoutes([
          {path: '/themes', component: ThemeListComponent},
          {path: '/theme', component: ThemeComponent},
          {path: '/sessions', component: SessionComponent}
        ])]
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
