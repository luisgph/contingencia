import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ClientesService } from '../../services/clientes.service';
import { ListsService } from '../../services/lists.service';
import { environment } from '../../../environments/environment';
import { DocumentType, Client, Country, Department, City, Idiom, ComplementaryDataFields } from '../../models/models';
import { deserialize } from 'serializer.ts/Serializer';
import { TipificacionComponent } from '../tipificacion/tipificacion.component';
//import { DatosComplementariosComponent } from '../datos-complementarios/datos-complementarios.component';
import { ViewChild } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  private readonly clientId = window.location.search;
  fieldHidden: boolean;
  env = environment;
  clientHidden: boolean;
  caseHidden: boolean;
  loading: boolean;
  isValidFisrtName: string;
  isValidLastName: string;
  isValidNationality: string;
  isValidCountry: string;
  isValidDepartment: string;
  isValidCity: string;
  isValidIdiom: string;
  isValidDocumentType: string;
  isValidPrincipalDocument: string;
  isValidComunication: string;
  isValidate: boolean;
  objDocumentType: DocumentType[];
  objCountries: Country[];
  objDepartment: Department[];
  objCity: City[];
  objIdiom: Idiom[];
  objClientes: Client = new Client();
  tokenS: string = "";
  tokenR: string = "";
  dateR: Date;
  dateS: Date;
  isCliente: boolean = false;
  isClase: boolean = false;
  isHistory: boolean = false;
  @ViewChild('tipificacionHijo') tipificacionHijo: TipificacionComponent;
  modalRef: BsModalRef;
  message: string;
  isJumbotron: boolean = false;

  constructor(public _clientesServices: ClientesService, public _listServices: ListsService, private modalService: BsModalService) {
    this.get_DatosIniciales();
  }

  ngOnInit() {
  }


  get_DatosIniciales() {

    this.tokenR = localStorage.getItem('tokenR');
    this.tokenS = localStorage.getItem('tokenS');

    if (this.tokenR != null || this.tokenS != null) {
      let dateLocalStorage = new Date(localStorage.getItem('date'));
      let dateNow = new Date();
      let newDate = dateNow.getHours() - dateLocalStorage.getHours();

      if (newDate >= 1 || newDate < 0) {
        this.tokenR = null;
        this.tokenS = null;
      }
    }

    this.loading = true;
    if (this.tokenR == null || this.tokenS == null) {
      this._listServices.getTokenReplicacion().subscribe(responseToken => {
        this.tokenR = getToken(this.tokenR, responseToken);
        localStorage.setItem('tokenR', this.tokenR);
        this._clientesServices.getTokenSoporte().subscribe(responseToken => {
          this.tokenS = getToken(this.tokenS, responseToken);
          localStorage.setItem('tokenS', this.tokenS);
          localStorage.setItem('date', new Date().toString());

          this._listServices.get_DocumentType(this.tokenR).subscribe(responseDocumentType => {
            this.objDocumentType = deserialize<DocumentType[]>(DocumentType, responseDocumentType);

            this.clientHidden = false;

            if (this.clientId != "") {
              this.fieldHidden = false;

              this._clientesServices.get_client(this.clientId, this.tokenS).subscribe(responseClient => {
                this.loading = false;
                if (responseClient["id"] != null) {
                  this.objClientes = deserialize<Client>(Client, responseClient);
                  this.clientHidden = true;
                  this.fieldHidden = false;
                  this.isCliente = true;
                  this.isJumbotron = true;
                  this.loading = false;
                  this.isClase = true;
                  this.isHistory = true;
                  this.tipificacionHijo.tipificacionHijo = this.objClientes.id;
                } else {
                  this.clientHidden = false;
                  this.fieldHidden = true;
                  this.isCliente = false;
                  this.isJumbotron = false;
                  this.loading = false;
                  this.isClase = false;
                  this.isHistory = false;
                }
              },
                err => console.log(err));
            } else {
              this.loading = false;
              this.fieldHidden = true;
            }
          },
            err => console.log(err));
        },
          err => console.log(err));
      },
        err => console.log(err));

      this._clientesServices.messageHiddenDanger = true;
      this._clientesServices.messageHiddenSuccess = true;

    } else {
      this._listServices.get_DocumentType(this.tokenR).subscribe(responseDocumentType => {
        this.objDocumentType = deserialize<DocumentType[]>(DocumentType, responseDocumentType);

        this.clientHidden = false;

        if (this.clientId != "") {
          this.fieldHidden = false;

          this._clientesServices.get_client(this.clientId, this.tokenS).subscribe(responseClient => {
            this.loading = false;
            if (responseClient["id"] != null) {
              this.objClientes = deserialize<Client>(Client, responseClient);
              this.clientHidden = true;
              this.fieldHidden = false;
              this.isCliente = true;
              this.isJumbotron = true;
              this.loading = false;
              this.isClase = true;
              this.isHistory = true;
              this.tipificacionHijo.tipificacionHijo = this.objClientes.id;
            } else {
              this.clientHidden = false;
              this.fieldHidden = true;
              this.isCliente = false;
              this.isJumbotron = false;
              this.loading = false;
              this.isClase = false;
              this.isHistory = false;
            }
          },
            err => {
              console.log(err);
            });
        } else {
          this.loading = false;
          this.fieldHidden = true;
        }
      },
        err => console.log(err));
      this._clientesServices.messageHiddenDanger = true;
      this._clientesServices.messageHiddenSuccess = true;
    }
  }

  guardarCliente() {
    this.isValidate = true;
    let nationality: any = document.getElementById('fieldNacionalidad');
    let country: any = document.getElementById('fieldPais');
    let department: any = document.getElementById('fieldDepartamento');
    let city: any = document.getElementById('fieldCiudad');
    let idiom: any = document.getElementById('fieldIdioma');
    let documentType: any = document.getElementById('fieldTipoDocumento');

    if (this.objClientes.firstName == "" || this.objClientes.firstName == undefined) {
      this.isValidFisrtName = "is-invalid";
      this.isValidate = false;
    } else {
      this.isValidFisrtName = "";
    }

    if (this.objClientes.lastName == "" || this.objClientes.lastName == undefined) {
      this.isValidLastName = "is-invalid";
      this.isValidate = false;
    } else {
      this.isValidLastName = "";
    }

    if (nationality.options[nationality.selectedIndex].text == "") {
      this.isValidNationality = "is-invalid";
      this.isValidate = false;
    } else {
      this.isValidNationality = "";
    }

    if (country.options[country.selectedIndex].text == "") {
      this.isValidCountry = "is-invalid";
      this.isValidate = false;
    } else {
      this.isValidCountry = "";
    }

    if (department.options[department.selectedIndex].text == "") {
      this.isValidDepartment = "is-invalid";
      this.isValidate = false;
    } else {
      this.isValidDepartment = "";
    }

    if (city.options[city.selectedIndex].text == "") {
      this.isValidCity = "is-invalid";
      this.isValidate = false;
    } else {
      this.isValidCity = "";
    }

    if (idiom.options[idiom.selectedIndex].text == "") {
      this.isValidIdiom = "is-invalid";
      this.isValidate = false;
    } else {
      this.isValidIdiom = "";
    }

    if (documentType.options[documentType.selectedIndex].text == "") {
      this.isValidDocumentType = "is-invalid";
      this.isValidate = false;
    } else {
      this.isValidDocumentType = "";
    }

    if (this.objClientes.principalDocument == "" || this.objClientes.principalDocument == undefined) {
      this.isValidPrincipalDocument = "is-invalid";
      this.isValidate = false;
    } else {
      this.isValidPrincipalDocument = "";
    }

    if ((this.objClientes.phone == "" || this.objClientes.phone == undefined) && (this.objClientes.cellPhone == "" || this.objClientes.cellPhone == undefined) && (this.objClientes.mail == "" || this.objClientes.mail == undefined)) {
      this.isValidComunication = "is-invalid";
      this.isValidate = false;
    } else {
      this.isValidComunication = "";
    }

    if (this.isValidate) {
      let body = {
        "firstName": this.objClientes.firstName,
        "lastName": this.objClientes.lastName,
        "nationality": nationality.options[nationality.selectedIndex].text,
        "country": country.options[country.selectedIndex].text,
        "city": city.options[city.selectedIndex].text,
        "department": department.options[department.selectedIndex].text,
        "idiom": idiom.options[idiom.selectedIndex].text,
        "documentType": documentType.options[documentType.selectedIndex].text,
        "principalDocument": this.objClientes.principalDocument,
        "phone": this.objClientes.phone,
        "cellPhone": this.objClientes.cellPhone,
        "mail": this.objClientes.mail
      };

      this.loading=true;
      this._clientesServices.post_cliente(body, this.tokenS).subscribe(responseClient => {
        this.objClientes = deserialize<Client>(Client, responseClient);
        this.loading=false;
        this.isCliente = true;
        this.isClase = true;
        this.tipificacionHijo.tipificacionHijo = this.objClientes.id;

        Swal.fire({
          type: 'success',
          title: 'Enhorabuena...',
          text:'El cliente fue creado con éxito',
          footer: '<a>Continua con la tipificación del caso</a>',
          confirmButtonColor: '#dc3545'
        });
      },
        err => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Algo salio mal!',
            footer: '<a>Se presento un error guardando la información, intentalo más tarde</a>',
            confirmButtonColor: '#dc3545'
          })
          console.log(err)
        });
    }
  }


  get_ClientSearch(template: TemplateRef<any>) {
    this.loading = true;
    this._clientesServices.get_clientSearch(this._clientesServices.objClientes, this.tokenS).subscribe(responseClient => {
      if (responseClient["id"] != null) {
        this.objClientes = deserialize<Client>(Client, responseClient);
        this.clientHidden = true;
        this.fieldHidden = false;
        this.isCliente = true;
        this.isJumbotron = true;
        this.loading = false;
        this.isClase = true;
        this.isHistory = true;
        this.tipificacionHijo.tipificacionHijo = this.objClientes.id;
        this.tipificacionHijo.clearFields();
        this.clearValidators();
      } else {
        this.clientHidden = false;
        this.fieldHidden = true;
        this.isCliente = false;
        this.isJumbotron = false;
        this.loading = false;
        this.isClase = false;
        this.isHistory = false;
        this.modalRef = this.modalService.show(template, { class: 'modal-md' });
      }
    },
      err => console.log(err));
  }

  confirm(): void {
    this.modalRef.hide();
    this.clientHidden = true;
    this.fieldHidden = true;
    this.isCliente = false;
    this.isJumbotron = true;
    this._listServices.get_Countries(this.tokenR).subscribe(responseCountry => {
      this.objCountries = deserialize<Country[]>(Country, responseCountry);
    },
      err => console.log(err));

    this._listServices.get_Idiom(this.tokenR).subscribe(responseIdiom => {
      this.objIdiom = deserialize<Idiom[]>(Idiom, responseIdiom);
    },
      err => console.log(err));

      this.clearFields();
  }

  decline(): void {
    this.modalRef.hide();
  }

  get_DepartmentById(event: any) {
    this._listServices.get_DepartmentById(event, this.tokenR).subscribe(responseDepartment => {
      this.objDepartment = deserialize<Department[]>(Department, responseDepartment);
    },
      err => console.log(err));
  }

  get_CitiesById(event: any) {
    this._listServices.get_CitiesById(event, this.tokenR).subscribe(responseCity => {
      this.objCity = deserialize<City[]>(City, responseCity);
    },
      err => console.log(err));
  }

  clearFields(){
    this.objClientes.firstName="";
    this.objClientes.lastName="";
    this.objClientes.principalDocument="";
    this.objClientes.phone="";
    this.objClientes.cellPhone="";
    this.objClientes.mail="";
  }

  clearValidators(){
      this.isValidFisrtName = "";
      this.isValidLastName = "";
      this.isValidNationality = "";
      this.isValidCountry = "";
      this.isValidDepartment = "";
      this.isValidCity = "";
      this.isValidIdiom = "";
      this.isValidDocumentType = "";
      this.isValidPrincipalDocument = "";
      this.isValidComunication = "";
  }
}

function getToken(token: string, responseToken: Object) {
  token = responseToken["request"];
  return token;
}




