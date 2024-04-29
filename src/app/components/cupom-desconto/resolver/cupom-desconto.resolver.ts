import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";

import { inject } from "@angular/core";
import { CupomDesconto } from "../../../models/cupom-desconto.model";
import { CupomDescontoService } from "../../../services/cupom-desconto.service";

export const cupomDescontoResolver: ResolveFn<CupomDesconto> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(CupomDescontoService).findById(route.paramMap.get('id')!);
    }