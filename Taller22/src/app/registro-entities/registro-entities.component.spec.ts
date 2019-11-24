import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEntitiesComponent } from './registro-entities.component';

describe('RegistroEntitiesComponent', () => {
  let component: RegistroEntitiesComponent;
  let fixture: ComponentFixture<RegistroEntitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroEntitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroEntitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
