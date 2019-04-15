import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainContentComponent } from "./main-content/main-content.component";
import { LoginComponent } from "./login/login.component";


const routes: Routes = [
  { path: 'main', component: MainContentComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
