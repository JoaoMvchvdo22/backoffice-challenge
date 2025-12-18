import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'backoffice-challenge';

  isCollapsed = false;

  toggleSidenav(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
