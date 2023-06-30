import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { AuthService } from "../services/auth.service";

export const AuthGuard = ()=>{
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLogged().then( dt => {
    if(dt){
      return  true;
    }else{
      router.navigate(['/login']);
      return false;
    }
  });
} 

