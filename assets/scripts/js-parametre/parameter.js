document.getElementById('edit-button').addEventListener('click', function() {
    document.querySelectorAll('.info input').forEach(input => {
        input.disabled = false; // Active les champs de texte
    });

    document.getElementById('edit-button').disabled = true; // Désactive le bouton "Modifier"
    document.getElementById('save-button').disabled = false; // Active le bouton "Enregistrer"
});

document.getElementById('save-button').addEventListener('click', function() {
    document.querySelectorAll('.info input').forEach(input => {
        input.disabled = true; // Désactive les champs de texte
    });
    document.getElementById('edit-button').disabled = false; // Active le bouton "Modifier"
    document.getElementById('save-button').disabled = true; // Désactive le bouton "Enregistrer"
});
