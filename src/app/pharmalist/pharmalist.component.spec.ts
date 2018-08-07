import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmalistComponent } from './pharmalist.component';

describe('PharmalistComponent', () => {
  let component: PharmalistComponent;
  let fixture: ComponentFixture<PharmalistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmalistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmalistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
