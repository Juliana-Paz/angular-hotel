import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";

import { inject } from "@angular/core";
import { Servico } from "../../../models/servico.model";
import { ServicoService } from "../../../services/servico.service";

export const servicoResolver: ResolveFn<Servico> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(ServicoService).findById(route.paramMap.get('id')!);
    }