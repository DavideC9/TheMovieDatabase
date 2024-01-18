import {Component, OnInit} from '@angular/core';
import {FacadeService} from "../facade-service/facade.service";

@Component({
    selector: 'app-favorite-movies',
    templateUrl: './favorite-movies.component.html',
    styleUrls: ['./favorite-movies.component.css']
})
export class FavoriteMoviesComponent implements OnInit {
    public favoriteMovies: any[] = [];

    constructor(private pagesFacade: FacadeService) {
    }

    ngOnInit(): void {
        this.loadFavoriteMovies();
    }

    public loadFavoriteMovies() {
        this.favoriteMovies = this.pagesFacade.getFavoriteMovies() || [];
    }

    public removeFromFavorites(movie: any): void {
        const index = this.favoriteMovies.findIndex((favMovie) => favMovie.id === movie.id);

        if (index !== -1) {
            this.favoriteMovies.splice(index, 1);

            const favoriteMoviesFromLocalStorage = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');
            const updatedFavorites = favoriteMoviesFromLocalStorage.filter((fav: any) => fav.id !== movie.id);
            localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
        }
    }
}
