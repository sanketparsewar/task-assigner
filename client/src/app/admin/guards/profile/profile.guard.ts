import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const profileGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)

  if (!localStorage.getItem('adminToken')) {
    router.navigateByUrl('/admin/auth/login')
    return false;
  }
  return true;
};
