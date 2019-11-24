import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoEmpresaComponent } from './reco-empresa.component';

describe('RecoEmpresaComponent', () => {
  let component: RecoEmpresaComponent;
  let fixture: ComponentFixture<RecoEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
