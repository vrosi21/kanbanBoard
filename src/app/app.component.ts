import { Component, OnInit } from '@angular/core';
import { identifierName } from '@angular/compiler';
import { Router, NavigationEnd } from '@angular/router';
import { ApiService } from './services/api.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
	isNotKanbanRoute: boolean = false;

	constructor(private router: Router, private apiSvc: ApiService) {}

	ngOnInit() {
		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				this.isNotKanbanRoute = this.router.url != '/kanban';
			}
		});
		this.apiSvc.getMessages();
	}
}
