namespace EasyEnglishApi.Services.Dto
{
    public class CardStatisticDto
    {
        public int progress { get; set; }

        public int totalLearns { get; set; }

        public int totalSuccessLearns { get; set; }

        public int speakingSuccessLearns { get; set; }

        public int writingSuccessLearns { get; set; }

        public int speakingSuccessLeft { get; set; }

        public int writingSuccessLeft { get; set; }

        public DateTime lastLearnDate { get; set; }

        public DateTime? nextLearnDate { get; set; } = null;

        public void CalculateNumbersLeft()
        {
            speakingSuccessLeft = Constants.successSpeakingWords - speakingSuccessLearns;
            speakingSuccessLeft = speakingSuccessLeft > 0 ? speakingSuccessLeft : 0;

            writingSuccessLeft = Constants.successWritingWords - writingSuccessLearns;
            writingSuccessLeft = writingSuccessLeft > 0 ? writingSuccessLeft : 0;

            totalSuccessLearns = speakingSuccessLearns + writingSuccessLearns;
            progress = 100 * totalSuccessLearns / (Constants.successSpeakingWords + Constants.successWritingWords);
        }
    }
}
