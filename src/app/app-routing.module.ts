import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KanbanPageComponent } from './components/pages/kanban-page/kanban-page.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { AboutPageComponent } from './components/pages/about-page/about-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';

const routes: Routes = [
  {
    path: 'kanban',
    component: KanbanPageComponent,
    title: 'My Kanban - kanbanly',
  },
  { path: 'home', component: HomePageComponent, title: 'Home - kanbanly' },
  { path: 'about', component: AboutPageComponent, title: 'About - kanbanly' },
  {
    path: 'login',
    component: LoginPageComponent,
    title: 'Log in - kanbanly',
  },
  {
    path: 'register',
    component: RegisterPageComponent,
    title: 'Register - kanbanly',
  },
  { path: '', redirectTo: '/kanban', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
