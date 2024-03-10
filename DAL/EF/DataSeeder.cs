using Domain.Domain.Flow;
using Domain.Domain.Util;
using Domain.Flow;

namespace DAL.EF;

public class DataSeeder
{
    public static void Seed(PhygitalToolDbContext context)
    {
        //creating Questions
            //single choice
        var singleChoice1 = new Question(1,
            "Als jij de begroting van je stad of gemeente zou opmaken, waar zou je dan in de komende jaren vooral op inzetten?",
            QuestionType.SingleChoice);
            //multiple choice
            
            //range
            
            //open
            
        //creating answerposibilities
        var answerPossibility1 = new AnswerPossibility(1, "natuur & ecologie");
        var answerPossibility2 = new AnswerPossibility(2, "vrije tijd, sport, cultuur");
        var answerPossibility3 = new AnswerPossibility(3, "onderwijs & kinderopvang");
        var answerPossibility4 = new AnswerPossibility(4, "huisvesting");
        var answerPossibility5 = new AnswerPossibility(5, "gezondheidszorg & welzijn");
        var answerPossibility6 = new AnswerPossibility(5, "Ondersteunen van lokale handel");
            
        //linking questions to Answerpossibilities (except for open)
            //single choice
            singleChoice1.AnswerPossibilities.Add(answerPossibility1);
            singleChoice1.AnswerPossibilities.Add(answerPossibility2);
            singleChoice1.AnswerPossibilities.Add(answerPossibility3);
            singleChoice1.AnswerPossibilities.Add(answerPossibility4);
            singleChoice1.AnswerPossibilities.Add(answerPossibility5);
            singleChoice1.AnswerPossibilities.Add(answerPossibility6);
            
            

    }
}