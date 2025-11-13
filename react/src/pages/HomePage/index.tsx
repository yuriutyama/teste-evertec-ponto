import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./styles.css";
import Paginacao from "../../components/Paginacao/Paginacao";
import { PontoTuristico } from "../../model/PontoTuristico";
import ItemPontoTuristico from "../../components/ItemPontoTuristico/ItemPontoTuristico";

export function Home() {
  const [pontos, setPontos] = useState<PontoTuristico[]>([]);
  const [pontosFiltrados, setPontosFiltrados] = useState<PontoTuristico[]>([]);

  const [paginaAtual, setPaginaAtual] = useState<number>(1);
  const [itensPorPagina, setItensPorPagina] = useState<number>(5);
  const indexUltimoItem = paginaAtual * itensPorPagina;
  const indexPrimeiroItem = indexUltimoItem - itensPorPagina;

  const pontosCadastrados: PontoTuristico[] = pontosFiltrados.slice(
    indexPrimeiroItem,
    indexUltimoItem
  );

  useEffect(() => {
    axios.get("https://localhost:7291/api/PontoTuristico").then((response) => {
      setPontos(response.data);
    });
  }, []);

  useEffect(() => {
    pontos.sort((a, b) => {
      if (a.DataCadastro > b.DataCadastro) return -1;
      if (a.DataCadastro < b.DataCadastro) return 1;
      return 0;
    });
    setPontosFiltrados(pontos);
  }, [pontos]);

  function deletePonto(id: number) {
    if (!confirm("Confirma exclusão?")) return;

    axios
      .delete("https://localhost:7291/api/PontoTuristico/" + id)
      .catch(() => {
        alert("Ocorreu um erro, tente novamente!");
      });

    setPontos(pontos.filter((ponto) => ponto.Id !== id));
  }

  function Pesquisa(pesquisa: string) {
    if (pesquisa !== "") {
      const filtrados: PontoTuristico[] = pontos.filter((ponto) => {
        return (
          ponto.Nome.toLocaleLowerCase().indexOf(pesquisa.toLocaleLowerCase()) >
            -1 ||
          ponto.Descricao.toLocaleLowerCase().indexOf(
            pesquisa.toLocaleLowerCase()
          ) > -1 ||
          ponto.Localizacao.toLocaleLowerCase().indexOf(
            pesquisa.toLocaleLowerCase()
          ) > -1
        );
      });
      setPontosFiltrados(filtrados);
    } else {
      setPontosFiltrados(pontos);
    }
  }

  const paginar = (numeroPagina: number) => setPaginaAtual(numeroPagina);

  return (
    <div className="container form">
      <div className="row">
        <div className="col-md-6"></div>
        <div className="col-md-6 text-end">
          <Link className="btn btn-info" to="Cadastrar">
            + Novo
          </Link>
        </div>
      </div>

      <input
        className="input-busca"
        type="text"
        onChange={(e) => Pesquisa(e.target.value)}
        placeholder="Pesquisar..."
      />
      {pontosFiltrados.length > 0 ? (
        pontosCadastrados.map((ponto) => {
          return (
            <ItemPontoTuristico
              key={ponto.Id}
              item={ponto}
              deletar={deletePonto}
            />
          );
        })
      ) : (
        <p className="mt-3 fw-bold">Não foi localizado nenhum registro.</p>
      )}
      <div className="container-paginacao">
        <Paginacao
          itensPorPagina={itensPorPagina}
          totalItens={pontosFiltrados.length}
          paginar={paginar}
        />
      </div>
    </div>
  );
}
