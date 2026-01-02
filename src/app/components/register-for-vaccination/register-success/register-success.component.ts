import {Component} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {TranslateModule} from '@ngx-translate/core';
import {QRCodeComponent} from 'angularx-qrcode';

@Component({
  selector: 'app-register-success',
  templateUrl: './register-success.component.html',
  styleUrls: ['./register-success.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    TranslateModule,
    QRCodeComponent
  ]
})
export class RegisterSuccessComponent {

}
