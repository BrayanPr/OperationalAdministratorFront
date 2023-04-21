import { Component, Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'administracion_de_opreacion';
  is_loged_in= localStorage.getItem('token') ? true : false;
  master_url = "https://localhost:51553/api/"
}
