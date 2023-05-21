import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './componentes/index/index.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';
import { UserComponent } from './componentes/user/user.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { GamesComponent } from './componentes/games/games.component';
import { GamePostsComponent } from './componentes/game-posts/game-posts.component';
import { CommunityComponent } from './componentes/community/community.component';
import { UserProfileComponent } from './componentes/user-profile/user-profile.component';
import { ListPostsComponent } from './componentes/list-posts/list-posts.component';

const routes: Routes = [
  {path: "", component: IndexComponent},
  {path: "login", component: LoginComponent},
  {path: "usuario", component: UserComponent},
  {path: "profile", component: PerfilComponent},
  {path: "register", component: RegisterComponent},
  {path: "games", component: GamesComponent},
  {path: "community", component: CommunityComponent},
  {path: "explore", component: ListPostsComponent},
  {path: "profile/:id", component: UserProfileComponent},
  {path: "games/:id", component: GamePostsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
