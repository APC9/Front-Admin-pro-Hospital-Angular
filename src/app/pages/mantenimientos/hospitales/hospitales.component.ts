import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';
import Swal from 'sweetalert2';

import { HospitalesService, ModalImageService } from '../../../services';
import { Hospital } from '../../../interfaces';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy{

  public from: number = 0;
  public hospitales!: Hospital[];
  public hospitalesTemp!: Hospital[];
  public loading: boolean = true;
  public error?: string;
  public total : number = 0;
  public imgSubs!: Subscription;

  private debouncer: Subject<string> = new Subject<string>();
  private hospitalesService = inject( HospitalesService );
  private modalImageService = inject( ModalImageService );

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
      this.loading = true
      this.loadHospitals()
      this.imgSubs = this.modalImageService.newImage.subscribe( ()=> this.loadHospitals() )

      this.debouncer.pipe(
        debounceTime(300)
      ).subscribe( term => {
  
      this.hospitalesService.searchHospital( term )
        .subscribe({
          next: (resp ) => {

            if( resp._id === undefined){
              this.hospitales = this.hospitalesTemp
              return;
            }

            this.error = undefined

            const { _id, name, user, isActive, img } = resp;
            this.hospitales = [ { _id, name, user, isActive, img } ] 
          },
          error: err => this.error = err.error.message
        })
  
      })
  }

  searchHospitalByTerm( term: string ){

    if ( term.trim().length  === 0 ){
      this.hospitales = this.hospitalesTemp
      this.error = undefined
    };

    this.debouncer.next( term )
  }

  loadHospitals(){
    this.hospitalesService.loadHospital( this.from.toString() )
      .subscribe({
        next: resp => {
          this.loading = false
          this.total = resp.total
          this.hospitales = resp.hospital
          this.hospitalesTemp = resp.hospital
        },
        error: err => console.log(err)
      })
  }

  saveChanges(hospital:Hospital){
    this.hospitalesService.upgradeHospital(hospital)
      .subscribe({
        next: (resp) => {
          Swal.fire(
            'Cambio exitoso',
            `${hospital.name} actualizado correctamente`,
            'success'
          )
        },
        error: err => console.log(err)
      })
  }

  deleteHospital(hospital:Hospital){
    this.hospitalesService.deleteHospital(hospital)
      .subscribe({
        next: (resp) => {
          this.loadHospitals(),
          Swal.fire(
            'Exitos',
            `${hospital.name} eliminado correctamente`,
            'success'
          )
        },
        error: err => console.log(err)
      })
  }


  async openSweetAlert(){
    const { value, isDismissed } = await Swal.fire<string>({
      title: 'Crear hospital',
      input: 'text',
      inputLabel: 'Hospital name',
      inputPlaceholder: 'Enter the name of the hospital',
      showCancelButton: true,
    })

    if(isDismissed)return;

    if( !value || value.trim().length < 4 ){
      Swal.fire(
        'Error',
        `minimum characters is 4`,
        'error'
      )
      return;
    }

    this.hospitalesService.createHospital( value )
    .subscribe({
      next: (resp) => {
        this.loadHospitals(),
        Swal.fire(
          'Exitos',
          `${value} creado correctamente`,
          'success'
        )
      },
      error: err => console.log(err)
    })
  }

  openModal( hospital:Hospital ){
    this.modalImageService.openModal(hospital)
  }
}
