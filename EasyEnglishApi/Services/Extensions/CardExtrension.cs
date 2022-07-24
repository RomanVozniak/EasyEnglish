using EasyEnglishApi.Models;
using EasyEnglishApi.Services.Dto;

namespace EasyEnglishApi.Services.Extensions
{
    public static class CardExtrension
    {
        public static CardDto ToDto(this Card card)
        {
            CardDto dto = new CardDto();

            if (card != null)
            {
                dto.Id = card.Id;
                dto.Name = card.Name;
                dto.Description = card.Description;
                dto.CreatedAt = card.CreatedAt;
                dto.Words = card.Words;
            }
            return dto;
        }
    }
}
