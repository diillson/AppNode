Este projeto consiste na seguinte estrutura:

AppNode
├── app
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
├── docker-compose.yml
├── mysql
│   ├── db
│   │   └── database_schema.sql
│   └── Dockerfile
├── README.md
├── reverse
│   ├── Dockerfile
│   ├── nginx.conf
│   └── SSL
└── startProject.sh

todo o ambiente foi projetado em Linux/Debian
porém como é utilizado como base no Docker,
toda sua estrutura funcionará perfeitamente no windows;

Aplicações necessárias:
Docker
Docker-compose
Ansible (para chamada do ambiente na AWS)

-
sobre o projeto:::
consiste em uma API onde utiliza um banco de dados Mysql para armazenamento de dados,
e um proxy reverso para redirecionamento dos HTTP request.


o que foi feito para funcionamento do ambiente:

primeiramente a verificação do código server.js
no mesmo foi verificado variáveis de ambiente para o NODE.js
observando que não havia a chama do dotenv a mesma foi adicionada
ao inicio do código para o funcionamento correto.

foi criado um diretório /app organizando os docs referente a aplicação,
no diretório terá seu dockerfile contendo a instalação das dependencias para funcionamento do node.js e dotenv apartir do npm, expondo a porta 8080 para funcionamento da aplicação.

foi criado um diretório /mysql organizando os docs referente ao banco mysql
contendo uma subpasta /db onde está o banco da aplicação e seu dockerfile
no momento do build realizando a copia do banco para o entripoynt.d do mysql
para que todo o banco seja criado automaticamente deixando tudo mais prático.

foi criado um diretorio /reverser organizando os docs referente ao proxy reverso
nele temos o seu dockerfile fazendo o build, em seu build apenas faço a copia do do nginx.conf onde possui a config para o proxy reverso. 


Iniciano tudo automaticamente em ambiente Linux:

to terminal ao realizar o git clone do projeto,
navegue até /AppNode

ainda no terminal precisaremos dar permissão de execução ao shell script de inicialização;

chmod +x ./startProject.sh

após conceder permissão de execução apenas execute o script
./startProject.sh

será relizada toda verificação se já possui imagens ou buildś
após as verificação ira iniciar todo ambiente em docker disponível para uso.

Iniciando o Ambiente em Linux/Windows/Mac
através do:
docker-compose up

remomendado remover qualquer verao de imagem em seu docker evitando problemas de build diferente dos seguintes:
ngix , mysql:5.7, node:10

considerações finais:
Peço desculpas em não poder encaminhar o projeto com SSL,
uma infra com terraform na AWS ou monitando o mesmo no zabbix os prometheus.
estou trabalhando em alguns projetos fullpunk na empresa que ainda me encontro,
como está bem acelerado as coias no inicio do ano por aqui, peço a consideração,
porém em um momento oportuno que poder demostrar minha habilidade com tais skill faltante ficaria agradecido.
