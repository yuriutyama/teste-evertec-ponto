import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

type PontoTuristico = {
  Id: number;
  Nome: string;
  Descricao: string;
  Localizacao: string;
  DataCadastro: Date;
};

export default function Cadastro() {
  const [nome, setNome] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [cidade, setCidade] = useState<string>("");
  const [uf, setUf] = useState<string>("");
  const [referencia, setReferencia] = useState<string>("");
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

  const navegacao = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let localizacao: string = "";
    if (!isEmptyString(uf) && !isEmptyString(cidade))
      localizacao = cidade + "-" + uf;
    else if (!isEmptyString(referencia)) localizacao = referencia;
    else {
      alert("Informe uma Cidade/UF ou uma referência.");
      return;
    }

    const novo: PontoTuristico = {
      Id: 0,
      Nome: nome,
      Descricao: descricao,
      Localizacao: localizacao,
      DataCadastro: new Date(),
    };

    axios
      .post("https://localhost:7291/api/PontoTuristico", novo)
      .then(() => alert("Cadastrado com sucesso!"))
      .catch((err) => {
        console.error(err);
        alert("Ocorreu um erro, tente novamente!");
      });

    navegacao("/");
  }

  useEffect(() => {
    if (!isEmptyString(referencia)) {
      setUf("");
      setCidade("");
    }
  }, [referencia]);

  useEffect(() => {
    if (!isEmptyString(uf) || !isEmptyString(cidade)) {
      setReferencia("");
    }
  }, [uf, cidade]);

  return (
    <div className="container form">
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
            style={{ width: 90 }}
            value={uf}
            onChange={(e) => setUf(e.target.value)}
            className="ml-2"
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
        <p>
          <small className="info">
            {descricao.length}/{descricaoMax}
          </small>
        </p>
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
