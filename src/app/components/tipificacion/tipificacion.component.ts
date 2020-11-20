import { Component, ViewChild, OnInit } from '@angular/core';
import { ListsService } from '../../services/lists.service';
import { ClientesService } from '../../services/clientes.service';
import { Client, Case, ComplementaryData, ComplementaryDataFields, Moment, Source, Activity, Reason, ReasonDetail, Motive } from '../../models/models';
import { deserialize } from 'serializer.ts/Serializer';
import { Input } from '@angular/core';
import { DatosComplementariosComponent } from '../datos-complementarios/datos-complementarios.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-tipificacion',
  templateUrl: './tipificacion.component.html',
  styleUrls: ['./tipificacion.component.css']
})
export class TipificacionComponent implements OnInit {
  objActivity: Activity[];
  objSource: Source[];
  objMoments: Moment[];
  objReason: Reason[];
  objReasonDetail: ReasonDetail[];
  objMotive: Motive[];
  token: string;
  tokenR: string;
  tokenS: string;
  isComplentaryData: boolean = false;
  isTipificacion: boolean = false;
  isValidate: boolean;
  isValidTitleCase: string;
  isValidDescription: string;
  isValidMoment: string;
  isValidActivity: string;
  isValidReason: string;
  isValidReasonDetail: string;
  isValidMotive: string;
  isValidSource: string;
  loading: boolean;


  objClientes: Client = new Client();
  objCase: Case = new Case();
  @Input() tipificacionHijo: string;
  objComplementaryDataArray: ComplementaryData[];
  @ViewChild('datosComplementarioHijo') datosComplementariosHijo: DatosComplementariosComponent;

  constructor(public _listCaseServices: ListsService, public _clientServices: ClientesService) {
  }

  ngOnInit() {
    
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

    if (this.tokenR == null || this.tokenS == null) {
      this._listCaseServices.getTokenReplicacion().subscribe(responseToken => {
        this.tokenR = getToken(this.tokenR, responseToken);
        localStorage.setItem('tokenR', this.tokenR);
        this._clientServices.getTokenSoporte().subscribe(responseToken => {
          this.tokenS = getToken(this.tokenS, responseToken);
          localStorage.setItem('tokenS', this.tokenS);
          localStorage.setItem('date', new Date().toString());

          this._listCaseServices.get_Moments(this.tokenR)
            .subscribe(responseMoments => {
              this.objMoments = deserialize<Moment[]>(Moment, responseMoments);
            },
              err => console.log(err));

          this._listCaseServices.get_Sources(this.tokenR)
            .subscribe(responseSource => {
              this.objSource = deserialize<Source[]>(Source, responseSource);
            },
              err => console.log(err));
        });
      });
    } else {
      this._listCaseServices.get_Moments(this.tokenR)
        .subscribe(responseMoments => {
          this.objMoments = deserialize<Moment[]>(Moment, responseMoments);
        },
          err => console.log(err));

      this._listCaseServices.get_Sources(this.tokenR)
        .subscribe(responseSource => {
          this.objSource = deserialize<Source[]>(Source, responseSource);
        },
          err => console.log(err));
    }
  }

  get_ActivitiesByMomentId(event: any) {
    this._listCaseServices.get_ActivitiesByMomentId(event, this.tokenR)
      .subscribe(responseActitvity => {
        this.objActivity = deserialize<Activity[]>(Activity, responseActitvity);
        this.objReason = null;
        this.objReasonDetail = null;
        this.objMotive = null;
      },
        err => console.log(err));
  }

  get_ReasonByActivityId(event: any) {
    this._listCaseServices.get_ReasonByActivityId(event, this.tokenR)
      .subscribe(responseReason => {
        this.objReason = deserialize<Reason[]>(Reason, responseReason);
        this.objReasonDetail = null;
        this.objMotive = null;
      },
        err => console.log(err));
  }

  get_ReasonDetailByReasonId(event: any) {
    this._listCaseServices.get_ReasonDetailByReasonId(event, this.tokenR)
      .subscribe(responseReasonDetail => {
        this.objReasonDetail = deserialize<ReasonDetail[]>(ReasonDetail, responseReasonDetail);
        this.objMotive = null;
      },
        err => console.log(err));
  }

  get_MotiveByReasonDetailId(event: any) {
    this._listCaseServices.get_MotiveByReasonDetailId(event, this.tokenR)
      .subscribe(responseMotive => {
        this.objMotive = deserialize<Motive[]>(Motive, responseMotive);
      },
        err => console.log(err));
  }

