import { TipoQuarto } from "../models/tipo-quarto.model";


export interface CupomDescontoDTO {
  id: number,
  codigo: string;
  descricao: string;
  valor: number;
  dataValidade: string;
  ids_tipoQuarto: number[]
}
