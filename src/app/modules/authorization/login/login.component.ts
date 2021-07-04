import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ToastService } from 'src/app/services/toasts/toasts.service';
import { Authorization } from 'src/app/store/authorization.store';
import { User as UserModel} from '../../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  adminUsers: UserModel[] = [];
  users: UserModel[] = [];
  usersSubscriber: any

  constructor(
    private authService: AuthorizationService,
    private authState: Authorization,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit() {
    this.usersSubscriber = this.authService.getUsers().subscribe( (users: UserModel[]) => {
      users.map( (user: UserModel) => {
        if (user.role === 'ADMIN') {
          this.adminUsers.push(user);
        } else {
          this.users.push(user);
        }
      });
    });
  }

  login(userRole: string, userId: number) {
    let currentUser: UserModel;
    if (userRole === 'ADMIN') {
      currentUser = this.authService.login(this.adminUsers, userId);
    } else {
      currentUser = this.authService.login(this.users, userId);
    }
    if (currentUser) {
      this.authState.currentUser = currentUser;
      this.router.navigate(['/']);
    } else {
      this.toastService.showError('Incorrect username or password.', { delay: 5000 });
    }
  }

  ngOnDestroy() {
    this.usersSubscriber.unsubscribe();
  }

}
