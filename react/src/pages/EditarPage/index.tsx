import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { PontoTuristico } from "../../model/PontoTuristico";
import { isEmptyString } from "../../utils/validaString";
import "./styles.css";

export default function Editar() {
  const { _id } = useParams();
  const navegacao = useNavigate();
  const [id, setId] = useState<number>(0);
  const [nome, setNome] = useState<string>("");
  const [cidade, setCidade] = useState<string>("");
  const [uf, setUf] = useState<string>("");
  const [referencia, setReferencia] = useState<string>("");
  const [data, setData] = useState<Date>(new Date());

  const [descricao, setDescricao] = useState<string>("");
  const descricaoMax = 100;

  const UFs: string[] = [
    "",
    "AC",
    "AL",
    "AM",
    "AP",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MG",
    "MS",
    "MT",
    "PA",
    "PB",
    "PE",
    "PI",
    "PR",
    "RJ",
    "RN",
    "RO",
    "RR",
    "RS",
    "SC",
    "SE",
    "SP",
    "TO",
  ];

  const isEmptyString = (data: string): boolean =>
    typeof data === "string" && data.trim().length == 0;
  useEffect(() => {
    axios
      .get("https://localhost:7291/api/PontoTuristico/" + _id)
      .then((response) => {
        const pontoTuristico = response.data;

        setId(pontoTuristico.id ?? 0);
        setNome(pontoTuristico.nome ?? "");
        setDescricao(pontoTuristico.descricao ?? "");

        if (pontoTuristico.localizacao) {
          if (pontoTuristico.localizacao.includes("-")) {
            const [cidadeLocal, ufLocal] =
              pontoTuristico.localizacao.split("-");
            setCidade(cidadeLocal ?? "");
            setUf(ufLocal ?? "");
            setReferencia("");
          } else {
            setReferencia(pontoTuristico.localizacao ?? "");
            setCidade("");
            setUf("");
          }
        } else {
          setReferencia("");
          setCidade("");
          setUf("");
        }
      })
      .catch((err) => {
        console.error("Erro ao carregar ponto turístico:", err);
      });
  }, [_id]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let localizacao: string = "";
    if (!isEmptyString(uf) && !isEmptyString(cidade))
      localizacao = cidade + "-" + uf;
    else if (!isEmptyString(referencia)) localizacao = referencia;
    else alert("Informe uma Cidade-UF ou uma referência.");

    const novoPonto: PontoTuristico = {
      Id: id,
      Nome: nome,
      Descricao: descricao,
      Localizacao: localizacao,
      DataCadastro: data,
    };
    console.log(novoPonto);
    axios
      .put("https://localhost:7291/api/PontoTuristico/" + id, novoPonto)
      .catch(() => {
        alert("Ocorreu um erro, tente novamente!");
      });

    navegacao("/");
  }

  return (
    <div className="container form">
      <h2>Editar</h2>

      <form onSubmit={handleSubmit}>
        <label>Ponto Turístico:</label>
        <input
          type="text"
          placeholder="Ponto Turístico"
          required={true}
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <label>UF / Cidade:</label>
        <div className="grupo-input">
          <select
            style={{ width: 85 }}
            value={uf}
            onChange={(e) => setUf(e.target.value)}
          >
            {UFs.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
          <input
            type="text"
            placeholder="Cidade"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
          />
        </div>
        <label>Referência:</label>
        <input
          type="text"
          placeholder="Referência"
          value={referencia}
          onChange={(e) => setReferencia(e.target.value)}
        />
        <label>Descrição:</label>
        <textarea
          placeholder="Descrição"
          required={true}
          maxLength={descricaoMax}
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <div className="botoes">
          <button className="btn btn-success w-50" type="submit">
            Salvar
          </button>
          <button className="btn btn-danger w-50" type="button">
            <Link to="/">Cancelar</Link>
          </button>
        </div>
      </form>
    </div>
  );
}
