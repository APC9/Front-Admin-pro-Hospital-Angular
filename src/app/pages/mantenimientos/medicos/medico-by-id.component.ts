import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, delay } from 'rxjs';
import Swal from 'sweetalert2';

import { ValidatorsService, MedicosService, HospitalesService, ModalImageService } from '../../../services';
import { Hospital, Medicos } from '../../../interfaces';


@Component({
  selector: 'app-medico-by-id',
  templateUrl: './medico-by-id.component.html',
  styles: [
  ]
})
export class MedicoByIdComponent implements OnInit, OnDestroy {

  public medicoForm!: FormGroup;
  private fb = inject( FormBuilder );
  public hospitales!: Hospital[];
  public selectedHospital?: Hospital;
  public selectedMedico!: Medicos;
  public imgSubs!: Subscription;

  private router = inject( Router );
  private route = inject( ActivatedRoute );
  private validatorsService = inject( ValidatorsService );
  private modalImageService = inject( ModalImageService );
  private medicosService = inject( MedicosService );
  private hospitalesService = inject( HospitalesService );

  ngOnInit(): void {
      this.loadHospital();
      this.imgSubs = this.modalImageService.newImage.subscribe( ()=> this.loadMedico(this.selectedMedico._id) )

      this.route.paramMap.subscribe( (params) => {
         const id = params.get('id') as string;
        this.loadMedico( id )
      })

      this.medicoForm = this.fb.group({
        name: [ '' , [ Validators.required, Validators.minLength(2)] ],
        hospital: [ '', [ Validators.required ] ]
      })

      this.medicoForm.get('hospital')?.valueChanges.subscribe({
        next: hospitalID => {
          this.selectedHospital = this.hospitales.find( hospital => hospital._id === hospitalID)
        }
      })
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  openModal(){
    this.modalImageService.openModal(this.selectedMedico)
  }

  isValidField( field:string){
    return this.validatorsService.isValidField(this.medicoForm, field)
  }

  saveMedico(){
    if( this.selectedMedico ){
      this.updateMedico()
      return;
    }
    this.createMedico()
  }

  loadHospital(){
    this.hospitalesService.loadHospital()
      .subscribe({
        next: resp => this.hospitales = resp.hospital,
        error: err => console.log(err)
      })
  }


  loadMedico(id: string){
    if (id === 'new-medico' )return;

    this.medicosService.searchMedicoByTerm( id )
      .pipe( 
        delay(100) 
      )
      .subscribe({
        next: medico => { 
          const { name, hospital:{ _id} } = medico[0];
          this.selectedMedico = medico[0]
          this.medicoForm.setValue({ name, hospital: _id })
        },
        error: () =>  this.router.navigateByUrl(`/dashboard/medicos`)
      })
  }

  createMedico(){
    this.medicosService.createMedico(this.medicoForm.value)
    .subscribe({
      next: ( resp ) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `${resp.name} creado correctamente`,
          showConfirmButton: false,
          timer: 2500
        })
        this.router.navigateByUrl(`/dashboard/medico/${resp._id}`)
      },
      error: err => {
        Swal.fire('Error', err.error.message, 'error')
      }
    })
  }

  updateMedico(){
    const { hospital } = this.medicoForm.value;
    this.medicosService.upgradeMedico( this.selectedMedico, hospital)
    .subscribe({
      next: ( resp ) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `${ this.selectedMedico.name } Actualizado correctamente`,
          showConfirmButton: false,
          timer: 2500
        })
        this.router.navigateByUrl(`/dashboard/medico/${ this.selectedMedico._id } `)
      },
      error: err => {
        console.log(err)
        //Swal.fire('Error', err.error.message, 'error')
      }
    })
  }

}
