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

di seguito tutti gli endpoints del progetto.

### Users (ID, name, age, city, timestamp)

GET api/users/ - mostra tutti gli utenti 
GET api/users/:id - mostra l'utente con ID specifico
POST api/users/ - Creazione utente 
PUT api/users/:id - modifica utente con ID specifico
DELETE api/users/:id - cancella utente con ID specifico

### Post


GET api/posts/ - mostra tutti i posts
GET api/posts/:id - mostra il post con ID specifico
POST api/posts/ - Creazione post 
PUT api/posts/:id - modifica post con ID specifico
DELETE api/posts/:id - cancella post con ID specifico
GET api/post/city/:city - mostra tutti i post provenienti da una cittá specifica


### interaction (postId, userId, type, text)


GET api/interactions/ - mostra tutti le interazioni
GET api/interactions/:id - mostra le interazioni con ID specifico
POST api/interactions/ - Creazione interazioni 
PUT api/interactions/:id - modifica interazioni con ID specifico
DELETE api/interactions/:id - cancella interazioni con ID specifico
GET api/interactions/city/:city - mostra tutte le interazioni provenienti da una cittá specifica
GET api/interactions/date?date=date - mostra tutte le interazioni realizzate in una data specifica

