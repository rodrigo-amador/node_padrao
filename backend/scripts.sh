#production
if [ $NODE_ENV == 'production' ] 
then 
    cp -a .env.prod .env
fi 
  
#homologation
if [ $NODE_ENV == 'homologation' ] 
then 
    cp -a .env.hom .env
fi 

#development
if [ $NODE_ENV == 'development' ] 
then 
    cp -a .env.dev .env
fi 

#localhost
if [ $NODE_ENV == 'localhost' ] 
then 
    cp -a .env.local .env
fi 
