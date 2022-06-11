using EasyEnglishApi.Models;
using EasyEnglishApi.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EasyEnglishApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VocabularyController : ControllerBase
    {
        IVocabularyService _vocabularyService;

        public VocabularyController(IVocabularyService vocabularyService)
        {
            _vocabularyService = vocabularyService;
        }

        // GET: api/<VocabularyController>
        [HttpGet]
        public async Task<IEnumerable<Word>> GetAsync()
        {
            return await _vocabularyService.GetWordsAsync();
        }

        // POST api/<VocabularyController>
        [HttpPost]
        public IActionResult Add([FromBody] Word word)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();

            }
            _vocabularyService.AddWord(word);
            return Ok();
        }

        // DELETE api/<VocabularyController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _vocabularyService.RemoveWord(id);
            return Ok();
        }

        // PUT api/<VocabularyController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Word word)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();

            }
            _vocabularyService.UpdateWord(id, word);
            return Ok();
        }
    }
}
