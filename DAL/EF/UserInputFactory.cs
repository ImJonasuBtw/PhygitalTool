using PhygitalTool.DAL.IRepositorys;
using PhygitalTool.Domain.FlowPackage;

namespace PhygitalTool.DAL.EF;

public class UserInputFactory
{
    private readonly IRepositoryAnswer _answerRepository;
    private readonly IRepositoryUserInput _repositoryUserInput;
    private readonly IRepositoryFlow _repositoryFlow;

    public UserInputFactory(IRepositoryAnswer answerRepository, IRepositoryUserInput repositoryUserInput, IRepositoryFlow repositoryFlow)
    {
        _answerRepository = answerRepository;
        _repositoryUserInput = repositoryUserInput;
        _repositoryFlow = repositoryFlow;
        
    }

    public void GenerateRandomUserInputForAllFlows(int amountOfGenerationsPerFlow)
    {
        var totalAmountOfFlow = _repositoryFlow.ReadTotalAmountOfFlows();
        
        for (int i = 1; i <= amountOfGenerationsPerFlow; i++)
        {
            for (int flowId = 1; flowId <= totalAmountOfFlow; flowId++)
            {
                GenerateRandomUserInput(flowId);
            }
        }
    }

    public void GenerateRandomUserInput(int flowId)
    {
        var flow = _repositoryFlow.ReadFlow(flowId);
        
        foreach (var question in flow.Questions)
        {
            var rnd = new Random();

            var maxAnswerPossibilities = question.AnswerPossibilities.Count;
            var randomAnswerPossibility = rnd.Next(maxAnswerPossibilities);

            if (question.AnswerPossibilities.Count != 0)
            {
                var answerText = question.AnswerPossibilities.ElementAt(randomAnswerPossibility).Description;
                
                var answerId = AddAnswer(answerText, question.QuestionId);
                AddUserInput(
                    answerId,
                    flow.FlowId,
                    flow.SubThemeId,
                    flow.SubTheme.MainThemeId,
                    flow.SubTheme.MainTheme.ProjectId
                );
            }
        }
    }
    
    private void AddUserInput(int answerId, int flowId, int subThemeId, int mainThemeId, int projectId)
    {
        var userInput = new UserInput()
        {
            AnswerId = answerId,
            FlowId = flowId,
            SubThemeId = subThemeId,
            MainThemeId = mainThemeId,
            ProjectId = projectId
        };

        _repositoryUserInput.CreateUserInput(userInput);
    }

    private int AddAnswer(string answerText, int questionId)
    {
        var domainAnswer = new Answer()
        {
            AnswerText = answerText,
            QuestionId = questionId
        };

        var newAnswer = _answerRepository.CreateAndReturnAnswer(domainAnswer);
        domainAnswer.AnswerId = newAnswer.AnswerId;

        return domainAnswer.AnswerId;
    }

    public void GenerateOpenAnswers()
    {
        var values = new List<string>
        {
            "Het aanpakken van de woningcrisis en zorgen voor betaalbare woningen is cruciaal om de leefbaarheid in de gemeente te waarborgen.",
            "Investeren in groene energie en milieuvriendelijke initiatieven is essentieel voor een gezonde toekomst voor onze kinderen en het behoud van onze planeet.",
            "Het verbeteren van wegen, fietspaden en openbaar vervoer zorgt voor een veiliger en efficiënter verplaatsingsnetwerk voor iedereen.",
            "Goede scholen en voorzieningen voor jongeren zijn van groot belang voor hun ontwikkeling en toekomstperspectieven.",
            "Toegankelijke en kwalitatieve gezondheidszorg en ondersteuning voor kwetsbare groepen moeten prioriteit krijgen om een gezonde gemeenschap te bevorderen.",
            "Het stimuleren van lokale bedrijven en het aantrekken van nieuwe werkgelegenheid is cruciaal voor economische groei en stabiliteit.",
            "Een veilige leefomgeving door middel van effectieve criminaliteitspreventie en handhaving verhoogt het gevoel van veiligheid voor alle inwoners.",
            "Investeren in culturele voorzieningen en recreatiemogelijkheden draagt bij aan de sociale cohesie en levenskwaliteit in de gemeente.",
            "Het verbeteren van digitale voorzieningen en internettoegang is essentieel voor modern werken, onderwijs en communicatie.",
            "Het bevorderen van gelijke kansen en het respecteren van diversiteit zorgt voor een inclusieve samenleving waar iedereen zich thuis voelt."
        };
        
        foreach (var answerText in values)
        {

            var domainAnswer = new Answer()
            {
                AnswerText = answerText,
                QuestionId = 4
            };

            var newAnswer = _answerRepository.CreateAndReturnAnswer(domainAnswer);
            
            var userInput = new UserInput()
            {
                AnswerId = newAnswer.AnswerId,
                FlowId = 1,
                SubThemeId = 2,
                MainThemeId = 1,
                ProjectId = 1
            };

            _repositoryUserInput.CreateUserInput(userInput);
        }
        
        
    }
}