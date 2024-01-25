import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import moment from 'moment';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  processedDone: boolean = false;
  status: any;
  processing: number = 0;
  constructor(
    private _snackBar: MatSnackBar //  private _indexService: indexService
  ) {}

  lans: any = [];
  teste = 1;
  title = 'challenge_planilha';
  loadingData: boolean = false;

  dateError: number = 0;

  public dropped(file: any) {
    // Is it a file?
    if (file[0].fileEntry.isFile) {
      const fileEntry = file[0].fileEntry as FileSystemFileEntry;
      fileEntry.file((files: File) => {
        try {
          if (!files) {
            throw new Error('');
          }
          const reader = new FileReader();
          reader.onload = (e: any) => {
            const data = e.target.result;
            const workbook: XLSX.WorkBook = XLSX.read(data, {
              raw: false,
              type: 'binary',
            });
            const { SheetNames } = workbook;
            const json = XLSX.utils.sheet_to_json(
              workbook.Sheets[SheetNames[0]]
            );
            this.handle(json);
          };
          reader.readAsBinaryString(files);
        } catch (err) {
          console.log(err);
        }
      });
    }
  }

  private async handle(json: any[]) {
    try {
      this.dateError = 0;
      this.lans = [];
      json.map((lan) => {
        const { d, m, y } = XLSX.SSF.parse_date_code(lan.dataStatus);

        const date =
          y.toString() +
          m.toString().padStart(2, '0') +
          d.toString().padStart(2, '0');
        if (!moment(date, 'YYYYMMDD').toISOString()) {
          this.dateError += 1;
        }
        const key: any = {
          user: lan.IDassinante,
          dateStatus: moment(date, 'YYYYMMDD').toISOString(),
          qtdCobranca: lan.quantidadeCobranças,
          periodo: lan.cobradaAcadaXdias,
          dateInicio: lan.dataInício,
          status: lan.status,
          dateCancelamento: lan.dataCancelamento || null,
          valor: lan.valor,
          renovacao: lan.próximoCiclo,
        };

        key.valor = Math.abs(key.valor);

        Object.keys(key).map((obj) => {
          if (key[obj] === undefined) {
            throw Error(
              'Lançamento do dia ' +
                key.date +
                ' está com ' +
                obj +
                ' inválido(a)!'
            );
          }
        });
        this.lans.push(key);

        this.status = `Importando dados (${this.lans.length}/${json.length})`;
      });
      console.log(this.lans);
      this.teste = 2;
      this.loadingData = true;
      // await this._indexService.postLancamento(this.lans);
      /*   toast(
        this._snackBar,
        'Erro! Por favor, selecione a empresa.',
        'error',
        5000
      ); */
    } catch (e) {
      alert(e);
    }
  }
}
