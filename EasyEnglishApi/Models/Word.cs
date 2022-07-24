using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace EasyEnglishApi.Models
{
    [Table("Word")]
    public class Word
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Phrase { get; set; } = String.Empty;

        [Required]
        public string Translation { get; set; } = String.Empty;

        public string? Description { get; set; } = null;

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.Now;


        [Required]
        [Range(1, 999.99)]
        public int CardId { get; set; }

        [JsonIgnore]
        [ForeignKey("CardId")]
        public Card? Card { get; set; }

        [JsonIgnore]
        public List<WordLearnResults> WordLearnResults { get; set; } = new List<WordLearnResults>();
    }
}
