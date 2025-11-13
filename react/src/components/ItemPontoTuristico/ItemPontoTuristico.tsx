import { Link, useNavigate } from "react-router-dom";
import { FiTrash, FiEdit3 } from "react-icons/fi";
import "./styles.css";
import { PontoTuristico } from "../../model/PontoTuristico";

type ItemListaProps = {
  item: PontoTuristico;
  deletar: (...args: any[]) => any;
};

export default function ItemPontoTuristico(props: ItemListaProps) {
  return (
    <div className="container itens">
      <div className="item">
        <p className="nome">{props.item.Nome}</p>
        <p className="cidade">Cidade / Localização: {props.item.Localizacao}</p>
      </div>

      <div className="opcoes text-end">
        <Link className="btn btn-primary" to={"/editar/" + props.item.Id}>
          <small className="fst-italic">Editar</small>
        </Link>
        <Link
          className="btn btn-danger"
          onClick={() => props.deletar(props.item.Id)}
          to={"/"}
        >
          <small className="fst-italic">Excluir</small>
        </Link>
      </div>
    </div>
  );
}
