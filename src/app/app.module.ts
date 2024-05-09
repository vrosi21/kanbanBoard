import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BoardComponent } from './components/board/board.component';
import { NoteComponent } from './components/note/note.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { AboutPageComponent } from './components/pages/about-page/about-page.component';
import { KanbanPageComponent } from './components/pages/kanban-page/kanban-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { AuthInterceptorService } from './services/auth.interceptor.service';
import { EditModalComponent } from './components/modals/edit-modal/edit-modal.component';
import { DeleteModalComponent } from './components/modals/delete-modal/delete-modal.component';
import { AuthModalComponent } from './components/modals/auth-modal/auth-modal.component';
import { NewBoardModalComponent } from './components/modals/new-board-modal/new-board-modal.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    BoardComponent,
    NoteComponent,
    HomePageComponent,
    AboutPageComponent,
    KanbanPageComponent,
    RegisterPageComponent,
    FooterComponent,
    LoginPageComponent,
    EditModalComponent,
    DeleteModalComponent,
    AuthModalComponent,
    NewBoardModalComponent,
    ColorPickerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
