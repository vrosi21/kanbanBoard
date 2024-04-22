import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isNotKanbanRoute: boolean = false;
  messages: any[] = []; // Declare messages as an array

  constructor(private router: Router, private apiSvc: ApiService) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isNotKanbanRoute = this.router.url != '/kanban';
      }
    });

    // Subscribe to the Observable returned by getMessages()
    this.apiSvc.getMessages().subscribe((data) => {
      this.messages = data; // Assign the received data to messages
    });
  }
}
