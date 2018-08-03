import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacydashboardComponent } from './pharmacydashboard.component';

describe('PharmacydashboardComponent', () => {
  let component: PharmacydashboardComponent;
  let fixture: ComponentFixture<PharmacydashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacydashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacydashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
