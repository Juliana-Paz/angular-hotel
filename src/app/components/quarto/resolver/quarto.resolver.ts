import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";

import { inject } from "@angular/core";
import { Quarto } from "../../../models/quarto.model";
import { QuartoService } from "../../../services/quarto.service";

export const QuartoResolver: ResolveFn<Quarto> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(QuartoService).findById(route.paramMap.get('id')!);
    }