using EasyEnglishApi.Services.Dto;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EasyEnglishApi.Models
{
    public class Card
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = null!;

        public string? Description { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public List<Word>? Words { get; set; } = new List<Word>();
    }
}
