// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { CookingClassService } from '../../services/cooking-class.service';
// import { AuthService } from '../../services/auth.service';
// import { CookingClassRequest } from '../../models/cooking-class-request.model';
 
// @Component({
//   templateUrl: './useraddrequest.component.html'
// })
// export class UseraddrequestComponent implements OnInit {
//   requestForm: FormGroup;
//   classId: number;
//   userId: number = 0;
//   appliedClassIds: number[] = [];
 
//   constructor(
//     private fb: FormBuilder,
//     private route: ActivatedRoute,
//     private router: Router,
//     private classService: CookingClassService,
//     private auth: AuthService
//   ) {
//     this.classId = +this.route.snapshot.paramMap.get('classId')!;
//     this.requestForm = this.fb.group({
//       DietaryPreferences: ['', Validators.required],
//       CookingGoals: ['', Validators.required],
//       Comments: ['']
//     });
//   }
 
//   ngOnInit(): void {
//     const currentUser = this.auth.currentUserValue;
//     console.log('Full currentUser object:', JSON.stringify(currentUser));
//     if (currentUser) {
//       this.userId = currentUser.id;
//       console.log('userId being used:', this.userId);
//     }
//   }

//   onSubmit() {
//     if (this.requestForm.invalid || this.userId === 0) return;
  
//     // Debug: verify values before sending
//     console.log('userId:', this.userId, 'type:', typeof this.userId);
//     console.log('classId:', this.classId, 'type:', typeof this.classId);
  
//     const payload = {
//       userId: parseInt(this.userId.toString(), 10),
//       cookingClassId: parseInt(this.classId.toString(), 10),
//       requestDate: new Date().toISOString(),
//       status: 'Pending',
//       dietaryPreferences: this.requestForm.get('DietaryPreferences')?.value,
//       cookingGoals: this.requestForm.get('CookingGoals')?.value,
//       comments: this.requestForm.get('Comments')?.value || ""
//     };
  
//     // Debug: see exactly what's being sent
//     console.log('Payload:', JSON.stringify(payload));
  
//     this.classService.addCookingClassRequest(payload as any).subscribe({
//       next: () => {
//         alert('Successfully Submitted!');
//         this.router.navigate(['/user/my-requests']);
//       },
//       error: (err) => {
//         console.error('Submission Error:', err.error);
//         alert('Failed to submit request.');
//       }
//     });
//   }
// }



import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookingClassService } from '../../services/cooking-class.service';
import { AuthService } from '../../services/auth.service';
import { CookingClassRequest } from '../../models/cooking-class-request.model';

@Component({
  templateUrl: './useraddrequest.component.html',
  styleUrls: ['./useraddrequest.component.css']
})
export class UseraddrequestComponent implements OnInit {
  requestForm: FormGroup;
  classId: number;
  userId: number = 0;
  appliedClassIds: number[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private classService: CookingClassService,
    private auth: AuthService
  ) {
    this.classId = +this.route.snapshot.paramMap.get('classId')!;
    this.requestForm = this.fb.group({
      DietaryPreferences: ['', Validators.required],
      CookingGoals: ['', Validators.required],
      Comments: ['']
    });
  }

  ngOnInit(): void {
    const currentUser = this.auth.currentUserValue;
    if (currentUser && currentUser.id) {
      const parsed = Number(currentUser.id);
      this.userId = isNaN(parsed) || parsed === 0 ? 0 : parsed;
    }
    console.log('[UseraddrequestComponent] userId resolved to:', this.userId);
  }

  onSubmit() {
    if (this.requestForm.invalid) return;
    if (this.userId === 0) {
      alert('User ID not found. Please log out and log back in.');
      return;
    }

    const payload = {
      userId: parseInt(this.userId.toString(), 10),
      cookingClassId: parseInt(this.classId.toString(), 10),
      requestDate: new Date().toISOString(),
      status: 'Pending',
      dietaryPreferences: this.requestForm.get('DietaryPreferences')?.value,
      cookingGoals: this.requestForm.get('CookingGoals')?.value,
      comments: this.requestForm.get('Comments')?.value || ""
    };

    this.classService.addCookingClassRequest(payload as any).subscribe({
      next: () => {
        alert('Successfully Submitted!');
        this.router.navigate(['/user/my-requests']);
      },
      error: () => {
        alert('Failed to submit request.');
      }
    });
  }
}