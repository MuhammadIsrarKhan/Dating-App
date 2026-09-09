import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { ToastService } from '../../core/services/toast-service';

@Component({
  imports: [FormsModule, RouterLink, RouterLinkActive],
  selector: 'app-nav',
  styleUrl: './nav.css',
  templateUrl: './nav.html',
})
export class Nav {
  protected accountService = inject(AccountService);
  protected creds: any = {};
  private router = inject(Router);
  private toast = inject(ToastService);

  login() {
    this.accountService.login(this.creds).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.router.navigate(['/members']); 
        this.creds = {};
        this.toast.success('Login successful! Welcome back.');
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.toast.error(error.error)

      }
    });
  }

  logout() {
    this.accountService.logout();
    console.log('User logged out');
    this.router.navigate(['/']);
  }

  register() {
    console.log('Register credentials:', this.creds);
    // Here you would typically call a service to handle the registration
  }
}