  guardarCaso() {
    this.validateFields();

    if (this.isValidate) {
      this._clientServices.getTokenSoporte().subscribe(responseToken => {
        this.token = getToken(this.token, responseToken);
        this.loading = true;

        let moment: any = document.getElementById('fieldMomento');
        let activity: any = document.getElementById('fieldAcividadMomento');
        let reason: any = document.getElementById('fieldRazon');
        let reasonDetail: any = document.getElementById('fieldDetalleRazon');
        let motive: any = document.getElementById('fieldMotivo');
        let source: any = document.getElementById('fieldFuente');

        let detailReasonId = reasonDetail.options[reasonDetail.selectedIndex].value;
        let motiveId = motive.options[motive.selectedIndex].value;

        let body = {
          "id": "",
          "clientID": this.tipificacionHijo,
          "caseTitle": this.objCase.caseTitle,
          "caseOrigin": this.objCase.caseOrigin,
          "description": this.objCase.description,
          "moment": moment.options[moment.selectedIndex].text,
          "activity": activity.options[activity.selectedIndex].text,
          "reason": reason.options[reason.selectedIndex].text,
          "reasonDetail": reasonDetail.options[reasonDetail.selectedIndex].text,
          "motive": motive.options[motive.selectedIndex].text,
          "source": source.options[source.selectedIndex].text
        };

        this._clientServices.post_CaseClient(body, this.token).subscribe(responseCase => {
          this.objCase = deserialize<Case>(Case, responseCase);
          this._listCaseServices.getTokenReplicacion().subscribe(responseToken => {
            this.token = getToken(this.token, responseToken);
            this._listCaseServices.get_ComplementaryData(detailReasonId, motiveId, this.token)
              .subscribe(responseComplemetary => {
                this.loading = false;
                this.objComplementaryDataArray = deserialize<ComplementaryData[]>(ComplementaryData, responseComplemetary);
                this.isComplentaryData = true;
                this.isTipificacion = true;
                this.datosComplementariosHijo.objComplementaryData = this.objComplementaryDataArray;
                this.datosComplementariosHijo.datosComplementarios();

                Swal.fire({
                  type: 'success',
                  title: 'Enhorabuena...',
                  text:'El caso del cliente fue creado con éxito',
                  footer: '<a>Continua ingresando los datos complementarios</a>',
                  confirmButtonColor: '#dc3545'
                });
              },
                err => console.log(err));
          },
            err => console.log(err));
        },
          err => console.log(err));
      },
        err => console.log(err));
    }

  }

  validateFields() {
    this.isValidate = true;

    let moment: any = document.getElementById('fieldMomento');
    let activity: any = document.getElementById('fieldAcividadMomento');
    let reason: any = document.getElementById('fieldRazon');
    let reasonDetail: any = document.getElementById('fieldDetalleRazon');
    let motive: any = document.getElementById('fieldMotivo');
    let source: any = document.getElementById('fieldFuente');

    if (this.objCase.caseTitle == "" || this.objCase.caseTitle == undefined) {
      this.isValidTitleCase = "is-invalid";
      this.isValidate = false;
    } else {
      this.isValidTitleCase = "";
    }

    if (this.objCase.description == "" || this.objCase.description == undefined) {
      this.isValidDescription = "is-invalid";
      this.isValidate = false;
    } else {
      this.isValidDescription = "";
    }

    if (moment.options[moment.selectedIndex].text == "") {
      this.isValidMoment = "is-invalid";
      this.isValidate = false;
    } else {
      this.isValidMoment = "";
    }

    if (activity.options[activity.selectedIndex].text == "") {
      this.isValidActivity = "is-invalid";
      this.isValidate = false;
    } else {
      this.isValidActivity = "";
    }

    if (reason.options[reason.selectedIndex].text == "") {
      this.isValidReason = "is-invalid";
      this.isValidate = false;
    } else {
      this.isValidReason = "";
    }

    if (reasonDetail.options[reasonDetail.selectedIndex].text == "") {
      this.isValidReasonDetail = "is-invalid";
      this.isValidate = false;
    } else {
      this.isValidReasonDetail = "";
    }

    if (motive.options[motive.selectedIndex].text == "") {
      this.isValidMotive = "is-invalid";
      this.isValidate = false;
    } else {
      this.isValidMotive = "";
    }

    if (source.options[source.selectedIndex].text == "") {
      this.isValidSource = "is-invalid";
      this.isValidate = false;
    } else {
      this.isValidSource = "";
    }
  }

  clearFields(){
    this.objCase.caseTitle="";
    this.objCase.description="";
    this.isValidTitleCase = "";
    this.isValidDescription = "";
    this.isValidMoment = "";
    this.isValidActivity = "";
    this.isValidReason = "";
    this.isValidReasonDetail = "";
    this.isValidMotive = "";
    this.isValidSource = "";

    let moment: any = document.getElementById('fieldMomento');
    let source: any = document.getElementById('fieldFuente');

    moment.selectedIndex = 0;
    source.selectedIndex = 0;

    this.objActivity = null;
    this.objReason = null;
    this.objReasonDetail = null;
    this.objMotive = null;
  }
}

function getToken(token: string, responseToken: Object) {
  token = responseToken["request"];
  return token;
}
