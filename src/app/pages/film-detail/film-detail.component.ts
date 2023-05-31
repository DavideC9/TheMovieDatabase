import { MovieApiServicesService } from 'src/app/service/movie-api-services.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css']
})
export class FilmDetailComponent implements OnInit{


  startRating= 0 ;

  constructor(private service: MovieApiServicesService, private router: ActivatedRoute){}
  getMovieDetailResult:any;
  getMovieVideoResult:any;
  getMovieCastResult: any;
  // getMovieRating: any;



  ngOnInit(): void {
    let getParamId = this.router.snapshot.paramMap.get('id');
    console.log(getParamId,'getparamid#')

    // this.getMovieRating(getParamId);
    this.getMovie(getParamId);
    this.getVideo(getParamId);
    this.getMovieCast(getParamId);

  }

  getMovie(id: any){
    this.service.getMovieDetails(id).subscribe((result)=>{
      console.log(result, 'getmoviedetails#');
      this.getMovieDetailResult = result;
    });
  }


  // getRating(id: any){
  //   this.service.getMovieRating(id).subscribe((result)=>{
  //     console.log(result, 'getmovieRating#');
  //     this.getMovieRating = result;
  //   });
  // }

  getVideo(id:any){
    this.service.getMovieVideo(id).subscribe((result)=>{
      console.log(result,'getMovieVideo#')
      result.results.forEach((element : any) => {
        if (element.type == "Trailer"){
          this.getMovieVideoResult = element.key;
        }

      });

    });
  }

  getMovieCast(id:any){
    this.service.getMovieCast(id).subscribe((result)=>{
      console.log(result,'movieCast#')
      this.getMovieCastResult = result.cast;

    });

  }

}
