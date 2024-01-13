import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent {

  metaData = {
    "title": "Cafenation - Tellichery's favorite cafe",
    "email": "cafenationofficial@gmail.com",
    "phone": "+91 81293 20570",
    "map": "https://goo.gl/maps/6Y5Z9Z7Z7Z7Z7Z7Z7",
    "instagram": "https://www.instagram.com/cafenationofficial/",
    "facebook": "https://www.facebook.com/cafenationofficial/",
  } 

  specialContent = [
    {
      "title": "Expertly brewed coffee",
      "description": `At Cafenation, we're passionate about serving you the best-brewed coffee in
      Tellichery, expertly prepared to awaken your senses. But our love for flavor doesn't stop there. Our
      daily baked assortment of cookies and brownies are a treat for the sweet-toothed, made fresh every day
      with love and care.`,
      "image": "https://via.placeholder.com/550",
    },
    {
      "title": "Cookies and Brownies",
      "description": `Looking for something more savory? Our main kitchen dishes out all your favorite cafe cravings. From classic Clubsandwiches to exotic Levantine cuisine like Hummus meat and Tabbouleh, we've got it all. Our diverse menu caters to every palate, ensuring that each visit to Cafenation is a unique culinary adventure.`,
      "image": "https://via.placeholder.com/550",
    },
    {
      "title": "Levantine cuisine",
      "description": "And what's a meal without the perfect drink to accompany it? Choose from our wide range of beverages - from fresh pressed fruit extracts to creamy milkshakes, smoothies, and the ever-refreshing Mojitos. There's a drink for every mood and moment here at Cafenation.",
      "image": "https://via.placeholder.com/550",
    },

  ]

  scrollToSpecials(): void {
    var element: any = document.getElementById('specials');
    element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }

  scrollToContact(){
    var element: any = document.getElementById('contact');
    element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }
}
