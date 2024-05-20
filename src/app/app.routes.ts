import { CupomDesconto } from './models/cupom-desconto.model';
import { Routes } from '@angular/router';
import { TipoQuartoListComponent } from './components/tipo-quarto/tipo-quarto-list/tipo-quarto-list.component';
import { TipoQuartoFormComponent } from './components/tipo-quarto/tipo-quarto-form/tipo-quarto-form.component';
import { TipoQuartoResolver } from './components/tipo-quarto/resolver/tipo-quarto.resolver';
import { AmenidadeListComponent } from './components/amenidade/amenidade-list/amenidade-list.component';
import { AmenidadeFormComponent } from './components/amenidade/amenidade-form/amenidade-form.component';
import { amenidadeResolver } from './components/amenidade/resolver/amenidade.resolver';
import { QuartoListComponent } from './components/quarto/quarto-list/quarto-list.component';
import { QuartoFormComponent } from './components/quarto/quarto-form/quarto-form.component';
import { ServicoListComponent } from './components/servico/servico-list/servico-list.component';
import { ServicoFormComponent } from './components/servico/servico-form/servico-form.component';
import { servicoResolver } from './components/servico/resolver/servico.resolver';
import { quartoResolver } from './components/quarto/resolver/quarto.resolver';
import { CupomDescontoListComponent } from './components/cupom-desconto/cupom-desconto-list/cupom-desconto-list.component';
import { CupomDescontoFormComponent } from './components/cupom-desconto/cupom-desconto-form/cupom-desconto-form.component';
import { cupomDescontoResolver } from './components/cupom-desconto/resolver/cupom-desconto.resolver';
import { AuthComponent } from './components/auth/auth.component';

export const routes: Routes = [
    {
        path: 'tipo-quarto/list',
        component: TipoQuartoListComponent
    },
    {
        path: 'tipo-quarto/form',
        component: TipoQuartoFormComponent
    },
    {
        path: 'tipo-quarto/edit/:id',
        component: TipoQuartoFormComponent,
        resolve: { tipoQuarto: TipoQuartoResolver }
    },
    {
        path: 'amenidade/list',
        component: AmenidadeListComponent,
    },
    {
        path: 'amenidade/form',
        component: AmenidadeFormComponent,
    },
    {
        path: 'amenidade/edit/:id',
        component: AmenidadeFormComponent,
        resolve: { amenidade: amenidadeResolver }
    },
    {
        path: 'quarto/list',
        component: QuartoListComponent,
    },
    {
        path: 'quarto/form',
        component: QuartoFormComponent
    },
    {
        path: 'quarto/edit/:id',
        component: QuartoFormComponent,
        resolve: { quarto: quartoResolver }
    },
    {
        path: 'servico/list',
        component: ServicoListComponent,
    },
    {
        path: 'servico/form',
        component: ServicoFormComponent
    },
    {
        path: 'servico/edit/:id',
        component: ServicoFormComponent,
        resolve: { servico: servicoResolver }
    },
    {
        path: 'cupom-desconto/list',
        component: CupomDescontoListComponent,
    },
    {
        path: 'cupom-desconto/form',
        component: CupomDescontoFormComponent
    },
    {
        path: 'cupom-desconto/edit/:id',
        component: CupomDescontoFormComponent,
        resolve: { cupomDesconto: cupomDescontoResolver }
    },
    {
        path: 'login',
        component: AuthComponent
      },
];
