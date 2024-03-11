using Domain.Domain.Flow;
using Domain.Domain.Util;
using Domain.Flow;

namespace DAL.EF;

public static class DataSeeder
{
    public static void Seed(PhygitalToolDbContext context)
    {
        //creating Questions
        //single choice
        var singleChoice1 = new Question(1,
            "Als jij de begroting van je stad of gemeente zou opmaken, waar zou je dan in de komende jaren vooral op inzetten?",
            QuestionType.SingleChoice);
        //multiple choice
        var multipleChoice1 = new Question(2,
            "Wat zou jou helpen om een keuze te maken tussen de verschillende partijen?",
            QuestionType.MultipleChoice);
        //range
        var range1 = new Question(3, "Ben jij van plan om te gaan stemmen bij de aankomende lokale verkiezingen?",
            QuestionType.Range);
        //open
        var open1 = new Question(4, "Je bent schepen van onderwijs voor een dag: waar zet je dan vooral op in? ",
            QuestionType.Open);

        //creating answerposibilities
        var answerPossibility1 = new AnswerPossibility(1, "natuur & ecologie");
        var answerPossibility2 = new AnswerPossibility(2, "vrije tijd, sport, cultuur");
        var answerPossibility3 = new AnswerPossibility(3, "onderwijs & kinderopvang");
        var answerPossibility4 = new AnswerPossibility(4, "huisvesting");
        var answerPossibility5 = new AnswerPossibility(5, "gezondheidszorg & welzijn");
        var answerPossibility6 = new AnswerPossibility(6, "Ondersteunen van lokale handel");
        var answerPossibility7 = new AnswerPossibility(7, "Meer lessen op school rond de partijprogramma’s");
        var answerPossibility8 = new AnswerPossibility(8, "Activiteiten in mijn jeugdclub, sportclub… rond de verkiezingen");
        var answerPossibility9 = new AnswerPossibility(9, "Een bezoek van de partijen aan mijn school, jeugd/sportclub, …");
        var answerPossibility10 = new AnswerPossibility(10, "Een gesprek met mijn ouders rond de gemeentepolitiek");
        var answerPossibility11 = new AnswerPossibility(11, "Een debat georganiseerd door een jeugdhuis met de verschillende partijen");
        var answerPossibility12 = new AnswerPossibility(12, "Zeker niet");
        var answerPossibility13 = new AnswerPossibility(13, "Eerder niet");
        var answerPossibility14 = new AnswerPossibility(14, "Ik weet het nog niet");
        var answerPossibility15 = new AnswerPossibility(15, "Eerder wel");
        var answerPossibility16 = new AnswerPossibility(16, "Zeker wel");

        //linking questions to Answerpossibilities (except for open)
        //single choice
        singleChoice1.AnswerPossibilities.Add(answerPossibility1);
        singleChoice1.AnswerPossibilities.Add(answerPossibility2);
        singleChoice1.AnswerPossibilities.Add(answerPossibility3);
        singleChoice1.AnswerPossibilities.Add(answerPossibility4);
        singleChoice1.AnswerPossibilities.Add(answerPossibility5);
        singleChoice1.AnswerPossibilities.Add(answerPossibility6);
        multipleChoice1.AnswerPossibilities.Add(answerPossibility7);
        multipleChoice1.AnswerPossibilities.Add(answerPossibility8);
        multipleChoice1.AnswerPossibilities.Add(answerPossibility9);
        multipleChoice1.AnswerPossibilities.Add(answerPossibility10);
        multipleChoice1.AnswerPossibilities.Add(answerPossibility11);
        range1.AnswerPossibilities.Add(answerPossibility12);
        range1.AnswerPossibilities.Add(answerPossibility13);
        range1.AnswerPossibilities.Add(answerPossibility14);
        range1.AnswerPossibilities.Add(answerPossibility15);
        range1.AnswerPossibilities.Add(answerPossibility16);
        
        
        
        // add objects to the context
        context.Questions.Add(singleChoice1);
        context.Questions.Add(multipleChoice1);
        context.Questions.Add(range1);
        context.Questions.Add(open1);
        
        
        context.AnswerPossibilities.Add(answerPossibility1);
        context.AnswerPossibilities.Add(answerPossibility2);
        context.AnswerPossibilities.Add(answerPossibility3);
        context.AnswerPossibilities.Add(answerPossibility4);
        context.AnswerPossibilities.Add(answerPossibility5);
        context.AnswerPossibilities.Add(answerPossibility6);
        context.AnswerPossibilities.Add(answerPossibility7);
        context.AnswerPossibilities.Add(answerPossibility8);
        context.AnswerPossibilities.Add(answerPossibility9);
        context.AnswerPossibilities.Add(answerPossibility10);
        context.AnswerPossibilities.Add(answerPossibility11);
        context.AnswerPossibilities.Add(answerPossibility12);
        context.AnswerPossibilities.Add(answerPossibility13);
        context.AnswerPossibilities.Add(answerPossibility14);
        context.AnswerPossibilities.Add(answerPossibility15);
        context.AnswerPossibilities.Add(answerPossibility16);


        context.SaveChanges();
        context.ChangeTracker.Clear();
    }
}