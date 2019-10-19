import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstacionGasComponent } from './estacion-gas.component';

describe('EstacionGasComponent', () => {
  let component: EstacionGasComponent;
  let fixture: ComponentFixture<EstacionGasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstacionGasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstacionGasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
