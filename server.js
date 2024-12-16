const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const xlsx = require('xlsx');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // Port fourni par Render ou 3000 localement

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Chemin du fichier Excel
const excelFilePath = path.join(__dirname, 'inscriptions.xlsx');

// Servir les fichiers statiques depuis le dossier 'public'
app.use(express.static(path.join(__dirname, 'Public')));

// Rediriger la racine vers tempo-event.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'tempo-event.html'));
});

// Vérifie si le fichier Excel existe, sinon crée-le
if (!fs.existsSync(excelFilePath)) {
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet([]);
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Inscriptions');
    xlsx.writeFile(workbook, excelFilePath);
}

// Endpoint pour récupérer la liste des chansons
app.get('/chansons', (req, res) => {
    let data = [];
    if (fs.existsSync(excelFilePath)) {
        const workbook = xlsx.readFile(excelFilePath);
        const worksheet = workbook.Sheets['Inscriptions'];
        data = xlsx.utils.sheet_to_json(worksheet);
    }

    const chansons = [
        { id: 1, titre: "Pour un flirt - Michel Delpech", choisiPar: null },
        { id: 2, titre: "Pendant que les champs brulent - Niagara", choisiPar: null },
        { id: 3, titre: "C'est Toi Que Je T'aime - Head Fish", choisiPar: null },
        { id: 4, titre: "Vanina (Runaway) - Dave", choisiPar: null },
        { id: 4, titre: "Encore et encore - Remastered - Francis Cabrel", choisiPar: null },
        { id: 4, titre: "Sarbacane - Remastered - Francis Cabrel", choisiPar: null },
        { id: 4, titre: "Destinée - Vladimir Cosma et  Guy Marchand", choisiPar: null },
        { id: 4, titre: "C'est la ouate - Radio Edit Original Version 1987 - Caroline Loeb", choisiPar: null },
        { id: 4, titre: "Diego libre dans sa tête - France Gall", choisiPar: null },
        { id: 4, titre: "Les marionnettes - Christophe", choisiPar: null },
        { id: 4, titre: "Trois nuits par semaine - Indochine", choisiPar: null },
        { id: 4, titre: "Chanson sur ma drole de vie - Véronique Sanson", choisiPar: null },
        { id: 4, titre: "Foule sentimentale - Alain souchon", choisiPar: null },
        { id: 4, titre: "L'amour et la machine - Alain souchon", choisiPar: null },
        { id: 4, titre: "J'ai dix ans - Alain souchon", choisiPar: null },
        { id: 4, titre: "J'aime les filles - Remastered 2004 - Jacques Dutronc", choisiPar: null },
        { id: 4, titre: "Et moi, et moi, et moi - Jacques Dutronc", choisiPar: null },
        { id: 4, titre: "Que je t'aime - Johnny Hallyday", choisiPar: null },
        { id: 4, titre: "La musique que j'aime - Johnny Hallyday", choisiPar: null },
        { id: 4, titre: "Voyage en Italie - Lilicub", choisiPar: null },
        { id: 4, titre: "Bélinda - Claude François", choisiPar: null },
        { id: 4, titre: "Les murs de poussière - Remastered - Francis Cabrel", choisiPar: null },
        { id: 4, titre: "Le temps de l'amour - Françoise Hardy", choisiPar: null },
        { id: 4, titre: "Tous les garçons et les filles - Slow - Françoise Hardy", choisiPar: null },
        { id: 4, titre: "Quand t'es dans le desert - Jean-Patrick Capdevielle", choisiPar: null },
        { id: 4, titre: "Cherchez le garçon - Taxi Girl", choisiPar: null },
        { id: 4, titre: "Vertige de l'amour - Alain Bashung", choisiPar: null },
        { id: 4, titre: "Viens je t'emmene - France Gall", choisiPar: null },
        { id: 4, titre: "Aline - Christophe", choisiPar: null },
        { id: 4, titre: "Manhattan-Kaboul - Renaud et Axelle Red", choisiPar: null },
        { id: 4, titre: "Comme un boomerang - Serge Gainsbourg", choisiPar: null },
        { id: 4, titre: "Vieille canaille - Serge Gainsbourg", choisiPar: null },
        { id: 4, titre: "La fleur aux dents - Joe Dassin", choisiPar: null },
        { id: 4, titre: "L'Amérique - Joe Dassin", choisiPar: null },
        { id: 4, titre: "Siffler sur la colline - Joe Dassin", choisiPar: null },
        { id: 4, titre: "J'irai où tu iras - Céline Dion et Jean-Jacques Goldman", choisiPar: null },
        { id: 4, titre: "Les comédiens - Charles Aznavour", choisiPar: null },
        { id: 4, titre: "Lorelei sébasto cha - Remastered 2018 - Hubert-Félix Thiéfaine", choisiPar: null },
        { id: 4, titre: "La dernière séance - Eddy Mitchell", choisiPar: null },
        { id: 4, titre: "L'opportuniste - Live - Jacques Dutronc", choisiPar: null },
        { id: 4, titre: "La fille du coupeur de joints - Hubert-Félix Thiéfaine", choisiPar: null },
        { id: 4, titre: "Je ne suis pas un héros - Daniel Balavoine", choisiPar: null },
        { id: 4, titre: "La ballade de Jim - Alain Souchon", choisiPar: null },
        { id: 4, titre: "Le vent nous portera - Noir Désir", choisiPar: null },
        { id: 4, titre: "La grenade - Clara Luciani", choisiPar: null },
        { id: 4, titre: "Capri c'est fini - Hervé Vilard", choisiPar: null },
        { id: 4, titre: "J'ai encore révé d'elle - Il Etait Une Fois", choisiPar: null },
        { id: 4, titre: "Salut les amoureux - City Of New Orleans - Joe Dassin", choisiPar: null },
        { id: 4, titre: "Andy - Les Rita Mitsouko", choisiPar: null },
        { id: 4, titre: "Les histoires d'a - Les Rita Mitsouko", choisiPar: null },
        { id: 4, titre: "Quand la musique est bonne - Jean-Jacques Goldman", choisiPar: null },
    ];

    data.forEach((entry) => {
        const chanson = chansons.find((c) => c.titre === entry.Chanson);
        if (chanson) {
            chanson.choisiPar = entry.Participant;
        }
    });

    res.json(chansons);
});

