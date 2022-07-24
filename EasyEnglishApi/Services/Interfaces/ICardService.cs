using EasyEnglishApi.Models;
using EasyEnglishApi.Services.Dto;

namespace EasyEnglishApi.Services.Interfaces
{
    public interface ICardService
    {
        Task<IEnumerable<CardDto>> GetCardsAsync();
        CardDto? GetFull(int id);
        void Add(Card card);
        void Update(int id, Card card);
        void Remove(int id);
    }
}
