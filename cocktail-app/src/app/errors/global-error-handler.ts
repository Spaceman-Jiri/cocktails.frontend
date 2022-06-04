import { HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";


export function handleError(err: any): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
        errorMessage = `An error occurred: ${err.error.message}`;
    } else if (err instanceof HttpErrorResponse) {
        errorMessage = `'${err.status} ${err.statusText}' when accessing '${err.url}'`;
    } else {
        errorMessage = err;
    }
    return throwError(errorMessage);
}
