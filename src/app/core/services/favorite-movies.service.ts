import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteMoviesService {

  private favoritesKey = 'favoriteMovies'; // Chiave per salvare i film preferiti

  constructor() {}

  public addFavoriteMovie(movieId: number) {
    const favorites = this.getFavoriteMovies() || [];
    if (!favorites.includes(movieId)) {
      favorites.push(movieId);
      localStorage.setItem(this.favoritesKey, JSON.stringify(favorites));
    }
  }

  public removeFavoriteMovie(movieId: number) {
    const favorites = this.getFavoriteMovies() || [];
    const index = favorites.indexOf(movieId);
    if (index !== -1) {
      favorites.splice(index, 1);
      localStorage.setItem(this.favoritesKey, JSON.stringify(favorites));
    }
  }

  public getFavoriteMovies(): number[] | null {
    const favorites = localStorage.getItem(this.favoritesKey);
    console.log('favoriti', favorites);
    return favorites ? JSON.parse(favorites) : null;
  }

  public isMovieFavorite(movieId: number): boolean {
    const favorites = this.getFavoriteMovies() || [];
    return favorites.includes(movieId);
  }

}
