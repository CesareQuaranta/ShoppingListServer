# ShoppingListServer
Serverside Shopping List Web App

Backend con funzionalità di creazione sessione utente, caching ed interfaccia per il salvataggio e l'interrogazioni della base dati.

Obiettivi:
-----------

* Utilizzo architettura [Express](http://expressjs.com/it/)
* Gestione Sessione con [Passport](http://passportjs.org/) e server redis
* Interfacciamnto con MongoDb con [Monk](https://github.com/Automattic/monk)
* Tabella utenti MongoDb
* Password criptate, meccanismo di modifica password, password smarrita
* Tabella dati MongoDb
* Configurazioni esternalizzate

Advanced
-----------

Gestione accessi contemporanei