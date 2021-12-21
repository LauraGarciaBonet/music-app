import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { SongService } from '../services/song.service';
import { AuthService } from '../users/login/auth.service';
import { Song } from './song';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  songs!:Song[];
  imgSrc!:string;

  constructor(private songService:SongService, public authService:AuthService) { }

  ngOnInit(): void {
    this.songService.getSongs().subscribe(songs=>this.songs=songs);
    this.imgSrc='assets/images.jfif'
  }
  delete(song: Song): void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar la canción ${song.name} ?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.songService.delete(song.id).subscribe(
          () => {
            this.songs = this.songs.filter(song => song !== song)
            swal(
              'Canción Eliminada!',
              `Canción ${song.name} eliminada con éxito.`,
              'success'
            )
          }
        )

      }
    });
  }
}
