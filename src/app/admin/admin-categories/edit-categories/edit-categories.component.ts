import { Component, OnInit, Input } from '@angular/core';
import { CategoriesDataService } from 'src/app/service/categories-data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Category, CategoryForm } from 'src/app/model/category.model';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ContextService } from 'src/app/service/context.service';

@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.scss']
})
export class EditCategoriesComponent implements OnInit {

  categoryForm: FormGroup;

  category: Category;
  newFormData: CategoryForm = {
    name: ''
  };
  updFormData: Category = {
    name: '',
    _id: '',
    slug: ''
  };

  constructor(
    private categoriesDataService: CategoriesDataService,
    private contextService: ContextService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {

    this.categoryForm = new FormGroup({
      name: new FormControl(null, Validators.required)
    });


    this.route.params.pipe(
      switchMap((params: Params) => {
      if (params.id) {
        return this.categoriesDataService.getCategory(params.id);
      } else {
        return of(null);
      }
    })).subscribe((data: Category) => {
      this.category = data;
      if (this.category) {
        this.categoryForm.patchValue({
          name: this.category.name
        });
      }
    });
  }

  onCategorySubmit() {
    if (this.category) {
      this.updFormData = {
        name: this.categoryForm.get('name').value,
        _id: this.category._id,
        slug: this.category.slug
      };
      // tslint:disable-next-line:max-line-length
      return this.categoriesDataService.updateCategory(this.category._id, this.updFormData).subscribe(() => this.router.navigate(['/admin/categories']));
      } else {
        this.newFormData.name = this.categoryForm.get('name').value;
        return this.categoriesDataService.createCategory(this.newFormData).subscribe((res: any) => {
          this.router.navigate(['/admin/categories']);
      });
    }
  }

}
