import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MovieApiServicesService } from '../service/movie-api-services.service';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  // searchterm: string= '';
  // results: any[] = [];

  collapsed = true;




  @Output() onNewUser = new EventEmitter() //sarà una variabile di output

  constructor(private service : MovieApiServicesService) {

   }
  ngOnInit() {
      }


      newUser() {
        this.onNewUser.emit();
      }

      // search() {
      //   this.MovieApi.getSearchMovie(this.searchterm)
      //     .subscribe(data => {
      //       this.results = data.results;
      //     });
      // }

      menuOpened: any;

      openMenu(menu: string) {
        this.menuOpened = menu;
      }

      closeMenu() {
        this.menuOpened = null;
      }






}

