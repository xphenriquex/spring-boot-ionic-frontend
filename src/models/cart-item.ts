import { ProdutoDTO } from "./produto.dtp";

export interface CartItem {
    quantidade: number,
    produto: ProdutoDTO
}