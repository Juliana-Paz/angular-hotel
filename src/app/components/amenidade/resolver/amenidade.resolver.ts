import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";

import { inject } from "@angular/core";
import { Amenidade } from "../../../models/amenidade.model";
import { AmenidadeService } from "../../../services/amenidade.service";

export const amenidadeResolver: ResolveFn<Amenidade> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(AmenidadeService).findById(route.paramMap.get('id')!);
    }