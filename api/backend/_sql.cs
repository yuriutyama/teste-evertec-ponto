using api.Models;
using Microsoft.Data.SqlClient;
using System.Data;
using System.Text.Json;
using System.Text.Unicode;

namespace api
{
    public static class _sql
    {
        static string conexaoBD =  @"Data Source=localhost;
      Initial Catalog=PontoTuristico;
      Integrated Security=True;
      Connect Timeout=30;
      Encrypt=False;
      TrustServerCertificate=False;
      ApplicationIntent=ReadWrite;
      MultiSubnetFailover=False;";



        public static void Executar(string procedure, params SqlParameter[] parametros)
        {
            using SqlConnection conexao = new(conexaoBD);
            using SqlCommand comando = new(procedure, conexao);
            comando.CommandType = CommandType.StoredProcedure;
            comando.Parameters.AddRange(parametros);

            conexao.Open();
            comando.ExecuteNonQuery();
        }

        public static string? ExecutarReader(string procedure, bool resultadoUnico = false, params SqlParameter[] parametros)
        {
            using SqlConnection conexao = new(conexaoBD);
            conexao.Open();
            using SqlCommand comando = new(procedure, conexao);
            comando.CommandType = CommandType.StoredProcedure;
            comando.Parameters.AddRange(parametros);

            using SqlDataReader reader = comando.ExecuteReader();
            IList<PontoTuristico> resultados = new List<PontoTuristico>();
            if (reader.HasRows)
            {
                while (reader.Read())
                    resultados.Add(new PontoTuristico(reader.GetFieldValue<int>("Id"), reader.GetFieldValue<string>("Nome"), reader.GetFieldValue<string>("Descricao"), reader.GetFieldValue<string>("Localizacao"), reader.GetFieldValue<DateTime>("DataCadastro")));
            }

            JsonSerializerOptions opcoes = new()
            {
                Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping
            };
            if (resultadoUnico)
            {
                var resultado = resultados.SingleOrDefault();
                if (resultado == null)
                {
                    return null;
                }
                string JsonString = JsonSerializer.Serialize(resultado, opcoes);
                return JsonString;
            }
            else
            {
                string JsonString = JsonSerializer.Serialize(resultados, opcoes);
                return JsonString;
            }
        }
    }
}
