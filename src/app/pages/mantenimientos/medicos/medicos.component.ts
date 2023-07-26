import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

import { Medicos } from '../../../interfaces/medicos.interfaces';
import { ModalImageService, MedicosService } from '../../../services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy{


  public medicos!: Medicos[];
  public medicosTemp!: Medicos[];
  public total!: number;
  public loading: boolean = true;
  public imgSubs!: Subscription;
  public error?: string;

  private debouncer: Subject<string> = new Subject<string>();
  private medicosService = inject(MedicosService);
  private modalImageService = inject(ModalImageService);

  ngOnInit(): void {
   this.laodMedicos()
   this.imgSubs = this.modalImageService.newImage.subscribe( ()=> this.laodMedicos() )

   this.debouncer.pipe(
    debounceTime(300)
  ).subscribe( term => {

    this.medicosService.searchMedicoByTerm( term )
      .subscribe({
        next: (resp ) => {
          this.error = undefined
          this.medicos =  resp
        },
        error: err => this.error = err.error.message
      })

    })
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  laodMedicos(){
    this.medicosService.loadMedicos()
      .subscribe({
        next: resp =>{
          this.loading = false,
          this.medicos = resp.medicos,
          this. medicosTemp = resp.medicos,
          this.total = resp.total
        },
        error: err => console.log(err)
      })
  }

  openModal(medico:Medicos){
    this.modalImageService.openModal(medico)
  }

  searchMedicoByTerm(term:string){
    
    if( term.trim().length === 0){
      this.medicos = this.medicosTemp
      this.error = undefined
    }

    this.debouncer.next( term )
  }

  deleteMedico(medico:Medicos){
    this.medicosService.deleteMedico(medico._id)
      .subscribe({
        next: resp =>{
          this.laodMedicos(),
          Swal.fire(
            'Exitos',
            `${medico.name} eliminado correctamente`,
            'success'
          )
        },
        error: err => console.log(err)
    })
  }

}
