import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {ThemeComponent} from './theme.component';
import {DebugElement} from "@angular/core";

describe('ThemeComponent', () => {
  let comp: ThemeComponent;
  let fixture: ComponentFixture<ThemeComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ThemeComponent
      ],
    })

      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ThemeComponent);
        comp = fixture.componentInstance;

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
});
