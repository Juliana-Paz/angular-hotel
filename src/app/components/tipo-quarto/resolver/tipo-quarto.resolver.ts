import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";

import { inject } from "@angular/core";
import { TipoQuarto } from "../../../models/tipo-quarto.model";
import { TipoQuartoService } from "../../../services/tipo-quarto.service";

export const TipoQuartoResolver: ResolveFn<TipoQuarto> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(TipoQuartoService).findById(route.paramMap.get('id')!);
    }