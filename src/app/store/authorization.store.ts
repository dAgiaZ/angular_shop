import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class Authorization {
  private readonly _currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  readonly currentUser$ = this._currentUser.asObservable();
  private readonly _isAdmin: any = new BehaviorSubject<boolean>(false);
  readonly isAdmin$ = this._isAdmin.asObservable();

  constructor(){
    this.currentUser$.subscribe( (user: User) => {
      this._isAdmin.next(user && user.role === 'ADMIN');
    });
  }

  public get currentUser(): User {
    return this._currentUser.getValue();
  }

  public set currentUser(val: User) {
    this._currentUser.next(val);
  }

  public get isAdmin(): boolean {
    return this._isAdmin.value();
  }
}