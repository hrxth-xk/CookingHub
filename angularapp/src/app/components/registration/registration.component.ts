import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
 
@Component({
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registerForm: FormGroup;
  error = '';
 
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      Username: ['', Validators.required],
      MobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      UserRole: ['User', Validators.required]  // default User
    });
  }
 
  onSubmit() {
    if (this.registerForm.invalid) return;

    const password = this.registerForm.get('Password')?.value;
    const confirmPassword = this.registerForm.get('ConfirmPassword')?.value;
    if (password !== confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }

    const payload = {
      Email: this.registerForm.get('Email')?.value,
      Password: password,
      Username: this.registerForm.get('Username')?.value,
      MobileNumber: this.registerForm.get('MobileNumber')?.value,
      UserRole: this.registerForm.get('UserRole')?.value
    };

    this.auth.register(payload).subscribe({
      next: () => {
        alert('Registration successful! Please login.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        if (err.status === 409) {
          this.error = 'User already exists';
        } else {
          this.error = 'Registration failed. Try again.';
        }
      }
    });
  }
}