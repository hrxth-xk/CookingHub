import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
 
@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent {
  user: any;
  mobileMenuOpen = false;
 
  constructor(private auth: AuthService, private router: Router) {
    this.auth.currentUser.subscribe(u => this.user = u);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }
 
  logout() {
    this.closeMobileMenu();
    if (confirm('Are you sure you want to logout?')) {
      this.auth.logout();
      this.router.navigate(['/home']);
    }
  }
}
 