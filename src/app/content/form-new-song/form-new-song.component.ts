import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SongService } from 'src/app/services/song.service';
import swal from 'sweetalert2';
import { Song } from '../song';

@Component({
  selector: 'app-form-new-song',
  templateUrl: './form-new-song.component.html',
  styleUrls: ['./form-new-song.component.css']
})
export class FormNewSongComponent implements OnInit {
  title:string ="Create New Song";
  // regiones!: Region[];
  song: Song = new Song();

  constructor(private songService: SongService,
     private router: Router,
     private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id')!;
      if (id) {
        this.songService.getSong(id).subscribe((songs) => this.song = songs);
      }
    });

    // this.songService.getRegiones().subscribe(regiones => this.regiones = regiones);
  }

  public create():void{
    console.log("Formulario Enviado");
    console.log(this.song);
    this.songService.create(this.song)
    .subscribe(
      song => {
        this.router.navigate(['/songs']);
        swal('Nueva canción', `La canción ${this.song.name} ha sido creada con éxito`, 'success');
      },
      err => {
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

  update(): void {
    console.log(this.song);
    this.songService.update(this.song)
      .subscribe(
        json => {
          this.router.navigate(['/songs']);
          swal('Canción Actualizada', `${this.song.name}`, 'success');
        },
        err => {
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      )
  }

}
