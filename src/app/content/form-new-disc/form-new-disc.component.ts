import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecordService } from 'src/app/services/record.service';
import swal from 'sweetalert2';
import { Records } from '../records';

@Component({
  selector: 'app-form-new-disc',
  templateUrl: './form-new-disc.component.html',
  styleUrls: ['./form-new-disc.component.css']
})
export class FormNewDiscComponent implements OnInit {

  title:string ="Create New Disc";
  record: Records= new Records();

  constructor(private recordService: RecordService, private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id')!;
      if (id) {
        this.recordService.getRecord(id).subscribe((records) => this.record = records);
      }
    });
  }

  public create():void{
    console.log("Formulario Enviado");
    console.log(this.record);
    this.recordService.create(this.record)
    .subscribe(
      song => {
        this.router.navigate(['/records']);
        swal('Nueva canción', `El disco ${this.record.name} ha sido creado con éxito`, 'success');
      },
      err => {
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

  update(): void {
    console.log(this.record);
    this.recordService.update(this.record)
      .subscribe(
        json => {
          this.router.navigate(['/records']);
          swal('Disco Actualizado', `${this.record.name}`, 'success');
        },
        err => {
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      )
  }

}
