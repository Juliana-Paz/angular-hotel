import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  email: string = '';
  senha: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  login(): void {
    this.authService.login(this.email, this.senha).subscribe(
      (res) => {
        this.router.navigateByUrl('/');
      },
      (err) => {
        console.log(err);
      }
    );
  }

}