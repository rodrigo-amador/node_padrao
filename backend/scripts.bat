SET ambiente=%1
IF %ambiente% == production copy .env.prod .env
IF %ambiente% == homologation copy .env.hom .env
IF %ambiente% == development copy .env.dev .env
IF %ambiente% == localhost copy .env.local .env