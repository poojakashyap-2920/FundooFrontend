import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesLeftsideComponent } from './notes-leftside.component';

describe('NotesLeftsideComponent', () => {
  let component: NotesLeftsideComponent;
  let fixture: ComponentFixture<NotesLeftsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotesLeftsideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesLeftsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
