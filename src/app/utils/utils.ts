import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastComponent } from '../toast/toast.component';

export function toast(
  _snackBar: MatSnackBar,
  message: string,
  type: 'success' | 'error' | 'warning' | 'info',
  duration: number
) {
  let styles;
  switch (type) {
    case 'success':
      styles = ['bg-green-400', 'text-white'];
      break;
    case 'error':
      styles = ['bg-red', 'text-white'];
      break;
    case 'warning':
      styles = ['bg-yellow-400', 'text-white'];
      break;
    case 'info':
      styles = ['bg-blue-400', 'text-white'];
      break;
  }

  _snackBar.openFromComponent(ToastComponent, {
    duration,
    panelClass: styles,
    data: {
      message,
      type,
    },
    horizontalPosition: 'end',
    verticalPosition: 'top',
  });
}
