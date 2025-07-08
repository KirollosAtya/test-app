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
  totalCount = 0;

  page = 1;
  size = 5;
  search = '';
  sortBy = 'id';
  isDescending = false;
  constructor(private categoryService: CategoryService, public router: Router) {}

  ngOnInit(): void {
    this.loadCategories();
  }

   loadCategories() {
    this.categoryService
      .getPaginated(this.page, this.size, this.search, this.sortBy, this.isDescending)
      .subscribe((res) => {
         console.log(res.collections);
        this.categories = res.collections;
        this.totalCount = res.totalCount;
      });
     
  }
  onSearchChange(event: any) {
    this.search = event.target.value;
    this.page = 1;
    this.loadCategories();
  }
    changeSort(field: string) {
    if (this.sortBy === field) this.isDescending = !this.isDescending;
    else {
      this.sortBy = field;
      this.isDescending = false;
    }
    this.loadCategories();
  }
   changePage(newPage: number) {
    this.page = newPage;
    this.loadCategories();
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
