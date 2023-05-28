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
import { AccountComponent } from './componentes/account/account.component';
import { AuthGuard } from './service/auth.guard';

const routes: Routes = [
  {path: "", component: IndexComponent},
  {path: "login", component: LoginComponent},
  {path: "usuario", component: UserComponent,canActivate: [AuthGuard]},
  {path: "profile", component: PerfilComponent,canActivate: [AuthGuard]},
  {path: "register", component: RegisterComponent},
  {path: "games", component: GamesComponent,canActivate: [AuthGuard]},
  {path: "community", component: CommunityComponent,canActivate: [AuthGuard]},
  {path: "account", component: AccountComponent,canActivate: [AuthGuard]},
  {path: "explore", component: ListPostsComponent,canActivate: [AuthGuard]},
  {path: "profile/:id", component: UserProfileComponent,canActivate: [AuthGuard]},
  {path: "games/:id", component: GamePostsComponent,canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
