import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFilmComponent } from './search-film.component';

describe('ListFilmComponent', () => {
  let component: SearchFilmComponent;
  let fixture: ComponentFixture<SearchFilmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchFilmComponent]
    });
    fixture = TestBed.createComponent(SearchFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
