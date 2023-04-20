import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveUserComponent } from './move-user.component';

describe('MoveUserComponent', () => {
  let component: MoveUserComponent;
  let fixture: ComponentFixture<MoveUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoveUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoveUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
