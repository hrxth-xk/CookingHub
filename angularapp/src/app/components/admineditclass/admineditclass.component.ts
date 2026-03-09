import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookingClass } from '../../models/cooking-class.model';
import { CookingClassService } from '../../services/cooking-class.service';

@Component({
  selector: 'app-admineditclass',
  templateUrl: './admineditclass.component.html',
  styleUrls: ['./admineditclass.component.css']
})
export class AdmineditclassComponent implements OnInit {
  classForm: FormGroup;
  error = '';
  private classId = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private classService: CookingClassService
  ) {
    this.classForm = this.fb.group({
      ClassName: ['', Validators.required],
      CuisineType: ['', Validators.required],
      ChefName: ['', Validators.required],
      Location: ['', Validators.required],
      DurationInHours: ['', [Validators.required, Validators.min(1)]],
      Fee: ['', [Validators.required, Validators.min(0)]],
      IngredientsProvided: ['', Validators.required],
      SkillLevel: ['', Validators.required],
      SpecialRequirements: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'Invalid class id';
      return;
    }

    this.classId = id;
    this.classService.getCookingClassById(this.classId).subscribe({
      next: (data) => this.classForm.patchValue(data),
      error: () => {
        this.error = 'Failed to load class details';
      }
    });
  }

  onSubmit(): void {
    if (!this.classId || this.classForm.invalid) {
      this.error = 'Please fill all required fields';
      return;
    }

    const payload = this.classForm.value as CookingClass;
    this.classService.updateCookingClass(this.classId, payload).subscribe({
      next: () => this.router.navigate(['/admin/view-class']),
      error: () => {
        this.error = 'Failed to update class';
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/admin/view-class']);
  }
}
