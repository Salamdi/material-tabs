/**
 * Created by developer on 03.05.17.
 */
import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';
@Injectable()
export class SnackbarService {
    defaultMessage: string = 'Произошла ошибка, повторите попытку позже...';
    defaultDuration: number = 5000;

    constructor(private snackbar: MdSnackBar) { }

    public open(mssg: string = this.defaultMessage, duration: number = this.defaultDuration): void {
        this.snackbar.open(mssg, '', {duration: duration});
    }
}
