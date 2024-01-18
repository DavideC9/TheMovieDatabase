import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertServiceService {
  showError(message: string) {
    alert(message);
  }

  constructor() { }
}
