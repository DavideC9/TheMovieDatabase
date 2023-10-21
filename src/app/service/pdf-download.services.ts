import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class Pdfdownload{
  constructor(private http: HttpClient) {}

  downloadPdf(): Observable<Blob> {
    const pdfUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

    return this.http.get(pdfUrl, { responseType: 'blob' });
  }
}
