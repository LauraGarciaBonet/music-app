import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RecordService } from 'src/app/services/record.service';
import swal from 'sweetalert2';
import { Records } from '../records';

@Component({
  selector: 'app-select-img',
  templateUrl: './select-img.component.html',
  styleUrls: ['./select-img.component.css']
})
export class SelectImgComponent implements OnInit {
  record!:Records;
  imgSelect!:File;
  progress:number=0;
  constructor(private recordService:RecordService) { }

  ngOnInit(): void {
  }

  seleccionarFoto(event:any){
    this.imgSelect=event.target.files[0];
    console.log(this.imgSelect);
    }

    subirFoto(){
      if(!this.imgSelect){
        swal('Error Upload: ', 'Debe seleccionar una imagen', 'error');
      }else{
        this.recordService.subirFoto(this.imgSelect, this.record.id).subscribe(event=>{
          if(event.type=== HttpEventType.UploadProgress){
            this.progress= Math.round((event.loaded / event.total!)*100);
          }else if(event.type === HttpEventType.Response){
            let response: any =event.body;
            this.record= response.client as Records;
            swal('La imagen se ha subido completamente!', response.mensaje, 'success');
          }
        })
      }
    }
}
