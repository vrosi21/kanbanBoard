import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  constructor(private router: Router) {}

  navigateTo(route: string): void {
    this.router.navigateByUrl(route).then(() => {
      window.scrollTo(0, 0);
    });
  }
}