// Endpoint pour enregistrer une inscription
app.post('/inscrire', (req, res) => {
    const { prenom, nom, chansonId } = req.body;

    let workbook;
    let data = [];
    if (fs.existsSync(excelFilePath)) {
        workbook = xlsx.readFile(excelFilePath);
        const worksheet = workbook.Sheets['Inscriptions'];
        data = xlsx.utils.sheet_to_json(worksheet);
    } else {
        workbook = xlsx.utils.book_new();
    }

    const chansons = [
        { id: 1, titre: "Imagine - John Lennon" },
        { id: 2, titre: "Billie Jean - Michael Jackson" },
        { id: 3, titre: "Bohemian Rhapsody - Queen" },
        { id: 4, titre: "Shape of You - Ed Sheeran" },
    ];

    const chanson = chansons.find((c) => c.id === chansonId);
    if (!chanson) {
        return res.status(400).json({ error: "Chanson introuvable" });
    }

    const dejaChoisie = data.find((entry) => entry.Chanson === chanson.titre);
    if (dejaChoisie) {
        return res.status(400).json({ error: "Cette chanson est déjà choisie." });
    }

    data.push({ Participant: `${prenom} ${nom}`, Chanson: chanson.titre });
    const newWorksheet = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(workbook, newWorksheet, 'Inscriptions');
    xlsx.writeFile(workbook, excelFilePath);

    res.json({ message: "Inscription réussie", chanson });
});

// Endpoint pour télécharger le fichier Excel
app.get('/telecharger-inscriptions', (req, res) => {
    if (fs.existsSync(excelFilePath)) {
        res.download(excelFilePath, 'inscriptions.xlsx', (err) => {
            if (err) {
                res.status(500).send('Erreur lors du téléchargement du fichier.');
            }
        });
    } else {
        res.status(404).send('Le fichier inscriptions.xlsx n\'existe pas.');
    }
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
