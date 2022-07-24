using EasyEnglishApi.Models;
using EasyEnglishApi.Services.Dto;
using EasyEnglishApi.Services.Extensions;
using EasyEnglishApi.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace EasyEnglishApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CardController : ControllerBase
    {
        ICardService _cardService;

        public CardController(ICardService cardService)
        {
            _cardService = cardService;
        }

        // GET: api/<CardController>
        [HttpGet]
        public async Task<IEnumerable<CardDto>> GetAsync()
        {
            return await _cardService.GetCardsAsync();
        }

        // GET: api/<CardController>/full/5
        [HttpGet]
        [Route("full/{id}")]
        public CardDto? GetFull(int id)
        {
            CardDto card = _cardService.GetFull(id);
            return card;
        }

        // POST api/<CardController>
        [HttpPost]
        public IActionResult Add([FromBody] Card card)
        {
            _cardService.Add(card);
            return Ok();
        }

        // DELETE api/<CardController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _cardService.Remove(id);
        }

        // PUT api/<CardController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Card card)
        {
            _cardService.Update(id, card);
        }
    }
}
