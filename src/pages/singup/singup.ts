import { ClienteService } from '../../services/domain/cliente.services';
import { EstadoDTO } from './../../models/estado.dto';
import { EstadoService } from '../../services/domain/estado.service';
import { CidadeService } from '../../services/domain/cidade.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadeDTO } from '../../models/cidade.dto';

/**
 * Generated class for the SingupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-singup',
  templateUrl: 'singup.html',
})
export class SingupPage {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    public clienteService: ClienteService,
    public alertController: AlertController) {

    this.formGroup = this.formBuilder.group({
      nome: ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['Joaquim@gmail.com', [Validators.required, Validators.email]],
      tipo: ['1', [Validators.required]],
      cpfOuCnpj: ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      senha: ['123', [Validators.required]],
      logradouro: ['Rua Via', [Validators.required]],
      numero: ['25', [Validators.required]],
      complemento: ['Apto 3', []],
      bairro: ['Copacabana', []],
      cep: ['10828333', [Validators.required]],
      telefone1: ['977261827', [Validators.required]],
      telefone2: ['', []],
      telefone3: ['', []],
      estadoId: [null, [Validators.required]],
      cidadeId: [null, [Validators.required]]
    });
  }

  ionViewDidLoad() {
    this.estadoService.findAll()
      .subscribe(Response => {
        this.estados = Response;
        this.formGroup.controls.estadoId.setValue(this.estados[0].id)
        this.updateCidades();
      },
        error => { })

  }

  signupUser(e) {
    e.preventDefault();
    this.clienteService.insert(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk();
      }, 
      error => {});
  }

  updateCidades() {
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id)
      .subscribe(Response => {
        this.cidades = Response;
        this.formGroup.controls.cidadeId.setValue(null);
      })
  }

  showInsertOk(){
    let alert = this.alertController.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

}
