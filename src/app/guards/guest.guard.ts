import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const GuestGuard = ()=>{
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLogged().then( dt => {
    if(dt){
      router.navigate(['/home']);
      return false;
    }else{
      return true;
    }
  });
} 