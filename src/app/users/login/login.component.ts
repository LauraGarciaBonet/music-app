import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { User } from './user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title:string='Please Login';
  user: User=new User();

  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
    if (this.authService.token) {
      swal('Login', `Hola ${this.authService.user.username} ya estás autenticado!`, 'info');
      this.router.navigate(['/songs']);
    }
  }
  login(): void {
    console.log(this.user);
    if (this.user.username == null || this.user.password == null) {
      swal('Error Login', 'Username o password vacías!', 'error');
      return;
    }
    this.authService.login(this.user).subscribe(
      response => {
        console.log(response);

      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      let usuario = this.authService.user;

        this.router.navigate(['/songs']);
        swal('Login', `Hola ${this.user.username},has iniciado sesión con éxito!`,'success');
      },
      err =>{
        if(err.status == 400){
          swal("Error Login","Usuario o clave incorrectas!","error");
        }
      }
    );
  }

}
