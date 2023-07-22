import { MovieApiServicesService } from './../../service/movie-api-services.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Title,Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-list-film',
  templateUrl: './list-film.component.html',
  styleUrls: ['./list-film.component.css']
})
export class ListFilmComponent implements OnInit {
  searchterm: string= '';
  results: any[] = [];

  constructor(private service : MovieApiServicesService, private title : Title, private meta:Meta) {
    this.title.setTitle('Search movies - showtime');
    this.meta.updateTag({name:'description',content:'search here movies like avatar,war etc'});
   }

  ngOnInit(): void {
  }

  searchResult:any;
  searchForm = new FormGroup({
    'movieName': new FormControl(null)
  });

  submitForm()
  {
      console.log(this.searchForm.value,'searchform#');
      this.service.getSearchMovie(this.searchForm.value).subscribe((result)=>{
          console.log(result,'searchmovie##');
          this.searchResult = result.results;
      });
  }
}

  // // nella funzione searchMovies() chiamo il metodo getSearchMovie dal
  // // serivice passando i termini di ricerca inseriti dall'utente
  // in subscrive() assegniamo i risultati della rica alla variabile result



