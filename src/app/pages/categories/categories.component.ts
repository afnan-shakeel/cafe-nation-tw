import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirestoreService } from '../../services/firestore.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.sass'
})
export class CategoriesComponent {
  form: FormGroup;
  categoryList: any[] = [];
  isEdit: boolean = false;
  constructor(private formBuilder: FormBuilder, private firestoreService: FirestoreService) {
    this.form = this.formBuilder.group({
      id: [null],
      placement_id: [null],
      name: [null, Validators.required],
      value: [null, [Validators.required, Validators.pattern(/^[a-z_]+$/)]]
    });
  }

  ngOnInit(): void {
    this.fetch();
  }
  async tempFunc() {
    await this.firestoreService.tempQuery("menu_items", "category", "az", { "categoryName": "Appetizers" });
  }
  async fetch() {
    this.firestoreService.getCategoryList();
    this.categoryList = await this.firestoreService.getCategoryList();
    console.log(this.categoryList);
  }
  async submit() {
    if(!this.form.value.id){
      let categoryCheck = await this.firestoreService.getCategoryList(this.form.value.value);
      console.log(this.form.value, this.form.valid, categoryCheck);
      if (categoryCheck) {
        window.alert("Category CODE already exists.")
        return;
      }
    }
    if (!this.form.valid) {
      window.alert('invalid form')
      return;
    }
    await this.firestoreService.addCategory(this.form.value).catch((err) => {
      console.log(err);
      throw err;
    });
    window.alert('saved')
    this.clear()
    this.fetch();
  }
  clear() {
    this.form.get('value')?.enable();
    this.form.reset();
  }
  async deleteItem(id: string) {
    await this.firestoreService.deleteCategory(id);
    window.alert('deleted')
    this.fetch();
  }
  editItem(item: any) {
    console.log(item);
    this.form.get('value')?.disable();
    this.form.patchValue(item);
  }
}
