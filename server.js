const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const xlsx = require('xlsx');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // Render fournit un port dynamique

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Chemin du fichier Excel
const excelFilePath = path.join(__dirname, 'inscriptions.xlsx');

// Servir les fichiers statiques depuis un dossier dédié
app.use(express.static(path.join(__dirname, 'public')));

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
    const workbook = xlsx.readFile(excelFilePath);
    const worksheet = workbook.Sheets['Inscriptions'];
    const data = xlsx.utils.sheet_to_json(worksheet);

    const chansons = [
        { id: 1, titre: "Imagine - John Lennon", choisiPar: null },
        { id: 2, titre: "Billie Jean - Michael Jackson", choisiPar: null },
        { id: 3, titre: "Bohemian Rhapsody - Queen", choisiPar: null },
        { id: 4, titre: "Shape of You - Ed Sheeran", choisiPar: null },
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

    const workbook = xlsx.readFile(excelFilePath);
    const worksheet = workbook.Sheets['Inscriptions'];
    const data = xlsx.utils.sheet_to_json(worksheet);

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

    data.push({ Participant: `${prenom} ${nom}`, Chanson: chanson.titre });
    const newWorksheet = xlsx.utils.json_to_sheet(data);
    workbook.Sheets['Inscriptions'] = newWorksheet;
    xlsx.writeFile(workbook, excelFilePath);

    res.json({ message: "Inscription réussie", chanson });
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
