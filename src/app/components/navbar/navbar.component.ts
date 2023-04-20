import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  menuItems = [
    { name: 'Home', link: '/'}
  ];
  
  constructor(private location:Location){
    console.log(localStorage.getItem("role"))
    if(localStorage.getItem("role") == "admin" || localStorage.getItem("role") == "super_admin"){
      this.menuItems.push({ name: 'Users', link: '/users'},
      { name: 'Teams', link: '/teams' },
      { name: 'Accounts', link: '/accounts' },
      { name: 'Operations', link: '/operations'})
    }
  }

  logout(){
    localStorage.removeItem('token')
    this.location.go("");
  }
}
