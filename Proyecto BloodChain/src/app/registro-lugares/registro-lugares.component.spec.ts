import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroLugaresComponent } from './registro-lugares.component';

describe('RegistroLugaresComponent', () => {
  let component: RegistroLugaresComponent;
  let fixture: ComponentFixture<RegistroLugaresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroLugaresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroLugaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
