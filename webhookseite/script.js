function updateSendButtonState() {
    var webhookUrl = document.getElementById("webhookUrl").value;
    var message = document.getElementById("message").value;
    var embedTitle = document.getElementById("embedTitle").value;
    var embedDescription = document.getElementById("embedDescription").value;

    var sendButton = document.getElementById("sendButton");

    // Aktivieren des Buttons, wenn mindestens ein Feld ausgefüllt ist, andernfalls deaktivieren
    if (webhookUrl || message || embedTitle || embedDescription) {
        sendButton.removeAttribute("disabled");
    } else {
        sendButton.setAttribute("disabled", "disabled");
    }
}

// Fügen Sie Event-Listener für die Eingabefelder hinzu, um den Button-Status zu aktualisieren
document.getElementById("webhookUrl").addEventListener("input", updateSendButtonState);
document.getElementById("message").addEventListener("input", updateSendButtonState);
document.getElementById("embedTitle").addEventListener("input", updateSendButtonState);
document.getElementById("embedDescription").addEventListener("input", updateSendButtonState);
document.getElementById("embedColor").addEventListener("input", updateSendButtonState);

    function convertToDiscordLinks(text) {
        // Suchen nach Hyperlink-Mustern im Text und sie in Discord-kompatible Links umwandeln
        var regex = /<hyperlink:(.*?)\s*-\s*(.*?)>/g;
        var replacedText = text.replace(regex, function(match, displayText, linkUrl) {
            return '[' + displayText + '](' + linkUrl + ')';
        });
        return replacedText;
    }

    document.getElementById("sendButton").addEventListener("click", function() {
        // Webhook-URL und Nachricht aus den Eingabefeldern lesen und in Discord-kompatible Links umwandeln
        var webhookUrl = document.getElementById("webhookUrl").value;
        var message = document.getElementById("message").value;
        message = convertToDiscordLinks(message);
        
        // Embed-Optionen aus den Eingabefeldern lesen, nur wenn sie ausgefüllt sind
        var embedTitle = document.getElementById("embedTitle").value;
        var embedDescription = document.getElementById("embedDescription").value;
        var embedColor = document.getElementById("embedColor").value;
        
        // Daten für die POST-Anfrage an den Discord-Webhook
        var data = {
            content: message,
            embeds: []
        };
        
        // Embed nur hinzufügen, wenn mindestens ein Feld ausgefüllt ist
        if (embedTitle || embedDescription || embedColor) {
            data.embeds.push({
                title: embedTitle,
                description: embedDescription,
                color: embedColor ? parseInt(embedColor.replace("#", ""), 16) : undefined
            });
        }
        
        // POST-Anfrage an den Discord-Webhook senden
        fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(function(response) {
            if (response.ok) {
                alert("Nachricht erfolgreich gesendet!");
            } else {
                alert("Fehler beim Senden der Nachricht.");
            }
        })
        .catch(function(error) {
            alert("Fehler beim Senden der Nachricht: " + error);
        });

    });

    // Funktion, um den Dark Mode zu aktivieren
    function enableDarkMode() {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
    }

    // Funktion, um den Dark Mode zu deaktivieren
    function disableDarkMode() {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
    }

    // Überprüfen, ob der Dark Mode gespeichert ist
    if (localStorage.getItem('darkMode') === 'enabled') {
        enableDarkMode();
    }

    // Dark Mode-Schalter-Eventlistener
    document.getElementById('darkModeToggle').addEventListener('change', function() {
        if (this.checked) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    });


        function validateWebhookUrl() {
    var webhookUrl = document.getElementById("webhookUrl").value;
    var webhookValidation = document.getElementById("webhookValidation");
    var sendButton = document.getElementById("sendButton"); // Senden-Button

    // Regulärer Ausdruck zur Überprüfung einer gültigen Discord-Webhook-URL
    var webhookUrlPattern = /^https:\/\/discord\.com\/api\/webhooks\/\d+\/[\w-]+$/;

    if (webhookUrlPattern.test(webhookUrl)) {
        // Gültige URL: Umrandung grün, Haken anzeigen
        webhookValidation.innerHTML = "&#10004;"; // Haken-Symbol
        webhookValidation.style.color = "green";
        document.getElementById("webhookUrl").style.borderColor = "green";
        sendButton.removeAttribute("disabled"); // Senden-Button aktivieren
    } else {
        // Ungültige URL: Umrandung rot, X anzeigen
        webhookValidation.innerHTML = "&#10006;"; // X-Symbol
        webhookValidation.style.color = "red";
        document.getElementById("webhookUrl").style.borderColor = "red";
        sendButton.setAttribute("disabled", "disabled"); // Senden-Button deaktivieren
    }
}

document.getElementById("webhookUrl").addEventListener("input", validateWebhookUrl);

document.addEventListener("DOMContentLoaded", function() {
    // Funktion, um die Discord-Widgets beim Scrollen einzublenden
    function showDiscordWidgets() {
        const iframeContainer = document.querySelector(".discord-widgets");
        iframeContainer.classList.add("show"); // Füge die Klasse "show" hinzu, um die Einfliegeanimation auszulösen
    }

    // Initial werden die Discord-Widgets ausgeblendet und der Hintergrund ist hell
    const iframeContainer = document.createElement("div");
    iframeContainer.className = "discord-widgets";
    document.body.appendChild(iframeContainer);

    // Event-Listener, um die Discord-Widgets beim Scrollen einzublenden
    window.addEventListener("scroll", function() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const iframeContainerTop = iframeContainer.getBoundingClientRect().top;

        // Wenn der Container im Sichtbereich ist, zeigen Sie die Discord-Widgets an
        if (iframeContainerTop < windowHeight) {
            showDiscordWidgets();
        }
    });
});

// Event-Listener für das Scrollen
window.addEventListener("scroll", function() {
    // Überprüfen Sie, ob der Benutzer nach unten scrollt
    if (window.scrollY > 0) {
        document.body.classList.add('dark-background'); // Fügen Sie die Klasse "dark-background" hinzu
    } else {
        document.body.classList.remove('dark-background'); // Entfernen Sie die Klasse "dark-background", wenn nach oben gescrollt wird
    }
});

window.addEventListener('scroll', function() {
    var footer = document.getElementById('footer');
    var scrollY = window.scrollY;
    var windowHeight = window.innerHeight;
    var documentHeight = document.documentElement.scrollHeight;

    // Wenn der Benutzer ans Ende der Seite gescrollt ist, blenden Sie die Fußleiste ein
    if (scrollY + windowHeight >= documentHeight) {
        footer.style.opacity = '1';
    } else {
        footer.style.opacity = '0';
    }
});