import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoDonantesComponent } from './reco-donantes.component';

describe('RecoDonantesComponent', () => {
  let component: RecoDonantesComponent;
  let fixture: ComponentFixture<RecoDonantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoDonantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoDonantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
