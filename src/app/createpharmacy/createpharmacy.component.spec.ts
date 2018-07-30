import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatepharmacyComponent } from './createpharmacy.component';

describe('CreatepharmacyComponent', () => {
  let component: CreatepharmacyComponent;
  let fixture: ComponentFixture<CreatepharmacyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatepharmacyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatepharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
