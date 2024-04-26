import { TipoQuarto } from './tipo-quarto.model';
import { Amenidade } from "./amenidade.model";

export interface Quarto {
  id: number;
  nome: string;
  valor: number;
  descricao: string;
  isReservado: boolean;
  isAtivo: boolean;
  tipoQuarto: TipoQuarto;
  amenidades: Amenidade[];
}
