using EasyEnglishApi.Models;
using EasyEnglishApi.Services.Dto;
using EasyEnglishApi.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EasyEnglishApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class VocabularyController : ControllerBase
    {
        IVocabularyService _vocabularyService;

        public VocabularyController(IVocabularyService vocabularyService)
        {
            _vocabularyService = vocabularyService;
        }

        // GET: api/<VocabularyController>
        [Route("/api/{controller}")]
        [HttpGet]
        public async Task<IEnumerable<Word>> GetAsync([FromQuery] WordsFilterDto filterDto)
        {
            return await _vocabularyService.GetWordsAsync(filterDto);
        }

        // POST api/<VocabularyController>
        [Route("/api/{controller}")]
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
        [Route("/api/{controller}/{id}")]
        [HttpDelete]
        public IActionResult Delete(int id)
        {
            _vocabularyService.RemoveWord(id);
            return Ok();
        }

        // PUT api/<VocabularyController>/5
        [Route("/api/{controller}/{id}")]
        [HttpPut]
        public IActionResult Put(int id, [FromBody] Word word)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            _vocabularyService.UpdateWord(id, word);
            return Ok();
        }

        // POST api/<VocabularyController>/saveWordsLearningResults
        [HttpPost]
        [Route("/api/{controller}/saveWordsLearningResults")]
        public IActionResult SaveWordsLearningResults([FromBody] List<WordLearnResults> wordLearnResults)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            _vocabularyService.SaveWordsLearningResults(wordLearnResults);
            return Ok();
        }
    }
}
