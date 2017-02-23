import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeComponent } from './theme.component';
import {ThemeServiceStub} from "../../testing/theme.service.stub";
import {ThemeService} from "../../services/theme.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RouterStub, ActivatedRouteStub} from "../../testing/router.stub";

describe('ThemeComponent', () => {
  let component: ThemeComponent;
  let fixture: ComponentFixture<ThemeComponent>;
  let themeServiceStub: ThemeServiceStub;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
          ThemeComponent
      ],
      providers: [
        {provide: ThemeService, useValue: themeServiceStub},
        {provide: ActivatedRoute, useValue: activatedRoute},
        {provide: Router, useClass: RouterStub}
      ]
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
