import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoUnidadComponent } from './reco-unidad.component';

describe('RecoUnidadComponent', () => {
  let component: RecoUnidadComponent;
  let fixture: ComponentFixture<RecoUnidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoUnidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoUnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
