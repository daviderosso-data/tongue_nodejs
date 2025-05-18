# tongue_nodejs
Davide Rosso - daviderosso.data@gmail.com

## Descrizione

Questo é un progetto a scopo educativo creato per Start2Impact, nel percorso di Full Stack Development.
L'obiettivo del progetto é la creazione di una API RESTFul per un Blog/Giornale online.

## Installazione

1. clona il progetto
2. installa le dipendenze 'npm install'
3. crea un database su MongoDB
4. crea un file .env con le caratteristiche di .env.esempio
5. fai partire l'applicazione con 'npm start'

## API Endpoints

Di seguito tutti gli endpoints del progetto.

### Users (ID, name, age, city, timestamp)

* GET api/users/ - mostra tutti gli utenti 
  Mostra tutti gli utenti  
  **Puoi filtrare usando i seguenti parametri di query:**  
  - `id`: filtra per ID specifico  
  - `city`: filtra per città dell'utente  
  - `offset`: numero di elementi da saltare (per paginazione)  
  - `limit`: numero massimo di risultati da restituire (per paginazione)  
  **Esempi:**  
  - `/api/users?city=Milano&limit=10&offset=20`  
  - `/api/users?id=ID_USER`
* POST api/users/ - Creazione utente 
* PUT api/users/:id - modifica utente con ID specifico
* DELETE api/users/:id - cancella utente con ID specifico

### Post   (ID, title, text, userId, timestamp)


* GET api/posts/ - mostra tutti i post.
  **Puoi filtrare usando i seguenti parametri di query:**  
  - `id`: filtra per ID specifico  
  - `city`: filtra per città dell'utente  
  - `date`: filtra per data (`YYYY-MM-DD`)  
  - `offset`: numero di elementi da saltare (per paginazione)  
  - `limit`: numero massimo di risultati da restituire (per paginazione)  
* POST api/posts/ - Creazione post 
* PUT api/posts/:id - modifica post con ID specifico
* DELETE api/posts/:id - cancella post con ID specifico



### interaction (postId, userId, type, text, timestamp)


* GET api/interactions/ - mostra tutte le interazioni
  **Puoi filtrare usando i seguenti parametri di query:**  
  - `id`: filtra per ID specifico  
  - `city`: filtra per città dell'utente  
  - `postId`: filtra per post specifico  
  - `date`: filtra per data (`YYYY-MM-DD`)  
  - `offset`: numero di elementi da saltare (per paginazione)  
  - `limit`: numero massimo di risultati da restituire (per paginazione)  
  **Esempi:**  
  - `/api/interactions?city=Milano&date=2025-05-06&limit=10&offset=20`  
  - `/api/interactions?postId=ID_DEL_POST`  
  - `/api/interactions?id=ID_INTERAZIONE`
* POST api/interactions/ - Creazione interazioni 
* PUT api/interactions/:id - modifica interazioni con ID specifico
* DELETE api/interactions/:id - cancella interazioni con ID specifico


