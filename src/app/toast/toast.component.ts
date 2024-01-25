import { Component, Inject, OnInit } from '@angular/core';
import {
    MatSnackBarRef,
    MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
    constructor(
        @Inject(MAT_SNACK_BAR_DATA) public data: any,
        public _snackRef: MatSnackBarRef<ToastComponent>
    ) {}

    ngOnInit(): void {}

    dismiss() {
        this._snackRef.dismiss();
    }
}
