import { Component } from '@angular/core';
import moment from 'moment';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor() {}

  lans: any = [];
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

  private handle(json: any[]) {
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
          dateStatus: moment(date, 'YYYYMMDD').toISOString(),

          /*    qtdCobranca: string;
          periodo: string;
          done: boolean;
          dateInicio: string;
          status: string;
          dateCancelamento?: number;
          valor: string;
          renovacao: string; */
        };

        key.value = Math.abs(key.value);

        if (lan.status === 'Cancelada') {
          key.value = -key.value;
        }

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
      });
    } catch (e) {
      alert(e);
    }
  }
}

export interface Lan {
  dateStatus: string;
  qtdCobranca: string;
  periodo: string;
  done: boolean;
  dateInicio: string;
  status: string;
  dateCancelamento?: number;
  valor: string;
  renovacao: string;
}
