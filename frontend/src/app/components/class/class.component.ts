import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { clases } from 'src/app/models/clases';
import { ClasesService } from 'src/app/services/clases.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css'],
})
export class ClassComponent {
  listClases: clases[] = [];
  claseForm: FormGroup;
  public cameras: MediaDeviceInfo[] = [];
  public myDevice!: MediaDeviceInfo;
  public scannerEnabled = false;
  public results: string[] = [];

  constructor(private _clasesService: ClasesService, private fb: FormBuilder) {
    this.claseForm = this.fb.group({
      Nombre_Clase: ['', Validators.required],
      Descripcion: ['', Validators.required],
      Nombre_Instructor: ['', Validators.required],
      Fecha: ['', Validators.required],
      Hora: ['', Validators.required],
      Cupo: ['', Validators.required],
      Foto_Clase: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.obtenerClases();
  }

  camerasFoundHandler(cameras: MediaDeviceInfo[]) {
    this.cameras = cameras;
    this.selectCamera(this.cameras[0].label);
  }

  scanSuccessHandler(event: string) {
    console.log(event);
    this.results.unshift(event);
  }

  selectCamera(cameraLabel: string) {
    this.cameras.forEach((camera) => {
      if (camera.label.includes(cameraLabel)) {
        this.myDevice = camera;
        console.log(camera.label);
        this.scannerEnabled = true;
      }
    });
  }

  obtenerClases() {
    this._clasesService.getClases().subscribe(
      (data) => {
        console.log(data);
        this.listClases = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  eliminarClase(id: any) {
    this._clasesService.eliminarClase(id).subscribe(
      (data) => {
        this.obtenerClases();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  agregarClase() {
    const CLASE: clases = {
      Nombre_Clase: this.claseForm.get('Nombre_Clase')?.value,
      Descripcion: this.claseForm.get('Descripcion')?.value,
      Nombre_Instructor: this.claseForm.get('Nombre_Instructor')?.value,
      Hora: this.claseForm.get('Hora')?.value,
      Fecha: this.claseForm.get('Fecha')?.value,
      Cupo: this.claseForm.get('Cupo')?.value,
      Foto_Clase: this.claseForm.get('Foto_Clase')?.value,
    };
    console.log(CLASE);
    this._clasesService.guardarClase(CLASE).subscribe(
      (data) => {},
      (error) => {
        console.log(error);
        this.claseForm.reset();
      }
    );
  }
}
