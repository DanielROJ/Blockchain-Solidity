import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoTrazoComponent } from './reco-trazo.component';

describe('RecoTrazoComponent', () => {
  let component: RecoTrazoComponent;
  let fixture: ComponentFixture<RecoTrazoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoTrazoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoTrazoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
