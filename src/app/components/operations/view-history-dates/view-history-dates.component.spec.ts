import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHistoryDatesComponent } from './view-history-dates.component';

describe('ViewHistoryDatesComponent', () => {
  let component: ViewHistoryDatesComponent;
  let fixture: ComponentFixture<ViewHistoryDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewHistoryDatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewHistoryDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
