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
  constructor(private formBuilder: FormBuilder, private firestoreService: FirestoreService) {
    this.form = this.formBuilder.group({
      id: [null],
      placement_id: [null],
      name: [null, Validators.required],
      value: [null, [Validators.required, Validators.pattern(/^[a-z_]+$/)]]
    });
  }

  ngOnInit(): void {
    this.fetch();  }
  async fetch() {
    this.firestoreService.getCategoryList();
    this.categoryList =  await this.firestoreService.getCategoryList();
    console.log(this.categoryList);
  }
  async submit() {
    console.log(this.form.value, this.form.valid);
    if (!this.form.valid) {
      window.alert('invalid form')
      return;
    }
    await this.firestoreService.addCategory(this.form.value).catch((err) => { console.log(err);
    throw err; });
    window.alert('saved')
    this.clear()
    this.fetch();
  }
  clear() {
    this.form.reset();
  }
  async deleteItem(id: string) {
    await this.firestoreService.deleteCategory(id);
    window.alert('deleted')
    this.fetch();
  }
  editItem(item: any) {
    console.log(item);
    this.form.patchValue(item);
  }
}
