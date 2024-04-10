import { Component } from '@angular/core';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
	sidebarOpen: boolean = true;

	toggleSidebar() {
		this.sidebarOpen = !this.sidebarOpen;
	}
}
