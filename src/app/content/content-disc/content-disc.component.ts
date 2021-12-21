import { Component, OnInit } from '@angular/core';
import { RecordService } from 'src/app/services/record.service';
import { AuthService } from 'src/app/users/login/auth.service';
import swal from 'sweetalert2';
import { Records } from '../records';

@Component({
  selector: 'app-content-disc',
  templateUrl: './content-disc.component.html',
  styleUrls: ['./content-disc.component.css']
})
export class ContentDiscComponent implements OnInit {
  record!:Records[];
  imgSrc!:string;

  constructor(private recordService:RecordService, public authService:AuthService) { }

  ngOnInit(): void {
    this.recordService.getRecords().subscribe(record=>this.record=record);
    this.imgSrc='assets/disc.jfif'
  }
  delete(record: Records): void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar el disco ${record.name} ?`,
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

        this.recordService.delete(record.id).subscribe(
          () => {
            this.record = this.record.filter(record => record !== record)
            swal(
              'Disco Eliminado!',
              `Disco ${record.name} eliminado con éxito.`,
              'success'
            )
          }
        )

      }
    });
  }

}
