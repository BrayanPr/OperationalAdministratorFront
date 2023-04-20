import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHistoryUserComponent } from './view-history-user.component';

describe('ViewHistoryUserComponent', () => {
  let component: ViewHistoryUserComponent;
  let fixture: ComponentFixture<ViewHistoryUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewHistoryUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewHistoryUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
