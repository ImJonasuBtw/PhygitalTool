import {GoogleGenerativeAI, HarmBlockThreshold, HarmCategory} from "@google/generative-ai";
import {getGemini} from "./gemini-restclient";

const MODEL_NAME= "gemini-1.5-flash";


async function run(inputText: string) {
    const API_KEY = await getGemini();
    
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({model: MODEL_NAME});

    const generationConfig = {
        temperature: 1,
        topK: 64,
        topP: 0.95,
        maxOutputTokens: 8192,
    };

    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
    ];

    const parts = [
        {text: "Je analyseert gegeven antwoorden op open vragen uit een enquête. Hiervan maak je een korte Nederlandse tekst van 5 tot 10 zinnen. Indien er niks logisch of nuttigs wordt gezegd, vertel dan simpelweg wat er is gezegd zonder te te langdradig te zijn. Indien een deel van de antwoorden niks nuttigs is, analyseer dan enkel de antwoorden die wel nuttig zijn. Vermeld de enquête niet en vraag niet waar deze over gaat, je analyseert enkel de antwoorden. Geef enkel een korte analyse, niks extra."},
        {text: "input: hsadf hajshfkjl hsakljdhfklhfkljhsaklhdfklhksdhkfs, Woningbouw en betaalbaarheid: Het aanpakken van de woningcrisis en zorgen voor betaalbare woningen is cruciaal om de leefbaarheid in de gemeente te waarborgen.,Duurzaamheid en klimaat: Investeren in groene energie en milieuvriendelijke initiatieven is essentieel voor een gezonde toekomst voor onze kinderen en het behoud van onze planeet.,Verkeersveiligheid en infrastructuur: Het verbeteren van wegen, fietspaden en openbaar vervoer zorgt voor een veiliger en efficiënter verplaatsingsnetwerk voor iedereen."},
        {text: "output: De respondenten benoemen drie belangrijke thema's: woningbouw en betaalbaarheid, duurzaamheid en klimaat, en verkeersveiligheid en infrastructuur. Ze benadrukken de noodzaak om te investeren in betaalbare woningen, groene energie en milieuvriendelijke initiatieven, en het verbeteren van het verkeerssysteem."},
        {text: "input: woop woop"},
        {text: "output: Er werden geen zinvolle antwoorden gegeven"},
        {text: "input: "},
        {text: "output: Er zijn geen antwoorden gegeven"},
        {text: "input: Woningbouw en betaalbaarheid: Het aanpakken van de woningcrisis en zorgen voor betaalbare woningen is cruciaal om de leefbaarheid in de gemeente te waarborgen.,Duurzaamheid en klimaat: Investeren in groene energie en milieuvriendelijke initiatieven is essentieel voor een gezonde toekomst voor onze kinderen en het behoud van onze planeet.,Verkeersveiligheid en infrastructuur: Het verbeteren van wegen, fietspaden en openbaar vervoer zorgt voor een veiliger en efficiënter verplaatsingsnetwerk voor iedereen.,hsadf hajshfkjl hsakljdhfklhfkljhsaklhdfklhksdhkfs"},
        {text: "output: De respondenten benoemen drie belangrijke thema's: woningbouw en betaalbaarheid, duurzaamheid en klimaat, en verkeersveiligheid en infrastructuur. Ze benadrukken de noodzaak om te investeren in betaalbare woningen, groene energie en milieuvriendelijke initiatieven, en het verbeteren van het verkeerssysteem."},
        {text: "input: jafksdjkadsfjksadf;j jkafjk;l asjk;dfjkl;jk;ljkasfdhsak fjs"},
        {text: "output: Er werden geen zinvolle antwoorden gegeven"},
        {text: "input: hgkhsafhjhfh jshfjkhsah fjkhskfhkl ahjt hk jshkfs,Cultuur en recreatie: Investeren in culturele voorzieningen en recreatiemogelijkheden draagt bij aan de sociale cohesie en levenskwaliteit in de gemeente.,Digitale infrastructuur: Het verbeteren van digitale voorzieningen en internettoegang is essentieel voor modern werken, onderwijs en communicatie.,Inclusie en diversiteit: Het bevorderen van gelijke kansen en het respecteren van diversiteit zorgt voor een inclusieve samenleving waar iedereen zich thuis voelt."},
        {text: "output: De gebruikers benadrukken het belang van investeren in culturele voorzieningen en recreatiemogelijkheden om de sociale cohesie en levenskwaliteit in de gemeente te verbeteren. Ze vinden dat het verbeteren van digitale infrastructuur en internettoegang essentieel is voor modern werken, onderwijs en communicatie. Daarnaast pleiten ze voor het bevorderen van gelijke kansen en het respecteren van diversiteit om een inclusieve samenleving te creëren. Volgens de gebruikers dragen deze initiatieven bij aan een gemeenschap waar iedereen zich thuis voelt en toegang heeft tot de nodige middelen. Hierdoor wordt een harmonieuze en welvarende omgeving gestimuleerd."},
        {text: "input: Woningbouw en betaalbaarheid: Het aanpakken van de woningcrisis en zorgen voor betaalbare woningen is cruciaal om de leefbaarheid in de gemeente te waarborgen.,Duurzaamheid en klimaat: Investeren in groene energie en milieuvriendelijke initiatieven is essentieel voor een gezonde toekomst voor onze kinderen en het behoud van onze planeet.,Verkeersveiligheid en infrastructuur: Het verbeteren van wegen, fietspaden en openbaar vervoer zorgt voor een veiliger en efficiënter verplaatsingsnetwerk voor iedereen.,Onderwijs en jeugdvoorzieningen: Goede scholen en voorzieningen voor jongeren zijn van groot belang voor hun ontwikkeling en toekomstperspectieven.,Gezondheidszorg en welzijn: Toegankelijke en kwalitatieve gezondheidszorg en ondersteuning voor kwetsbare groepen moeten prioriteit krijgen om een gezonde gemeenschap te bevorderen.,Werkgelegenheid en economie: Het stimuleren van lokale bedrijven en het aantrekken van nieuwe werkgelegenheid is cruciaal voor economische groei en stabiliteit.,Veiligheid en criminaliteitspreventie: Een veilige leefomgeving door middel van effectieve criminaliteitspreventie en handhaving verhoogt het gevoel van veiligheid voor alle inwoners.,Cultuur en recreatie: Investeren in culturele voorzieningen en recreatiemogelijkheden draagt bij aan de sociale cohesie en levenskwaliteit in de gemeente.,Digitale infrastructuur: Het verbeteren van digitale voorzieningen en internettoegang is essentieel voor modern werken, onderwijs en communicatie.,Inclusie en diversiteit: Het bevorderen van gelijke kansen en het respecteren van diversiteit zorgt voor een inclusieve samenleving waar iedereen zich thuis voelt."},
        {text: "output: De respondenten vinden het belangrijk om te investeren in betaalbare woningen, groene energie en milieuvriendelijke initiatieven, een veilig en efficiënt vervoersysteem, goede scholen en voorzieningen voor jongeren, toegankelijke en kwalitatieve gezondheidszorg, stimuleren van lokale bedrijven en het aantrekken van nieuwe werkgelegenheid, een veilige leefomgeving, culturele voorzieningen en recreatiemogelijkheden, verbeterde digitale voorzieningen en internettoegang, en het bevorderen van gelijke kansen en diversiteit."},
        {text: `input: ${inputText}`},
        {text: "output: "},
    ];

    const result = await model.generateContent({
        contents: [{role: "user", parts}],
        generationConfig,
        safetySettings,
    });

    const response = result.response;
    return response.text();
}

export function generateSummary(inputText: string) {
    return run(inputText);
}