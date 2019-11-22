import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoEmpleadosComponent } from './reco-empleados.component';

describe('RecoEmpleadosComponent', () => {
  let component: RecoEmpleadosComponent;
  let fixture: ComponentFixture<RecoEmpleadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoEmpleadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
