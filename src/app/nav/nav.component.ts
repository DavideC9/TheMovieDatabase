import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MovieApiServicesService } from '../service/movie-api-services.service';
import { Pdfdownload } from '../service/pdf-download.services';
import { HttpClient } from '@angular/common/http';



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

  constructor(private service : MovieApiServicesService,
    private http: HttpClient) {

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

      downloadPdf() {
        const pdfUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

        this.http.get(pdfUrl, { responseType: 'blob' }).subscribe((response) => {
          // Crea un oggetto Blob dal contenuto della risposta
          const blob = new Blob([response], { type: 'application/pdf' });

          // Crea un oggetto URL temporaneo per il blob
          const blobUrl = window.URL.createObjectURL(blob);

          // Crea un elemento <a> per il download del PDF
          const anchor = document.createElement('a');
          anchor.href = blobUrl;
          anchor.download = 'dummy.pdf'; // Nome del file
          anchor.click();

          // Rilascia la risorsa dell'URL temporaneo
          window.URL.revokeObjectURL(blobUrl);
        });
      }





}

