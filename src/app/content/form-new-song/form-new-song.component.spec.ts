import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNewSongComponent } from './form-new-song.component';

describe('FormNewSongComponent', () => {
  let component: FormNewSongComponent;
  let fixture: ComponentFixture<FormNewSongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormNewSongComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNewSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
