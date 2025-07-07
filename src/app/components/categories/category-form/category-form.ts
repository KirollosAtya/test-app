import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../services/category-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-form',
  imports: [CommonModule,ReactiveFormsModule ],
  templateUrl: './category-form.html',
  styleUrl: './category-form.scss'
})
export class CategoryForm {
form!: FormGroup;
  isEdit = false;
  id!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: CategoryService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      description: [''],
      imageUrl: [''],
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.id = +id;
        this.service.getById(this.id).subscribe(cat => this.form.patchValue(cat));
      }
    });
  }

  save() {
    if (this.form.invalid) return;

    const data = this.form.value;

    if (this.isEdit) {
      this.service.update(this.id, data).subscribe(() => this.router.navigate(['/categories']));
    } else {
      this.service.create(data).subscribe(() => this.router.navigate(['/categories']));
    }
  }
}
