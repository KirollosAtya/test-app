import { Component } from '@angular/core';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-list',
  imports: [CommonModule  ],
  standalone:true,
  templateUrl: './category-list.html',
  styleUrls: ['./category-list.scss']
})
export class CategoryList {
 categories: Category[] = [];

  constructor(private categoryService: CategoryService, public router: Router) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAll().subscribe(res => {
      console.log(res)
      this.categories = res;
    });
  }

  edit(id: number) {
    this.router.navigate(['/categories/edit', id]);
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.delete(id).subscribe(() => this.loadCategories());
    }
  }
}
