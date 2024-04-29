import { TipoQuarto } from './tipo-quarto.model';

export interface CupomDesconto {
  id: number,
  codigo: string;
  descricao: string;
  valor: number;
  dataValidade: string;
  tipoQuarto: TipoQuarto;
}
