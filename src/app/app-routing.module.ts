import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutComponent } from "./content/about/about.component";
import { ContactComponent } from "./content/contact/contact.component";
import { ContentDiscComponent } from "./content/content-disc/content-disc.component";
import { ContentComponent } from "./content/content.component";
import { FormNewDiscComponent } from "./content/form-new-disc/form-new-disc.component";
import { FormNewSongComponent } from "./content/form-new-song/form-new-song.component";
import { HomeComponent } from "./content/home/home.component";
import { LoginComponent } from "./users/login/login.component";


const routes: Routes=[
  {
    path:'',
    redirectTo:'/home',
    pathMatch:'full'
  },
  {
    path:'home',
    component: HomeComponent
  },
  {
    path:'songs/about',
    component: AboutComponent
  },
  {
    path:'songs/create',
    component: FormNewSongComponent
  },
  {
    path:'songs',
    component: ContentComponent
  },
  {
    path:'songs/editar/:id',
    component: FormNewSongComponent
  },
  {
    path:'records',
    component: ContentDiscComponent
  },
  {
    path:'records/create',
    component: FormNewDiscComponent
  },
  {
    path:'records/editar/:id',
    component: FormNewDiscComponent
  },
  {
    path:'contact',
    component: ContactComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
{
  path:'**',
  redirectTo:''
}
]

@NgModule({
  imports:[
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})

export class AppRoutingModule{}
