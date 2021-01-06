Este projeto consiste na seguinte estrutura:

AppNode<br />
├── app<br/>
│   ├── Dockerfile<br/>
│   ├── package.json<br/>
│   └── server.js<br/>
├── docker-compose.yml<br/>
├── mysql<br/>
│   ├── db<br/>
│   │   └── database_schema.sql<br/>
│   └── Dockerfile<br/>
├── README.md<br/>
├── reverse<br/>
│   ├── Dockerfile<br/>
│   ├── nginx.conf<br/>
│   └── SSL<br/>
└── startProject.sh<br/>

todo o ambiente foi projetado em Linux<br/>
porém como utilizaremos o Docker para deploy,<br/>
toda estrutura funcionará perfeitamente no windows/Linux/mac;<br/>
<br/>
Aplicações necessárias:<br/>
<br/>
Docker<br/>
Docker-compose<br/>
Ansible (para chamada do ambiente na AWS)<br/>
<br/>
-<br/>
sobre o projeto:::<br/>
<br/>
consiste em uma API onde utiliza um banco de dados Mysql para armazenamento de dados,<br/>
e um proxy reverso para redirecionamento dos HTTP request.<br/>
<br/>
<br/>
o que foi feito para funcionamento do ambiente:<br/>
<br/>
primeiramente a verificação do código server.js<br/>
no mesmo foi verificado variáveis de ambiente para o NODE.js<br/>
observando que não havia a chama do dotenv a mesma foi adicionada<br/>
ao inicio do código para o funcionamento correto.<br/>
<br/>
foi criado um diretório /app organizando os docs referente a aplicação,<br/>
no diretório terá seu dockerfile contendo a instalação das dependencias para <br/>funcionamento do node.js e dotenv apartir do npm, expondo a porta 8080 para <br/>funcionamento da aplicação.<br/>
<br/>
foi criado um diretório /mysql organizando os docs referente ao banco mysql<br/>
contendo uma subpasta /db onde está o banco da aplicação e seu dockerfile<br/>
no momento do build realizando a copia do banco para o entripoynt.d do mysql<br/>
para que todo o banco seja criado automaticamente deixando tudo mais prático.<br/>
<br/>
foi criado um diretorio /reverser organizando os docs referente ao proxy reverso<br/>
nele temos o seu dockerfile fazendo o build, em seu build apenas faço a copia do do nginx.conf onde possui a config para o proxy reverso. <br/>

<br/><br/>
Iniciano tudo automaticamente em ambiente Linux:<br/>
<br/>
to terminal ao realizar o git clone do projeto,
navegue até /AppNode<br/>
<br/>
ainda no terminal precisaremos dar permissão de execução ao shell script de inicialização;<br/>
<br/>
chmod +x ./startProject.sh<br/>
<br/>
após conceder permissão de execução apenas execute o script:<br/>
./startProject.sh<br/>

será relizada toda verificação se já possui imagens ou buildś<br/>
após as verificação ira iniciar todo ambiente em docker disponível para uso.<br/>
<br/>
para inciar o Ambiente em Linux/Windows/Mac:<br />
recomendado remover qualquer versão das seguintes imagens em seu docker:<br/>
ngix , mysql:5.7, node:10
evitando problemas de build diferente, execute:<br />
docker image rm nginx:latest mysql:5.7 node:10
<br />
após iniciamos todo o build e deploy com:<br />
docker-compose up<br />
<br />
<br />
<br />
considerações finais:<br/>
Peço desculpas em não poder encaminhar o projeto com SSL,<br/>
uma infra com terraform na AWS ou monitando o mesmo no zabbix os prometheus.<br/>
estou trabalhando em alguns projetos fullpunk na empresa que ainda me encontro,<br/>
como está bem acelerado as coias no inicio do ano por aqui, peço a consideração,<br/>
porém em um momento oportuno que poder demostrar minha habilidade com tais skill <br/>faltante ficaria agradecido.<br/>
