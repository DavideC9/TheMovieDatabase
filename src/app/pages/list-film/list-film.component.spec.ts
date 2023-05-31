import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFilmComponent } from './list-film.component';

describe('ListFilmComponent', () => {
  let component: ListFilmComponent;
  let fixture: ComponentFixture<ListFilmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListFilmComponent]
    });
    fixture = TestBed.createComponent(ListFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
