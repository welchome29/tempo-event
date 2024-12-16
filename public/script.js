const API_URL = "https://tempo-event-1.onrender.com";

// Référence des éléments HTML
const form = document.getElementById("karaoke-form");
const chansonSelect = document.getElementById("chanson");
const confirmationDiv = document.getElementById("confirmation");

// Récupérer les chansons depuis le serveur
async function fetchChansons() {
    const response = await fetch(`${API_URL}/chansons`);
    return response.json();
}

// Mettre à jour la liste des chansons
async function mettreAJourListe() {
    const chansons = await fetchChansons();
    chansonSelect.innerHTML = "";

    chansons.forEach((chanson) => {
        const option = document.createElement("option");
        option.value = chanson.id;
        option.textContent = chanson.choisiPar
            ? `${chanson.titre} (choisi par ${chanson.choisiPar})`
            : chanson.titre;
        if (chanson.choisiPar) {
            option.disabled = true; // Griser les chansons déjà choisies
        }
        chansonSelect.appendChild(option);
    });
}

// Gestion de l'inscription
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const prenom = document.getElementById("prenom").value;
    const nom = document.getElementById("nom").value;
    const chansonId = parseInt(chansonSelect.value);

    // Envoyer les données au serveur
    const response = await fetch(`${API_URL}/inscrire`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prenom, nom, chansonId }),
    });

    if (response.ok) {
        await mettreAJourListe();
        confirmationDiv.classList.remove("hidden");
        confirmationDiv.innerHTML = `<p>Merci ${prenom} ${nom}, vous avez choisi votre chanson !</p>`;
        form.reset();
    } else {
        alert("Erreur lors de l'inscription.");
    }
});

// Initialisation
mettreAJourListe();
