import { Component } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.sass'
})
export class ProductsComponent {
  constructor(private firestoreService: FirestoreService) { }
  mealCategoryList: any[] = [];
  menuList: any[] = [];
  async ngOnInit() {
    this.mealCategoryList = await this.firestoreService.getCategoryList();
    this.mealCategoryList.unshift({ name: 'All', value: 'all' });
    this.menuList = await this.firestoreService.getMenuData(null, 'active');
  }

  async onSelectChange(event: any) {
    const selectedValue = event.value;
    // Use the selectedValue here
    if (selectedValue == 'all') {
      this.menuList = await this.firestoreService.getMenuData(null, 'active');
      return;
    }
    console.log(selectedValue);
    this.menuList = await this.firestoreService.getMenuData(selectedValue, 'active');
  }
}
