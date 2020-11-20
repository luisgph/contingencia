import { Component, Input, OnInit } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';
import { ComplementaryData, ComplementaryDataFields } from '../../models/models';

@Component({
  selector: 'app-datos-complementarios',
  templateUrl: './datos-complementarios.component.html',
  styleUrls: ['./datos-complementarios.component.css']
})
export class DatosComplementariosComponent implements OnInit {
  @Input() objComplementaryData: ComplementaryData[] = [];
  objComplementaryDataField: ComplementaryDataFields = new ComplementaryDataFields();

  constructor() {
  }

  ngOnInit() {
  }

  datosComplementarios() {
    this.objComplementaryData.forEach(element => {
      switch (element.name) {
        case "Aerolínea":
          this.objComplementaryDataField.fieldAerolineaHidden = false;
          break;
        case "AHL":
          this.objComplementaryDataField.fieldAHLHidden = false;
          break;
        case "Base":
          this.objComplementaryDataField.fieldBaseHidden = false;
          break;
        case "Cabina":
          this.objComplementaryDataField.fieldCabinaHidden = false;
          break;
        case "Canal de chequeo":
          this.objComplementaryDataField.fieldCanalChequeoHidden = false;
          break;
        case "Canal de Compra":
          this.objComplementaryDataField.fieldCanalCompraHidden = false;
          break;
        case "Cantidad de Pasajeros":
          this.objComplementaryDataField.fieldCantidadPasajerosHidden = false;
          break;
        case "Cantidad de Pasajeros Adultos":
          this.objComplementaryDataField.fieldCantidadPasajerosAdultosHidden = false;
          break;
        case "Cantidad de Pasajeros Infantes":
          this.objComplementaryDataField.fieldCantidadPasajerosInfantesHidden = false;
          break;
        case "Cantidad de Pasajeros Niños":
          this.objComplementaryDataField.fieldCantidadPasajerosNinosHidden = false;
          break;
        case "Ciudad de Emisión":
          this.objComplementaryDataField.fieldCiudadEmisionHidden = false;
          break;
        case "Clase Tarifaria":
          this.objComplementaryDataField.fieldClaseTarifariaHidden = false;
          break;
        case "Código de Reserva":
          this.objComplementaryDataField.fieldCodigoReservaHidden = false;
          break;
        case "Código Promocional":
          this.objComplementaryDataField.fieldCodigoPromocionalHidden = false;
          break;
        case "Destino":
          this.objComplementaryDataField.fieldDestinoHidden = false;
          break;
        case "Detalle razón (Complementaria)":
          this.objComplementaryDataField.fieldDetalleRazonHidden = false;
          break;
        case "DPR":
          this.objComplementaryDataField.fieldDPRHidden = false;
          break;
        case "Etiqueta de Equipaje":
          this.objComplementaryDataField.fieldEtiquetaEquipajeHidden = false;
          break;
        case "Fecha de Vuelo":
          this.objComplementaryDataField.fieldFechaVueloHidden = false;
          break;
        case "Irregularidad":
          this.objComplementaryDataField.fieldIrregularidadHidden = false;
          break;
        case "Nombre de Colaborador":
          this.objComplementaryDataField.fieldNombreColaboradorHidden = false;
          break;
        case "Nombre de la herramienta":
          this.objComplementaryDataField.fieldNombreHerramientaHidden = false;
          break;
        case "Número de Boleto":
          this.objComplementaryDataField.fieldNumeroBoletoHidden = false;
          break;
        case "Número de Caso":
          this.objComplementaryDataField.fieldNumeroCasoHidden = false;
          break;
        case "Número de EMD":
          this.objComplementaryDataField.fieldNumeroEMDHidden = false;
          break;
        case "Número de Vuelo":
          this.objComplementaryDataField.fieldNumeroVueloHidden = false;
          break;
        case "Objeto olvidado (Fitems)":
          this.objComplementaryDataField.fieldObjetoOlvidadoHidden = false;
          break;
        case "Origen":
          this.objComplementaryDataField.fieldOrigenHidden = false;
          break;
        case "Placa de Boleto":
          this.objComplementaryDataField.fieldPlacaBoletoHidden = false;
          break;
        case "Placa de Boleto de EMD":
          this.objComplementaryDataField.fieldPlacaBoletodeEMDHidden = false;
          break;
        case "Razón (Complementaria)":
          this.objComplementaryDataField.fieldRazonHidden = false;
          break;
        case "Tipo de Acumulación o Redención":
          this.objComplementaryDataField.fieldTipoAcumulacionoRedencionHidden = false;
          break;
        case "Tipo de Boleto":
          this.objComplementaryDataField.fieldTipoBoletoHidden = false;
          break;
        case "Tipo de compra":
          this.objComplementaryDataField.fieldTipoCompraHidden = false;
          break;
        case "Tipo de Elemento Dañado":
          this.objComplementaryDataField.fieldTipoElementoDanadoHidden = false;
          break;
        case "Tipo de inconsistencia":
          this.objComplementaryDataField.fieldTipoInconsistenciaHidden = false;
          break;
        case "Tipo de Manejo Especial":
          this.objComplementaryDataField.fieldTipoManejoEspecialHidden = false;
          break;
        case "Viajero Frecuente a Unificar":
          this.objComplementaryDataField.fieldViajeroFrecuenteaUnificarHidden = false;
          break;
        case "Viajero Frecuente Activo":
          this.objComplementaryDataField.fieldViajeroFrecuenteActivoHidden = false;
          break;
        default:
      }
    });
  }
}
