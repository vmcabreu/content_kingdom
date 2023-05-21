import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { IndexComponent } from './componentes/index/index.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';
import { GamesComponent } from './componentes/games/games.component';
import { UserComponent } from './componentes/user/user.component';
import { PostsComponent } from './componentes/posts/posts.component';
import { FormsModule } from '@angular/forms';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SkeletonModule } from 'primeng/skeleton';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { Menu, MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { AvatarModule } from 'primeng/avatar';
import { FieldsetModule } from 'primeng/fieldset';
import { TabMenuModule } from 'primeng/tabmenu';
import { Card, CardModule } from 'primeng/card';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { GamePostsComponent } from './componentes/game-posts/game-posts.component';
import { CommunityComponent } from './componentes/community/community.component';
import { ChipModule } from 'primeng/chip';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    IndexComponent,
    LoginComponent,
    RegisterComponent,
    GamesComponent,
    UserComponent,
    PostsComponent,
    PerfilComponent,
    GamePostsComponent,
    CommunityComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CardModule,
    ChipModule,
    HttpClientModule,
    ScrollPanelModule,
    ButtonModule,
    InputTextModule,
    SidebarModule,
    SkeletonModule,
    TooltipModule,
    MenuModule,
    FormsModule,
    CommonModule,
    AvatarModule,
    AppRoutingModule,
    FieldsetModule,
    AutoCompleteModule,
    TabMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
