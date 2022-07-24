using EasyEnglishApi.Models;
using Newtonsoft.Json;

namespace EasyEnglishApi.Services.Dto
{
    public class CardDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public string? Description { get; set; }

        public DateTime CreatedAt { get; set; }


        // relations
        public List<Word>? Words { get; set; } = new List<Word>();

        [JsonProperty("cardStatistic")]
        public CardStatisticDto? CardStatistic { get; set; }


        // additional fields
        public int WordsCount { get; set; }
    }
}
