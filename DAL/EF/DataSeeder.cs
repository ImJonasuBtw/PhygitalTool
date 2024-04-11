using Microsoft.AspNetCore.Identity;
using PhygitalTool.Domain.Extensions;
using PhygitalTool.Domain.FlowPackage;
using PhygitalTool.Domain.Platform;
using PhygitalTool.Domain.Projects;
using PhygitalTool.Domain.Util;

namespace PhygitalTool.DAL.EF;

public static class DataSeeder
{
    public static void Seed(PhygitalToolDbContext context, UserManager<Manager> userManager)
    {
        //creating dummy users
        //creating backoffice env 
        var backOffice1 = new BackOffice(1, "TestOffice");
        context.BackOffices.Add(backOffice1);
        context.SaveChanges();
         
        // Managers
        if (!context.Users.Any(u => u.Email == "manager1@example.com"))
        {
            var manager1 = new Manager
            {
                UserName = "manager1@example.com", // Use the email as the username if you're not using separate usernames
                Email = "manager1@example.com",
                EmailConfirmed = true,
                ImageUrl = "https://i.pinimg.com/564x/53/22/50/53225047d8032305f091ac846d5879f8.jpg",
                BackOfficeId = backOffice1.BackOfficeId // Ensure this is correctly assigned
            };
            
            var creationResult = userManager.CreateAsync(manager1, "Test23!").Result; // Use a secure password
            if (!creationResult.Succeeded)
            {
                // If creation fails, log or handle the error as needed
                throw new System.Exception("Failed to create dummy manager.");
            }
        }
        //creating projects 
        var project1 = new Project
        {
            ProjectId = 1,
            Description = "test",
            ProjectName = "proj1",
            CreationDate = default,
            Status = ProjectStatus.Active
        };
        var project2 = new Project
        {
            ProjectId = 2,
            Description = "test",
            ProjectName = "proj2",
            CreationDate = default,
            Status = ProjectStatus.Active
        };
            backOffice1.Projects.Add(project1);
            backOffice1.Projects.Add(project2);
            context.Projects.Add(project1);
            context.Projects.Add(project2);

            var MainTheme1 = new MainTheme("TestThema1", "blablabla");
            var MainTheme2 = new MainTheme("TestThema2", "blablabla");
            var MainTheme3 = new MainTheme("TestThema3", "blablabla");

            context.MainThemes.Add(MainTheme1);
            context.MainThemes.Add(MainTheme2);
            context.MainThemes.Add(MainTheme3);
            
            project1.MainThemes.Add(MainTheme1);
            project1.MainThemes.Add(MainTheme2);
            project1.MainThemes.Add(MainTheme3);
        
        // Creating Questions
        // Linear Flow
        //  Single choice
        var singleChoice1 = new Question(1,
            "Als jij de begroting van je stad of gemeente zou opmaken, waar zou je dan in de komende jaren vooral op inzetten?",
            QuestionType.SingleChoice);
        //  Multiple choice
        var multipleChoice1 = new Question(2,
            "Wat zou jou helpen om een keuze te maken tussen de verschillende partijen?",
            QuestionType.MultipleChoice);
        //  Range
        var range1 = new Question(3, "Ben jij van plan om te gaan stemmen bij de aankomende lokale verkiezingen?",
            QuestionType.Range);
        //  Open
        var open1 = new Question(4, "Je bent schepen van onderwijs voor een dag: waar zet je dan vooral op in? ",
            QuestionType.Open);

        // Circular Flow
        //  Single choice
        var singleChoice2 = new Question(5,
            "Wat is volgens u de grootste uitdaging waar de gemeenteraad de komende termijn voor staat?",
            QuestionType.SingleChoice);
        //  Multiple choice
        var multipleChoice2 = new Question(6,
            "Welke thema's vindt u het belangrijkst bij het bepalen van uw stem voor de gemeenteraadsverkiezingen?",
            QuestionType.MultipleChoice);
        //  Range
        var range2 = new Question(7,
            "In hoeverre bent u het eens met de volgende stelling: \"De besluiten die de gemeenteraad neemt, hebben een directe impact op mijn dagelijks leven.\"",
            QuestionType.Range);
        //  Open
        var open2 = new Question(8,
            "Welke thema's of kwesties ziet u het liefst aangepakt worden door de nieuwe gemeenteraad en waarom zijn deze belangrijk voor u?",
            QuestionType.Open);

        // Creating Answer Possibilities
        // Linear Flow
        var answerPossibility1 = new AnswerPossibility(1, "natuur & ecologie");
        var answerPossibility2 = new AnswerPossibility(2, "vrije tijd, sport, cultuur");
        var answerPossibility3 = new AnswerPossibility(3, "onderwijs & kinderopvang");
        var answerPossibility4 = new AnswerPossibility(4, "huisvesting");
        var answerPossibility5 = new AnswerPossibility(5, "gezondheidszorg & welzijn");
        var answerPossibility6 = new AnswerPossibility(6, "Ondersteunen van lokale handel");
        var answerPossibility7 = new AnswerPossibility(7, "Meer lessen op school rond de partijprogramma’s");
        var answerPossibility8 =
            new AnswerPossibility(8, "Activiteiten in mijn jeugdclub, sportclub… rond de verkiezingen");
        var answerPossibility9 =
            new AnswerPossibility(9, "Een bezoek van de partijen aan mijn school, jeugd/sportclub, …");
        var answerPossibility10 = new AnswerPossibility(10, "Een gesprek met mijn ouders rond de gemeentepolitiek");
        var answerPossibility11 =
            new AnswerPossibility(11, "Een debat georganiseerd door een jeugdhuis met de verschillende partijen");
        var answerPossibility12 = new AnswerPossibility(12, "Zeker niet");
        var answerPossibility13 = new AnswerPossibility(13, "Eerder niet");
        var answerPossibility14 = new AnswerPossibility(14, "Ik weet het nog niet");
        var answerPossibility15 = new AnswerPossibility(15, "Eerder wel");
        var answerPossibility16 = new AnswerPossibility(16, "Zeker wel");

        // Circular Flow
        var answerPossibility17 = new AnswerPossibility(17, "Infrastructuur");
        var answerPossibility18 = new AnswerPossibility(18, "Milieuproblemen");
        var answerPossibility19 = new AnswerPossibility(19, "Werkgelegenheid");
        var answerPossibility20 = new AnswerPossibility(20, "Sociale Voorzieningen");
        var answerPossibility21 = new AnswerPossibility(21, "Economische Ontwikkeling");
        var answerPossibility22 = new AnswerPossibility(22, "Ondersteuning van Kwetsbare Groepen");
        var answerPossibility23 = new AnswerPossibility(23, "Duurzaamheid en Milieu");
        var answerPossibility24 = new AnswerPossibility(24, "Onderwijs en Kinderopvang");
        var answerPossibility25 = new AnswerPossibility(25, "Veiligheid en Openbare Orde");
        var answerPossibility26 = new AnswerPossibility(26, "Cultuur, Sport en Recreatie");
        var answerPossibility27 = new AnswerPossibility(27, "Lokale Belastingen en Financieel Beleid");
        var answerPossibility28 = new AnswerPossibility(28, "Zeker niet");
        var answerPossibility29 = new AnswerPossibility(29, "Eerder niet");
        var answerPossibility30 = new AnswerPossibility(30, "Ik weet het nog niet");
        var answerPossibility31 = new AnswerPossibility(31, "Eerder wel");
        var answerPossibility32 = new AnswerPossibility(32, "Zeker wel");

        // Creating SubThemes
        var subTheme1 = new SubTheme(1, "KiesIntenties",
            "Ben je nog aan het twijfelen over op wie je wilt stemmen bij de aankomende verkiezingen? Het is belangrijk om te overwegen welke kandidaten het beste aansluiten bij jouw waarden en visie voor de toekomst van onze gemeente. Neem de tijd om de verschillende partijprogramma's te bekijken en de standpunten van de kandidaten te onderzoeken, zodat je een weloverwogen keuze kunt maken op verkiezingsdag.");
        var subTheme2 = new SubTheme(2, "Redenen om (niet) te gaan stemmen",
            "Stemmen is een belangrijk onderdeel van onze democratie, maar soms kunnen er redenen zijn waarom mensen ervoor kiezen om niet te stemmen. Of het nu gaat om twijfels over het nut van hun stem, ontevredenheid over het politieke systeem, of praktische obstakels zoals tijdgebrek, het is essentieel om deze redenen te begrijpen en manieren te vinden om de betrokkenheid van alle burgers bij het democratische proces te vergroten.");
        var subTheme3 = new SubTheme(3, "Gevoel van betrokkenheid bij lokaal beleid",
            "Hoe betrokken voel jij je bij het beleid dat wordt uitgestippeld in onze gemeente? Of het nu gaat om de planning van nieuwe projecten, de organisatie van lokale evenementen, of het aanpakken van gemeenschapsproblemen, jouw betrokkenheid en input als burger zijn van onschatbare waarde voor het vormgeven van een bloeiende en inclusieve lokale gemeenschap.");

        // Creating Linear and Circular Flow 
        var flow1 = new Flow(1, FlowType.Linear, Language.Dutch, "flow over gemeentebeleid");
        var flow2 = new Flow(2, FlowType.Circular, Language.Dutch, "flow over milieu");

        // Creating flowSubTheme intermediary classes
        var flowSubTheme1 = new FlowSubTheme { Flow = flow1, SubTheme = subTheme1 };
        var flowSubTheme2 = new FlowSubTheme { Flow = flow1, SubTheme = subTheme3 };
        var flowSubTheme3 = new FlowSubTheme { Flow = flow2, SubTheme = subTheme1 };
        var flowSubTheme4 = new FlowSubTheme { Flow = flow2, SubTheme = subTheme2 };
        var flowSubTheme5 = new FlowSubTheme { Flow = flow2, SubTheme = subTheme3 };

        // Adding FlowSubThemes to flows
        flow1.FlowSubThemes.AddRange(new[] { flowSubTheme1, flowSubTheme2 });
        flow2.FlowSubThemes.AddRange(new[] { flowSubTheme3, flowSubTheme4, flowSubTheme5 });

        // Linking Answer Possibilities to Questions (except for open)
        // Linear Flow
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

        // Circular Flow
        singleChoice2.AnswerPossibilities.Add(answerPossibility17);
        singleChoice2.AnswerPossibilities.Add(answerPossibility18);
        singleChoice2.AnswerPossibilities.Add(answerPossibility19);
        singleChoice2.AnswerPossibilities.Add(answerPossibility20);
        singleChoice2.AnswerPossibilities.Add(answerPossibility21);
        singleChoice2.AnswerPossibilities.Add(answerPossibility22);
        multipleChoice2.AnswerPossibilities.Add(answerPossibility23);
        multipleChoice2.AnswerPossibilities.Add(answerPossibility24);
        multipleChoice2.AnswerPossibilities.Add(answerPossibility25);
        multipleChoice2.AnswerPossibilities.Add(answerPossibility26);
        multipleChoice2.AnswerPossibilities.Add(answerPossibility27);
        range2.AnswerPossibilities.Add(answerPossibility28);
        range2.AnswerPossibilities.Add(answerPossibility29);
        range2.AnswerPossibilities.Add(answerPossibility30);
        range2.AnswerPossibilities.Add(answerPossibility31);
        range2.AnswerPossibilities.Add(answerPossibility32);

        // Adding Questions to Flows
        // Linear Flow
        flow1.Questions.Add(singleChoice1);
        flow1.Questions.Add(range1);
        flow1.Questions.Add(multipleChoice1);
        flow1.Questions.Add(open1);

        // Circular Flow
        flow2.Questions.Add(singleChoice2);
        flow2.Questions.Add(range2);
        flow2.Questions.Add(multipleChoice2);
        flow2.Questions.Add(open2);

        // Adding objects to the context
        context.SubThemes.Add(subTheme1);
        context.SubThemes.Add(subTheme2);
        context.SubThemes.Add(subTheme3);
        
        MainTheme1.SubThemes.Add(subTheme1);
        MainTheme1.SubThemes.Add(subTheme2);
        MainTheme1.SubThemes.Add(subTheme3);

        context.Flows.Add(flow1);
        context.Flows.Add(flow2);

        context.Questions.Add(singleChoice1);
        context.Questions.Add(multipleChoice1);
        context.Questions.Add(range1);
        context.Questions.Add(open1);

        context.Questions.Add(singleChoice2);
        context.Questions.Add(multipleChoice2);
        context.Questions.Add(range2);
        context.Questions.Add(open2);

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

        context.AnswerPossibilities.Add(answerPossibility17);
        context.AnswerPossibilities.Add(answerPossibility18);
        context.AnswerPossibilities.Add(answerPossibility19);
        context.AnswerPossibilities.Add(answerPossibility20);
        context.AnswerPossibilities.Add(answerPossibility21);
        context.AnswerPossibilities.Add(answerPossibility22);
        context.AnswerPossibilities.Add(answerPossibility23);
        context.AnswerPossibilities.Add(answerPossibility24);
        context.AnswerPossibilities.Add(answerPossibility25);
        context.AnswerPossibilities.Add(answerPossibility26);
        context.AnswerPossibilities.Add(answerPossibility27);
        context.AnswerPossibilities.Add(answerPossibility28);
        context.AnswerPossibilities.Add(answerPossibility29);
        context.AnswerPossibilities.Add(answerPossibility30);
        context.AnswerPossibilities.Add(answerPossibility31);
        context.AnswerPossibilities.Add(answerPossibility32);

        context.FlowSubThemes.Add(flowSubTheme1);
        context.FlowSubThemes.Add(flowSubTheme2);
        context.FlowSubThemes.Add(flowSubTheme3);
        context.FlowSubThemes.Add(flowSubTheme4);
        context.FlowSubThemes.Add(flowSubTheme5);

        context.SaveChanges();
        context.ChangeTracker.Clear();
    }
}