import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services';

export const adminGuard: CanActivateFn = (route, state) => {

  const userService = inject( UserService  );
  const router = inject( Router );

  if ( userService.userRole[0] !== 'admin' ) {
    router.navigateByUrl('/dashboard');
    return false
  }
  
  return true 
};
