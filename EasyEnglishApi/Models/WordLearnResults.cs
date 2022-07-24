using EasyEnglishApi.Models.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EasyEnglishApi.Models
{
    public class WordLearnResults
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int WordId { get; set; }

        [Required]
        public WordLearningType Type { get; set; }

        [Required]
        public bool IsSuccessful { get; set; }

        [Required]
        public DateTime DateTime { get; set; } = DateTime.Now;


        [ForeignKey("WordId")]
        public Word? Word { get; set; }
    }
}
