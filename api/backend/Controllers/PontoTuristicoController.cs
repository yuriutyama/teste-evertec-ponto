using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PontoTuristicoController : ControllerBase
    {
        [HttpGet]
        public string Get()
        {
            string resultado = _sql.ExecutarReader("dbo.ListarPontos");
            return resultado;
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            SqlParameter paramId = new("@Id", SqlDbType.Int)
            {
                Value = id
            };

            string resultado = _sql.ExecutarReader("dbo.BuscarPonto", true, paramId);

            if (string.IsNullOrEmpty(resultado) || resultado == "null" || resultado == null)
                return NotFound($"Registro não localizado!");


            try
            {
                var ponto = System.Text.Json.JsonSerializer.Deserialize<PontoTuristico>(resultado);

                if (ponto == null)
                    return NotFound($"Registro não localizado!");


                return Ok(ponto);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro ao processar os dados: {ex.Message}");
            }
        }

        [HttpPost]
        public void Post([FromBody] PontoTuristico objeto)
        {
            try
            {

                SqlParameter paramNome = new("@Nome", SqlDbType.VarChar);
                SqlParameter paramDescricao = new("@Descricao", SqlDbType.VarChar);
                SqlParameter paramLocalizacao = new("@Localizacao", SqlDbType.VarChar);
                SqlParameter paramDataCadastro = new("@DataCadastro", SqlDbType.DateTime);

                paramNome.Value = objeto.Nome;
                paramDescricao.Value = objeto.Descricao;
                paramLocalizacao.Value = objeto.Localizacao;
                paramDataCadastro.Value = DateTime.Now;

                _sql.Executar("dbo.AdicionarPonto", paramNome, paramDescricao, paramLocalizacao, paramDataCadastro);
            }
            catch { }
        }


        [HttpPut("{id}")]
        public void Put(int id, [FromBody] PontoTuristico objeto)
        {
            try
            {

                SqlParameter paramId = new("@Id", SqlDbType.Int);
                SqlParameter paramNome = new("@Nome", SqlDbType.VarChar);
                SqlParameter paramDescricao = new("@Descricao", SqlDbType.VarChar);
                SqlParameter paramLocalizacao = new("@Localizacao", SqlDbType.VarChar);

                paramId.Value = id;
                paramNome.Value = objeto.Nome;
                paramDescricao.Value = objeto.Descricao;
                paramLocalizacao.Value = objeto.Localizacao;

                _sql.Executar("dbo.AlterarPonto", paramId, paramNome, paramDescricao, paramLocalizacao);
            }
            catch { }
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            try
            {
                SqlParameter paramId = new("@Id", SqlDbType.Int)
                {
                    Value = id
                };

                _sql.Executar("dbo.ExcluirPonto", paramId);
            }
            catch { }
        }
    }
}
