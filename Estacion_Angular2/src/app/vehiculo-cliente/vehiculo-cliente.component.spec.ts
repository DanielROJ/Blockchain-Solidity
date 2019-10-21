import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculoClienteComponent } from './vehiculo-cliente.component';

describe('VehiculoClienteComponent', () => {
  let component: VehiculoClienteComponent;
  let fixture: ComponentFixture<VehiculoClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiculoClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
