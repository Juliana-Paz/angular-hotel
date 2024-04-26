import { Routes } from '@angular/router';
import { TipoQuartoListComponent } from './components/tipo-quarto/tipo-quarto-list/tipo-quarto-list.component';
import { TipoQuartoFormComponent } from './components/tipo-quarto/tipo-quarto-form/tipo-quarto-form.component';
import { TipoQuartoResolver } from './components/tipo-quarto/resolver/tipo-quarto.resolver';
import { AmenidadeListComponent } from './components/amenidade/amenidade-list/amenidade-list.component';
import { AmenidadeFormComponent } from './components/amenidade/amenidade-form/amenidade-form.component';
import { amenidadeResolver } from './components/amenidade/resolver/amenidade.resolver';
import { QuartoListComponent } from './components/quarto/quarto-list/quarto-list.component';
import { QuartoFormComponent } from './components/quarto/quarto-form/quarto-form.component';

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
    }
];
