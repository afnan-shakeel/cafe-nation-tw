import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.sass'
})
export class MainLayoutComponent {
  isMobileSettings : boolean = false;
  setMobileSettings(value: boolean) {
  this.isMobileSettings = value;
  }
}
