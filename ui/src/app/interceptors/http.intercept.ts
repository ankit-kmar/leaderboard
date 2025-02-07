import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor, HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class HttpIntercept implements HttpInterceptor {
  constructor(public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedRequest = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
      },
    });

    const loading = this.loadingCtrl.create({
      message: 'Please wait...',
    });

    loading.then(loader => {
      loader.present();
    });

    return next.handle(modifiedRequest)
      .pipe(
        tap(event => {
          if (event.type === HttpEventType.Response) {
            loading.then(loader => {
              loader.dismiss();
            });
          }
        }),
        catchError((error: HttpErrorResponse) => {
          const errorMessage = `Error Status: ${error.status}`;
          loading.then(loader => {
            loader.dismiss();
          });
          this.toastCtrl.create({
            message: 'Error Occurred\n' + errorMessage,
            buttons: [{ text: 'close' }],
            position: 'top',
            color: 'danger',
          }).then(toaster => toaster.present());
          return throwError(errorMessage);
        }),
      );
  }
}
