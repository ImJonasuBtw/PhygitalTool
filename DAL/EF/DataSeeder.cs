using Microsoft.AspNetCore.Identity;
using PhygitalTool.Domain.Extensions;
using PhygitalTool.Domain.FlowPackage;
using PhygitalTool.Domain.Platform;
using PhygitalTool.Domain.Projects;
using PhygitalTool.Domain.Util;

namespace PhygitalTool.DAL.EF;

public static class DataSeeder
{
    
    const string Manager = "Manager";
    const string Supervisor = "Supervisor";
    const string Admin = "Admin";
    const string User = "User";
    
    public static void Seed(PhygitalToolDbContext context, UserManager<IdentityUser> userManager)
    {
        var adminPlatform1 = new AdminPlatform(1);
        context.AdminPlatforms.Add(adminPlatform1);
        context.SaveChanges();
        
        //creating dummy users
        //creating backoffice env 
        var backOffice1 = new BackOffice(1, "TestOffice", adminPlatform1.AdminPlatformId);
        context.BackOffices.Add(backOffice1);
        var idea1 = new Idea("Cool", "Wat een leuke flows",0 );
        var idea2 = new Idea("Meh", "Sommige dingen werken nog niet helemaal goed",0 );
        var comment1 = new Comment("Dat vind ik ook");
        context.Ideas.Add(idea1);
        context.Ideas.Add(idea2);
        comment1.Idea = idea1;
        context.Comments.Add(comment1);
        idea1.Comments.Add(comment1);
        context.SaveChanges();
        
        
        
        // Managers
        if (!context.Users.Any(u => u.Email == "manager1@example.com"))
        {
            var manager1 = new Manager
            {
                UserName =
                    "manager1@example.com",
                Email = "manager1@example.com",
                EmailConfirmed = true,
                ImageUrl = "https://mandaraperera.dev/media/beheerder.jpg",
                BackOfficeId = backOffice1.BackOfficeId 
            };

            var creationResult = userManager.CreateAsync(manager1, "Test23!").Result; 
            userManager.AddToRoleAsync(manager1, Manager).Wait();
            if (!creationResult.Succeeded)
            {
                throw new System.Exception("Failed to create dummy manager.");
            }
        }
        if (!context.Users.Any(u => u.Email == "manager.phygital@example.com"))
        {
            var manager1 = new Manager
            {
                UserName =
                    "manager.phygital@example.com",
                Email = "manager.phygital@example.com",
                EmailConfirmed = true,
                ImageUrl = "https://mandaraperera.dev/media/beheerder.jpg",
                BackOfficeId = backOffice1.BackOfficeId // Ensure this is correctly assigned
            };

            var creationResult = userManager.CreateAsync(manager1, "Test23!").Result; // Use a secure password
            userManager.AddToRoleAsync(manager1, Manager).Wait();
            if (!creationResult.Succeeded)
            {
                throw new System.Exception("Failed to create dummy manager.");
            }
        }
        
        
        if (!context.Users.Any(u => u.Email == "supervisor1@example.com"))
        {
            var supervisor1 = new Supervisor
            {
                UserName = "supervisor1@example.com",
                Email = "supervisor1@example.com",
                EmailConfirmed = true,
                ImageUrl = "https://mandaraperera.dev/media/begeleider.jpg",
                BackOfficeId = backOffice1.BackOfficeId
            };

            var creationResult1 = userManager.CreateAsync(supervisor1, "Test23!").Result;
            userManager.AddToRoleAsync(supervisor1, Supervisor).Wait();
            if (!creationResult1.Succeeded)
            {
                throw new System.Exception("Failed to create dummy supervisor.");
            }
        }
        
        if (!context.Users.Any(u => u.Email == "Admin1@example.com"))
        {
            var admin1 = new Admin
            {
                UserName = "admin1@example.com",
                Email = "admin1@example.com",
                EmailConfirmed = true,
                ImageUrl = "https://mandaraperera.dev/media/admin.jpg",
                AdminPlatformId = adminPlatform1.AdminPlatformId
            };

            var creationResult2 = userManager.CreateAsync(admin1, "Test23!").Result;
            userManager.AddToRoleAsync(admin1, Admin).Wait();
            if (!creationResult2.Succeeded)
            {
                throw new System.Exception("Failed to create dummy admin1.");
            }
        }
      
        
        if (!context.Users.Any(u => u.Email == "user1@example.com"))
        {
            var user1 = new User
            {
                UserName = "user1@example.com",
                Email = "user1@example.com",
                EmailConfirmed = true,
                Ideas = new List<Idea> { idea1 },
                Comments = new List<Comment>()
            };
           
            var creationResult3 = userManager.CreateAsync(user1, "Test23!").Result;
            userManager.AddToRoleAsync(user1, User).Wait();
            if (!creationResult3.Succeeded)
            {
                throw new System.Exception("Failed to create dummy user1.");
            }
           

            idea1.User = user1;
            context.SaveChanges();
        }
        
        if (!context.Users.Any(u => u.Email == "user2@example.com"))
        {
            var user2 = new User
            {
                UserName = "user2@example.com",
                Email = "user2@example.com",
                EmailConfirmed = true,
                Ideas = new List<Idea>(),
                Comments = new List<Comment>() {comment1}
            };
            
            var creationResult4 = userManager.CreateAsync(user2, "Test23!").Result;
            userManager.AddToRoleAsync(user2, User).Wait();
            if (!creationResult4.Succeeded)
            {
                throw new System.Exception("Failed to create dummy user.");
            }
           
            comment1.User = user2;
            idea2.User = user2;
            context.SaveChanges();
        }
        
        
        //creating projects 
        var project1 = new Project
        {
            Description = "Verzameling van bevragingen voor jongeren 12-18",
            ProjectName = "Bevragingen jongeren",
            CreationDate = default,
            Status = ProjectStatus.Active
        };
        var project2 = new Project
        {
            Description = "Verzameling van bevragingen voor jongeren 16-21",
            ProjectName = "Bevragingen jongvolwassenen",
            CreationDate = default,
            Status = ProjectStatus.NonActive
        };
        backOffice1.Projects.Add(project1);
        backOffice1.Projects.Add(project2);

        context.Projects.Add(project1);
        context.Projects.Add(project2);

        var mainTheme1 = new MainTheme("Verkiezingen stad of gemeente", "De verschillende beleidsdomeinen binnen een stad of gemeente");
        var mainTheme2 = new MainTheme("Educatief samenwerkingsplatform", "Een platform voor het delen van educatieve content en samenwerking tussen leraren en studenten");
        var mainTheme3 = new MainTheme("Gezondheidsbewustzijn bij tieners", "Het bevorderen van gezonde levensstijlkeuzes en het aanmoedigen van actieve deelname aan lichaamsbeweging en voedingsvoorlichting onder tieners.");
        var mainTheme4 = new MainTheme("Milieubewustzijn en duurzaamheid",
            "Onderzoek naar jongeren hun bewustzijn en betrokkenheid bij milieukwesties, het peilen van hun interesse in duurzaamheidsinitiatieven en het verzamelen van feedback over mogelijke acties en projecten die kunnen bijdragen aan een groenere toekomst.");
        
        context.MainThemes.Add(mainTheme1);
        context.MainThemes.Add(mainTheme2);
        context.MainThemes.Add(mainTheme3);
        context.MainThemes.Add(mainTheme3);
        
        project1.MainThemes.Add(mainTheme1);
        project1.MainThemes.Add(mainTheme4);
        project2.MainThemes.Add(mainTheme2);
        project2.MainThemes.Add(mainTheme3);

        // Creating Questions
        // Linear Flow
        // Gemeenteraadsverkiezingen
        //  Single choice
        var singleChoice1 = new Question(
            "Als jij de begroting van je stad of gemeente zou opmaken, waar zou je dan in de komende jaren vooral op inzetten?",
            QuestionType.SingleChoice, true);
        //  Multiple choice
        var multipleChoice1 = new Question(
            "Wat zou jou helpen om een keuze te maken tussen de verschillende partijen?",
            QuestionType.MultipleChoice);
        //  Range
        var range1 = new Question("Ben jij van plan om te gaan stemmen bij de aankomende lokale verkiezingen?",
            QuestionType.Range);
        //  Open
        var open1 = new Question("Je bent schepen van onderwijs voor een dag: waar zet je dan vooral op in? ",
            QuestionType.Open);

        // Circular Flow
        // Gemeenteraadsverkiezingen
        //  Single choice
        var singleChoice2 = new Question(
            "Wat is volgens u de grootste uitdaging waar de gemeenteraad de komende termijn voor staat?",
            QuestionType.SingleChoice);
        //  Multiple choice
        var multipleChoice2 = new Question(
            "Welke thema's vindt u het belangrijkst bij het bepalen van uw stem voor de gemeenteraadsverkiezingen?",
            QuestionType.MultipleChoice);
        //  Range
        var range2 = new Question(
            "In hoeverre bent u het eens met de volgende stelling: \"De besluiten die de gemeenteraad neemt, hebben een directe impact op mijn dagelijks leven.\"",
            QuestionType.Range);
        //  Open
        var open2 = new Question(
            "Welke thema's of kwesties ziet u het liefst aangepakt worden door de nieuwe gemeenteraad en waarom zijn deze belangrijk voor u?",
            QuestionType.Open);

        
        //Educatief samenwerkingsplatform
        var singleChoice3 = new Question(
            "Wat is de belangrijkste reden waarom je een educatief samenwerkingsplatform zou gebruiken?",
            QuestionType.SingleChoice, true);
        var answerPossibility33 = new AnswerPossibility("Samenwerken aan projecten met klasgenoten");
        var answerPossibility34 = new AnswerPossibility("Toegang krijgen tot extra leermiddelen en studiemateriaal");
        var answerPossibility35 = new AnswerPossibility("Communiceren en interactie hebben met leraren buiten de lesuren");
        var answerPossibility36 = new AnswerPossibility("Vragen stellen");
        singleChoice3.AnswerPossibilities.Add(answerPossibility33);
        singleChoice3.AnswerPossibilities.Add(answerPossibility34);
        singleChoice3.AnswerPossibilities.Add(answerPossibility35);
        singleChoice3.AnswerPossibilities.Add(answerPossibility36);
        var multipleChoice3 = new Question(
            "Welke functies van het educatieve samenwerkingsplatform gebruik je regelmatig? (Selecteer alle toepasselijke antwoorden)",
            QuestionType.SingleChoice, true);
        var answerPossibility37 = new AnswerPossibility("Het delen van documenten en presentaties");
        var answerPossibility38 = new AnswerPossibility("Het stellen en beantwoorden van vragen in discussieforums");
        var answerPossibility39 = new AnswerPossibility("Het deelnemen aan virtuele klassen of live streaming van lessen");
        var answerPossibility40 = new AnswerPossibility(" Het ontvangen van feedback van leraren op opdrachten");
        multipleChoice3.AnswerPossibilities.Add(answerPossibility37);
        multipleChoice3.AnswerPossibilities.Add(answerPossibility38);
        multipleChoice3.AnswerPossibilities.Add(answerPossibility39);
        multipleChoice3.AnswerPossibilities.Add(answerPossibility40);
        var range3 = new Question(
            "Geef aan hoe vaak je het educatieve samenwerkingsplatform gebruikt",
            QuestionType.Range);
        var answerPossibility41 = new AnswerPossibility("Zelden of nooit gebruikt");
        var answerPossibility42 = new AnswerPossibility("Af en toe gebruikt");
        var answerPossibility43 = new AnswerPossibility("Gemiddeld gebruikt");
        var answerPossibility44 = new AnswerPossibility("Vaak gebruikt");
        var answerPossibility45 = new AnswerPossibility("Heel vaak gebruikt");
        range3.AnswerPossibilities.Add(answerPossibility41);
        range3.AnswerPossibilities.Add(answerPossibility42);
        range3.AnswerPossibilities.Add(answerPossibility43);
        range3.AnswerPossibilities.Add(answerPossibility44);
        range3.AnswerPossibilities.Add(answerPossibility45);
        var open3 = new Question(
            "Wat vind je het meest waardevolle aspect van het educatieve samenwerkingsplatform en waarom?",
            QuestionType.Open);
        // Creating Answer Possibilities
        // Linear Flow
        var answerPossibility1 = new AnswerPossibility("natuur & ecologie", 4);
        var answerPossibility2 = new AnswerPossibility("vrije tijd, sport, cultuur");
        var answerPossibility3 = new AnswerPossibility("onderwijs & kinderopvang", 3);
        var answerPossibility4 = new AnswerPossibility("huisvesting");
        var answerPossibility5 = new AnswerPossibility("gezondheidszorg & welzijn");
        //var answerPossibility6 = new AnswerPossibility("Ondersteunen van lokale handel");
        var answerPossibility7 = new AnswerPossibility("Meer lessen op school rond de partijprogramma’s");
        var answerPossibility8 =
            new AnswerPossibility("Activiteiten in mijn jeugdclub, sportclub… rond de verkiezingen");
        var answerPossibility9 =
            new AnswerPossibility("Een bezoek van de partijen aan mijn school, jeugd/sportclub, …");
        var answerPossibility10 = new AnswerPossibility("Een gesprek met mijn ouders rond de gemeentepolitiek");
        var answerPossibility11 =
            new AnswerPossibility("Een debat georganiseerd door een jeugdhuis met de verschillende partijen");
        var answerPossibility12 = new AnswerPossibility("Zeker niet");
        var answerPossibility13 = new AnswerPossibility("Eerder niet");
        var answerPossibility14 = new AnswerPossibility("Ik weet het nog niet");
        var answerPossibility15 = new AnswerPossibility("Eerder wel");
        var answerPossibility16 = new AnswerPossibility("Zeker wel");

        // Circular Flow
        var answerPossibility17 = new AnswerPossibility("Infrastructuur");
        var answerPossibility18 = new AnswerPossibility("Milieuproblemen");
        var answerPossibility19 = new AnswerPossibility("Werkgelegenheid");
        var answerPossibility20 = new AnswerPossibility("Sociale Voorzieningen");
        var answerPossibility21 = new AnswerPossibility("Economische Ontwikkeling");
        //var answerPossibility22 = new AnswerPossibility("Ondersteuning van Kwetsbare Groepen");
        var answerPossibility23 = new AnswerPossibility("Duurzaamheid en Milieu");
        var answerPossibility24 = new AnswerPossibility("Onderwijs en Kinderopvang");
        var answerPossibility25 = new AnswerPossibility("Veiligheid en Openbare Orde");
        var answerPossibility26 = new AnswerPossibility("Cultuur, Sport en Recreatie");
        var answerPossibility27 = new AnswerPossibility("Lokale Belastingen en Financieel Beleid");
        var answerPossibility28 = new AnswerPossibility("Zeker niet");
        var answerPossibility29 = new AnswerPossibility("Eerder niet");
        var answerPossibility30 = new AnswerPossibility("Ik weet het nog niet");
        var answerPossibility31 = new AnswerPossibility("Eerder wel");
        var answerPossibility32 = new AnswerPossibility("Zeker wel");
        
        

        // Creating SubThemes
        var subTheme1 = new SubTheme("KiesIntenties",
            "Ben je nog aan het twijfelen over op wie je wilt stemmen bij de aankomende verkiezingen? Het is belangrijk om te overwegen welke kandidaten het beste aansluiten bij jouw waarden en visie voor de toekomst van onze gemeente. Neem de tijd om de verschillende partijprogramma's te bekijken en de standpunten van de kandidaten te onderzoeken, zodat je een weloverwogen keuze kunt maken op verkiezingsdag.");
        var subTheme2 = new SubTheme("Redenen om (niet) te gaan stemmen",
            "Stemmen is een belangrijk onderdeel van onze democratie, maar soms kunnen er redenen zijn waarom mensen ervoor kiezen om niet te stemmen. Of het nu gaat om twijfels over het nut van hun stem, ontevredenheid over het politieke systeem, of praktische obstakels zoals tijdgebrek, het is essentieel om deze redenen te begrijpen en manieren te vinden om de betrokkenheid van alle burgers bij het democratische proces te vergroten.");
        var subTheme3 = new SubTheme("Gevoel van betrokkenheid bij lokaal beleid",
            "Hoe betrokken voel jij je bij het beleid dat wordt uitgestippeld in onze gemeente? Of het nu gaat om de planning van nieuwe projecten, de organisatie van lokale evenementen, of het aanpakken van gemeenschapsproblemen, jouw betrokkenheid en input als burger zijn van onschatbare waarde voor het vormgeven van een bloeiende en inclusieve lokale gemeenschap.");
        var subTheme4 = new SubTheme("bevraging peer-feedback",
            "Het subthema \"Verbetering van peer-feedback\" in de bevragingen focust op het verkrijgen van feedback van gebruikers over hoe het platform peer-to-peer samenwerking en feedback kan verbeteren. Dit helpt om inzicht te krijgen in de huidige ervaringen van studenten en om potentiële verbeteringen te identificeren");

        // Linking Answer Possibilities to Questions (except for open)
        // Linear Flow
        singleChoice1.AnswerPossibilities.Add(answerPossibility1);
        singleChoice1.AnswerPossibilities.Add(answerPossibility2);
        singleChoice1.AnswerPossibilities.Add(answerPossibility3);
        singleChoice1.AnswerPossibilities.Add(answerPossibility4);
        singleChoice1.AnswerPossibilities.Add(answerPossibility5);
        //singleChoice1.AnswerPossibilities.Add(answerPossibility6);
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
        //singleChoice2.AnswerPossibilities.Add(answerPossibility22);
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


        // Adding SubThemes to MainTheme
        mainTheme1.SubThemes.Add(subTheme1);
        mainTheme1.SubThemes.Add(subTheme2);
        mainTheme1.SubThemes.Add(subTheme3);
        mainTheme2.SubThemes.Add(subTheme4);

        // Creating Flows
        var flow1 = new Flow("Bevraging gemeentebeleid", FlowType.Linear, Language.Dutch, "flow over gemeentebeleid");
        var flow2 = new Flow("Bevraging milieu", FlowType.Circular, Language.Dutch, "flow over milieu");
        var flow3 = new Flow("Bevraging platform studenten", FlowType.Circular, Language.Dutch,
            "Bevraging over samenwerkingsplatform voor middelbare studenten");
        //Creating Userinputs
        var userInput1 = new UserInput(1, 2, 1, 1, 1);

        // Adding Flows to SubTheme
        subTheme2.Flows.Add(flow1);
        subTheme2.Flows.Add(flow2);
        subTheme4.Flows.Add(flow3);
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
        
        flow3.Questions.Add(singleChoice3);
        flow3.Questions.Add(range3);
        flow3.Questions.Add(multipleChoice3);
        flow3.Questions.Add(open3);
        
        // Adding objects to the context
        context.SubThemes.Add(subTheme1);
        context.SubThemes.Add(subTheme2);
        context.SubThemes.Add(subTheme3);

        context.Flows.Add(flow1);
        context.Flows.Add(flow2);
        context.Flows.Add(flow3);
        
        context.Questions.Add(singleChoice1);
        context.Questions.Add(multipleChoice1);
        context.Questions.Add(range1);
        context.Questions.Add(open1);

        context.Questions.Add(singleChoice2);
        context.Questions.Add(multipleChoice2);
        context.Questions.Add(range2);
        context.Questions.Add(open2);
        
        context.Questions.Add(singleChoice3);
        context.Questions.Add(multipleChoice3);
        context.Questions.Add(range3);
        context.Questions.Add(open3);

        context.AnswerPossibilities.Add(answerPossibility1);
        context.AnswerPossibilities.Add(answerPossibility2);
        context.AnswerPossibilities.Add(answerPossibility3);
        context.AnswerPossibilities.Add(answerPossibility4);
        context.AnswerPossibilities.Add(answerPossibility5);
        //context.AnswerPossibilities.Add(answerPossibility6);
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
        //context.AnswerPossibilities.Add(answerPossibility22);
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

        context.AnswerPossibilities.Add(answerPossibility33);
        context.AnswerPossibilities.Add(answerPossibility34);
        context.AnswerPossibilities.Add(answerPossibility35);
        context.AnswerPossibilities.Add(answerPossibility36);
        context.AnswerPossibilities.Add(answerPossibility37);
        context.AnswerPossibilities.Add(answerPossibility38);
        context.AnswerPossibilities.Add(answerPossibility39);
        context.AnswerPossibilities.Add(answerPossibility40);
        context.AnswerPossibilities.Add(answerPossibility41);
        context.AnswerPossibilities.Add(answerPossibility42);
        context.AnswerPossibilities.Add(answerPossibility43);
        context.AnswerPossibilities.Add(answerPossibility44);
        context.AnswerPossibilities.Add(answerPossibility45);
        
        
        context.SaveChanges();
        context.ChangeTracker.Clear();
    }
    
    public static void RoleCreation(RoleManager<IdentityRole> roleManager)
    {
        roleManager.CreateAsync(new IdentityRole(Manager)).Wait();
        
        roleManager.CreateAsync(new IdentityRole(Supervisor)).Wait();
        
        roleManager.CreateAsync(new IdentityRole(Admin)).Wait();
        
        roleManager.CreateAsync(new IdentityRole(User)).Wait();
    }
}

