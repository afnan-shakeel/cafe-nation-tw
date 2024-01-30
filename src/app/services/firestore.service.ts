import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDoc,
  updateDoc,
  collection, addDoc, doc, getDocs, query, where, deleteDoc, orderBy
} from 'firebase/firestore/lite';


const firebaseConfig = {
  apiKey: "AIzaSyCRF0yWq0Dheqs-hyLFqaD0klxQrA06B_4",
  authDomain: "cafenation-60d57.firebaseapp.com",
  projectId: "cafenation-60d57",
  storageBucket: "cafenation-60d57.appspot.com",
  messagingSenderId: "782902101012",
  appId: "1:782902101012:web:5ef86c72a942d2803ad301",
  measurementId: "G-GVJDVDRBF3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const menu_items = collection(db, "menu_items");

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor() { }

  async getMenuData(category: string | null, status: string | null) {
    var q: any
    if (category && status) {
      q = query(menu_items, where("category", "==", category), where("status", "==", status));
    } else if (category) {
      q = query(menu_items, where("category", "==", category));
    } else if (status) {
      q = query(menu_items, where("status", "==", status));
    } else {
      q = query(menu_items);
    }

    const querySnapshot = await getDocs(q);
    const menuDataList: any[] = [];
    querySnapshot.forEach(async (doc) => {
      menuDataList.push({ id: doc.id, ...(doc.data() as any) });
    });

    // Group by category
    const grouped = menuDataList.reduce((groupedData, item) => {
      const key = item.category;
      if (!groupedData[key]) {
        groupedData[key] = [];
      }
      groupedData[key].push(item);
      return groupedData;
    }, {});
    var categories = await this.getCategoryList();
    categories.forEach((category: any) => {
      if (grouped[category.value]) {
        category.menuList = grouped[category.value];
      }
    });
    console.log(menuDataList);
    console.log(categories);
    return categories;
  }
  async addMenuData(data: any) {
    if (data.id) {
      console.log("updating");
      const docRef = doc(db, "menu_items", data.id);
      delete data.id;
      await updateDoc(docRef, data);
      return 'updated'
    }
    console.log("adding");
    data.status = 'active';
    delete data.id;
    const docRef = await addDoc(menu_items, data);
    console.log("Document written with ID: ", docRef.id);
    return docRef
  }
  async deleteMenuData(id: string) {
    console.log("deleting");
    const docRef = doc(db, "menu_items", id);
    await deleteDoc(docRef);
    return 'deleted'
  }

  async getCategoryList(value: string | null = null) {
    let q;
    if(value){
      q = query(collection(db, "categories"), where("value", "==", value),orderBy("placement_id"));
    }else{
      q = query(collection(db, "categories"), orderBy("placement_id"));
    }

    const querySnapshot = await getDocs(q);
    const categoryList: any[] = [];
    querySnapshot.forEach(async (doc) => {
      categoryList.push({ id: doc.id, ...(doc.data() as any) });
    });
    console.log(categoryList);
    return categoryList;
  }

  async addCategory(data: any) {
    if (data.id) {
      console.log("updating");
      const docRef = doc(db, "categories", data.id);
      delete data.id;
      await updateDoc(docRef, data);
      return
    }
    console.log("adding");
    delete data.id;
    const docRef = await addDoc(collection(db, "categories"), data);
    console.log("Document written with ID: ", docRef.id);
  }
  async deleteCategory(id: string) {
    console.log("deleting");
    const docRef = doc(db, "categories", id);
    await deleteDoc(docRef);
  }
  
  async tempQuery(collectionPath: string, conditionField: string, conditionValue: any, updateData: any) {
    const querySnapshot = await getDocs(query(collection(db, collectionPath), where(conditionField, "==", conditionValue)));
    // console.log(querySnapshot);
    querySnapshot.forEach(async (_doc) => {
      updateData = { ...updateData, ..._doc.data() };
      console.log("update data", " => ", updateData);
      const docRef = doc(db, collectionPath, _doc.id)
      await updateDoc(docRef, updateData);
      
    });
  }  
}
