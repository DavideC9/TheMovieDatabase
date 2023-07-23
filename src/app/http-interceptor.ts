// import { AlertServiceService } from './service/alert-service.service';
// import { Injectable } from '@angular/core';
// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS, HttpResponse } from '@angular/common/http';
// import { Observable, of, throwError } from 'rxjs';
// import { catchError, map, take, tap } from 'rxjs/operators';



//   @Injectable()
//   export class HttpInterceptorComponent implements HttpInterceptor {
//     constructor(private alertService: AlertServiceService) {}

//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//       return next.handle(request).pipe(
//         tap(event => {
//           if (event instanceof HttpResponse) {
//             // Perform any side effects here for successful responses
//             console.log('Interceptor - Response:', event);
//           }
//         }),
//         map(event => {
//           if (event instanceof HttpResponse) {
//             return event.clone({
//               body: this.modifyResponseData(event.body),
//             });
//           }
//           return event;
//         }),
//         take(1), // Take only the first emitted value
//         catchError(error => {
//           this.alertService.showError('An error occurred while making the API request.');
//           return throwError(error);
//         })
//       );
//     }

//     private modifyResponseData(data: any): any {
//       return of(data).pipe(
//         tap(response => {
//           // Perform any side effects here
//           console.log('Original Response:', response);
//         }),
//         map(response => {
//           if (response && response.results) {
//             response.results = response.results.map( (result:any) => {
//               // Modify the result data here
//               result.name = result.name.toUpperCase(); // Modify the 'name' property to uppercase
//               return result;
//             });
//           }
//           return response;
//         }),
//         take(1), // Take only the first emitted value
//         tap(modifiedResponse => {
//           // Perform any side effects on the modified response here
//           console.log('Modified Response:', modifiedResponse);
//         }),
//         catchError(error => {
//           // Handle any errors here
//           console.error('An error occurred while modifying the response:', error);
//           return throwError(error);
//         })
//       ).toPromise();
//     }
//   }
