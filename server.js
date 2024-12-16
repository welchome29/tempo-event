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
app.use(express.static(path.join(__dirname, 'public')));

// Rediriger la racine vers tempo-event.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'tempo-event.html'));
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
        { id: 5, titre: "Encore et encore - Remastered - Francis Cabrel", choisiPar: null },
        { id: 6, titre: "Sarbacane - Remastered - Francis Cabrel", choisiPar: null },
        { id: 7, titre: "Destinée - Vladimir Cosma et  Guy Marchand", choisiPar: null },
        { id: 8, titre: "C'est la ouate - Radio Edit Original Version 1987 - Caroline Loeb", choisiPar: null },
        { id: 9, titre: "Diego libre dans sa tête - France Gall", choisiPar: null },
        { id: 10, titre: "Les marionnettes - Christophe", choisiPar: null },
        { id: 11, titre: "Trois nuits par semaine - Indochine", choisiPar: null },
        { id: 12, titre: "Chanson sur ma drole de vie - Véronique Sanson", choisiPar: null },
        { id: 13, titre: "Foule sentimentale - Alain souchon", choisiPar: null },
        { id: 14, titre: "L'amour et la machine - Alain souchon", choisiPar: null },
        { id: 15, titre: "J'ai dix ans - Alain souchon", choisiPar: null },
        { id: 16, titre: "J'aime les filles - Remastered 2004 - Jacques Dutronc", choisiPar: null },
        { id: 17, titre: "Et moi, et moi, et moi - Jacques Dutronc", choisiPar: null },
        { id: 18, titre: "Que je t'aime - Johnny Hallyday", choisiPar: null },
        { id: 19, titre: "La musique que j'aime - Johnny Hallyday", choisiPar: null },
        { id: 20, titre: "Voyage en Italie - Lilicub", choisiPar: null },
        { id: 21, titre: "Bélinda - Claude François", choisiPar: null },
        { id: 22, titre: "Les murs de poussière - Remastered - Francis Cabrel", choisiPar: null },
        { id: 23, titre: "Le temps de l'amour - Françoise Hardy", choisiPar: null },
        { id: 24, titre: "Tous les garçons et les filles - Slow - Françoise Hardy", choisiPar: null },
        { id: 25, titre: "Quand t'es dans le desert - Jean-Patrick Capdevielle", choisiPar: null },
        { id: 26, titre: "Cherchez le garçon - Taxi Girl", choisiPar: null },
        { id: 27, titre: "Vertige de l'amour - Alain Bashung", choisiPar: null },
        { id: 28, titre: "Viens je t'emmene - France Gall", choisiPar: null },
        { id: 29, titre: "Aline - Christophe", choisiPar: null },
        { id: 30, titre: "Manhattan-Kaboul - Renaud et Axelle Red", choisiPar: null },
        { id: 31, titre: "Comme un boomerang - Serge Gainsbourg", choisiPar: null },
        { id: 32, titre: "Vieille canaille - Serge Gainsbourg", choisiPar: null },
        { id: 33, titre: "La fleur aux dents - Joe Dassin", choisiPar: null },
        { id: 34, titre: "L'Amérique - Joe Dassin", choisiPar: null },
        { id: 35, titre: "Siffler sur la colline - Joe Dassin", choisiPar: null },
        { id: 36, titre: "J'irai où tu iras - Céline Dion et Jean-Jacques Goldman", choisiPar: null },
        { id: 37, titre: "Les comédiens - Charles Aznavour", choisiPar: null },
        { id: 38, titre: "Lorelei sébasto cha - Remastered 2018 - Hubert-Félix Thiéfaine", choisiPar: null },
        { id: 39, titre: "La dernière séance - Eddy Mitchell", choisiPar: null },
        { id: 40, titre: "L'opportuniste - Live - Jacques Dutronc", choisiPar: null },
        { id: 41, titre: "La fille du coupeur de joints - Hubert-Félix Thiéfaine", choisiPar: null },
        { id: 42, titre: "Je ne suis pas un héros - Daniel Balavoine", choisiPar: null },
        { id: 43, titre: "La ballade de Jim - Alain Souchon", choisiPar: null },
        { id: 44, titre: "Le vent nous portera - Noir Désir", choisiPar: null },
        { id: 45, titre: "La grenade - Clara Luciani", choisiPar: null },
        { id: 46, titre: "Capri c'est fini - Hervé Vilard", choisiPar: null },
        { id: 47, titre: "J'ai encore révé d'elle - Il Etait Une Fois", choisiPar: null },
        { id: 48, titre: "Salut les amoureux - City Of New Orleans - Joe Dassin", choisiPar: null },
        { id: 49, titre: "Andy - Les Rita Mitsouko", choisiPar: null },
        { id: 50, titre: "Les histoires d'a - Les Rita Mitsouko", choisiPar: null },
        { id: 51, titre: "Quand la musique est bonne - Jean-Jacques Goldman", choisiPar: null },
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

    console.log("Données reçues pour l'inscription :", { prenom, nom, chansonId });

    let workbook;
    let data = [];

    if (fs.existsSync(excelFilePath)) {
        // Lire le fichier Excel existant
        workbook = xlsx.readFile(excelFilePath);
        const worksheet = workbook.Sheets['Inscriptions'];
        data = worksheet ? xlsx.utils.sheet_to_json(worksheet) : [];
    } else {
        console.log("Fichier Excel non trouvé. Création d'un nouveau fichier...");
        workbook = xlsx.utils.book_new();
    }

    const chansons = [
        { id: 1, titre: "Pour un flirt - Michel Delpech", choisiPar: null },
        { id: 2, titre: "Pendant que les champs brulent - Niagara", choisiPar: null },
        { id: 3, titre: "C'est Toi Que Je T'aime - Head Fish", choisiPar: null },
        { id: 4, titre: "Vanina (Runaway) - Dave", choisiPar: null },
        { id: 5, titre: "Encore et encore - Remastered - Francis Cabrel", choisiPar: null },
        { id: 6, titre: "Sarbacane - Remastered - Francis Cabrel", choisiPar: null },
        { id: 7, titre: "Destinée - Vladimir Cosma et  Guy Marchand", choisiPar: null },
        { id: 8, titre: "C'est la ouate - Radio Edit Original Version 1987 - Caroline Loeb", choisiPar: null },
        { id: 9, titre: "Diego libre dans sa tête - France Gall", choisiPar: null },
        { id: 10, titre: "Les marionnettes - Christophe", choisiPar: null },
        { id: 11, titre: "Trois nuits par semaine - Indochine", choisiPar: null },
        { id: 12, titre: "Chanson sur ma drole de vie - Véronique Sanson", choisiPar: null },
        { id: 13, titre: "Foule sentimentale - Alain souchon", choisiPar: null },
        { id: 14, titre: "L'amour et la machine - Alain souchon", choisiPar: null },
        { id: 15, titre: "J'ai dix ans - Alain souchon", choisiPar: null },
        { id: 16, titre: "J'aime les filles - Remastered 2004 - Jacques Dutronc", choisiPar: null },
        { id: 17, titre: "Et moi, et moi, et moi - Jacques Dutronc", choisiPar: null },
        { id: 18, titre: "Que je t'aime - Johnny Hallyday", choisiPar: null },
        { id: 19, titre: "La musique que j'aime - Johnny Hallyday", choisiPar: null },
        { id: 20, titre: "Voyage en Italie - Lilicub", choisiPar: null },
        { id: 21, titre: "Bélinda - Claude François", choisiPar: null },
        { id: 22, titre: "Les murs de poussière - Remastered - Francis Cabrel", choisiPar: null },
        { id: 23, titre: "Le temps de l'amour - Françoise Hardy", choisiPar: null },
        { id: 24, titre: "Tous les garçons et les filles - Slow - Françoise Hardy", choisiPar: null },
        { id: 25, titre: "Quand t'es dans le desert - Jean-Patrick Capdevielle", choisiPar: null },
        { id: 26, titre: "Cherchez le garçon - Taxi Girl", choisiPar: null },
        { id: 27, titre: "Vertige de l'amour - Alain Bashung", choisiPar: null },
        { id: 28, titre: "Viens je t'emmene - France Gall", choisiPar: null },
        { id: 29, titre: "Aline - Christophe", choisiPar: null },
        { id: 30, titre: "Manhattan-Kaboul - Renaud et Axelle Red", choisiPar: null },
        { id: 31, titre: "Comme un boomerang - Serge Gainsbourg", choisiPar: null },
        { id: 32, titre: "Vieille canaille - Serge Gainsbourg", choisiPar: null },
        { id: 33, titre: "La fleur aux dents - Joe Dassin", choisiPar: null },
        { id: 34, titre: "L'Amérique - Joe Dassin", choisiPar: null },
        { id: 35, titre: "Siffler sur la colline - Joe Dassin", choisiPar: null },
        { id: 36, titre: "J'irai où tu iras - Céline Dion et Jean-Jacques Goldman", choisiPar: null },
        { id: 37, titre: "Les comédiens - Charles Aznavour", choisiPar: null },
        { id: 38, titre: "Lorelei sébasto cha - Remastered 2018 - Hubert-Félix Thiéfaine", choisiPar: null },
        { id: 39, titre: "La dernière séance - Eddy Mitchell", choisiPar: null },
        { id: 40, titre: "L'opportuniste - Live - Jacques Dutronc", choisiPar: null },
        { id: 41, titre: "La fille du coupeur de joints - Hubert-Félix Thiéfaine", choisiPar: null },
        { id: 42, titre: "Je ne suis pas un héros - Daniel Balavoine", choisiPar: null },
        { id: 43, titre: "La ballade de Jim - Alain Souchon", choisiPar: null },
        { id: 44, titre: "Le vent nous portera - Noir Désir", choisiPar: null },
        { id: 45, titre: "La grenade - Clara Luciani", choisiPar: null },
        { id: 46, titre: "Capri c'est fini - Hervé Vilard", choisiPar: null },
        { id: 47, titre: "J'ai encore révé d'elle - Il Etait Une Fois", choisiPar: null },
        { id: 48, titre: "Salut les amoureux - City Of New Orleans - Joe Dassin", choisiPar: null },
        { id: 49, titre: "Andy - Les Rita Mitsouko", choisiPar: null },
        { id: 50, titre: "Les histoires d'a - Les Rita Mitsouko", choisiPar: null },
        { id: 51, titre: "Quand la musique est bonne - Jean-Jacques Goldman", choisiPar: null },
    ];

    const chanson = chansons.find((c) => c.id === chansonId);
    if (!chanson) {
        console.error("Chanson introuvable pour l'ID :", chansonId);
        return res.status(400).json({ error: "Chanson introuvable" });
    }

    const dejaChoisie = data.find((entry) => entry.Chanson === chanson.titre);
    if (dejaChoisie) {
        console.error("Chanson déjà choisie :", chanson.titre);
        return res.status(400).json({ error: "Cette chanson est déjà choisie." });
    }

    // Ajouter la nouvelle inscription
    data.push({ Participant: `${prenom} ${nom}`, Chanson: chanson.titre });

    // Convertir les données en feuille Excel
    const newWorksheet = xlsx.utils.json_to_sheet(data);

    // Supprimer la feuille existante si elle existe
    if (workbook.Sheets['Inscriptions']) {
        delete workbook.Sheets['Inscriptions'];
    }

    // Ajouter la nouvelle feuille au fichier Excel
    xlsx.utils.book_append_sheet(workbook, newWorksheet, 'Inscriptions');
    xlsx.writeFile(workbook, excelFilePath);

    console.log("Inscription ajoutée avec succès :", { prenom, nom, chanson: chanson.titre });
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