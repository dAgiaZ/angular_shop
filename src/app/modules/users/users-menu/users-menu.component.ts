import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Authorization } from 'src/app/store/authorization.store';

@Component({
  selector: 'app-users-menu',
  templateUrl: './users-menu.component.html',
  styleUrls: ['./users-menu.component.css']
})
export class UsersMenuComponent implements OnInit {

  constructor(
    public authState: Authorization,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout(): void {
    this.authState.currentUser = null;
    this.router.navigate(['/']);
  }
}
