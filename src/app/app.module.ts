import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { LoginComponent } from './users/login/login.component';
import { ContentComponent } from './content/content.component';
import { FormNewSongComponent } from './content/form-new-song/form-new-song.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SongService } from './services/song.service';
import { AboutComponent } from './content/about/about.component';
import { ContactComponent } from './content/contact/contact.component';
import { HomeComponent } from './content/home/home.component';
import { FormNewDiscComponent } from './content/form-new-disc/form-new-disc.component';
import { ContentDiscComponent } from './content/content-disc/content-disc.component';
import { RecordService } from './services/record.service';
import { SelectImgComponent } from './content/select-img/select-img.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    ContentComponent,
    FormNewSongComponent,
    AboutComponent,
    ContactComponent,
    HomeComponent,
    FormNewDiscComponent,
    ContentDiscComponent,
    SelectImgComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    SongService,
    RecordService],
  bootstrap: [AppComponent]
})
export class AppModule { }
