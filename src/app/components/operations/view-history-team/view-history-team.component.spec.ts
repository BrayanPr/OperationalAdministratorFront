import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHistoryTeamComponent } from './view-history-team.component';

describe('ViewHistoryTeamComponent', () => {
  let component: ViewHistoryTeamComponent;
  let fixture: ComponentFixture<ViewHistoryTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewHistoryTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewHistoryTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
