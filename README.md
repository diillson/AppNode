##### Este projeto consiste na seguinte estrutura:

```
AppNode
├── app
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
├── chamadas.txt
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
├── startProject.sh
└── testeAPI.sh

5 directories, 12 files
```

todo o ambiente foi projetado em Linux<br/>
porém como utilizaremos o Docker para deploy,<br/>
toda estrutura funcionará perfeitamente no windows/Linux/mac;<br/>
<br/>

**Aplicações necessárias:**<br/>
<br/>
Docker<br/>
Docker-compose<br/>
Ansible (para chamada do ambiente na AWS)<br/>

**:::Sobre o projeto:::**<br/>
consiste em uma API, onde utiliza um banco de dados Mysql para armazenamento de dados,<br/>
e um proxy reverso para redirecionamento dos HTTP request.<br/>
<br/>

**O que foi feito para funcionamento do ambiente:**<br/>
primeiramente a verificação do código server.js<br/>
no mesmo foi verificado variáveis de ambiente para o NODE.js<br/>
observando que não havia a chamada do dotenv,
foi adicionado ao inicio do código para o funcionamento correto.<br/>

**Diretórios/arquivos:**<br/>
foi criado um diretório /app organizando os docs referente a aplicação/servidor NODE.js,<br/>
no diretório terá seu dockerfile, server.js e package.json contendo a instalação das dependências para funcionamento do node.js<br />
e dotenv a partir do npm, expondo a porta 8080 para funcionamento do servidor NODE.js.<br/>
<br/>
foi criado um diretório /mysql organizando os docs referente ao banco mysql<br/>
contendo uma subpasta /db onde está o banco da aplicação, seu dockerfile na raiz na mesma estrutura,<br/>
no momento do build realizando a copia do banco para o entripoynt.d do mysql,<br/>
para que todo o banco seja criado automaticamente deixando tudo mais prático.<br/>
<br/>
foi criado um diretorio /reverser organizando os docs referente ao proxy reverso<br/>
nele temos o seu dockerfile fazendo o build, em seu build apenas faço a copia do do nginx.conf onde possui a config para o proxy reverso. <br/>

**Sobre o Docker-compose.yaml:**<br/>
nele terá todo código de deploy da aplicação,<br/>
em primeiro faço que o container MySQL inicie, preparando o banco junto de suas variáveis;<br/>
em segundo com uma dependecia do MySQL, ele somente inicia após o SQL está ok, container do servidor NODE.js<br/>
em terceiro o proxy reverso, utilizo um Nginx para tal, somente inicia após o container do servidor NODE.js está operante;</br>

**Iniciano tudo automaticamente em ambiente Linux:**<br/>
no terminal ao realizar o git clone do projeto,
navegue até /AppNode, onde está localizado o script de inicialização.<br/>
<br/>
ainda no terminal precisaremos dar permissão de execução ao shell-script de inicialização;<br/>

```
$ chmod +x ./startProject.sh

```
<br/>
após conceder permissão de execução apenas execute o script:<br/>

```
$ ./startProject.sh<br/>
```
será relizada toda verificação necessária, se já possui imagens ou buildś<br/>
após as verificação ira iniciar todo ambiente em docker, ao fim disponibilizando para uso.<br/>
<br/>

##### INICIANDO MANUALMENTE 
para inciar o Ambiente manualmente com ``` $ docker-compose up ``` em Linux/Windows/Mac:<br />
recomendado remover qualquer versão das seguintes imagens em seu docker:<br/>
```
ngix , mysql:5.7, node:10

-- Evitando qualquer conflito, para isso utilize:
$ docker image rm nginx:latest mysql:5.7 node:10
```
<br />
após a verificação e limpeza das imagens, iniciar todo o build e deploy com:

```
$ docker-compose up 

```
<br />

##### PROCESSO DE TESTE DA API 

**Teste automatizado:** 
Precisamos realizar o mesmo procedimento de permissão de execução para o testeAPI.sh
<br/>
dentro do diretorio raiz do projeto: /AppNode, realize o seguinte:

```
$ chmod +x ./testeAPI.sh
```

Após basta chamar o Shell-Script:
```
$ ./testeAPI.sh
```
<br />
<br />
considerações finais:<br/>
Peço desculpas em não poder encaminhar o projeto com SSL,<br/>
uma infra com terraform na AWS ou monitando o mesmo no zabbix os prometheus.<br/>
estou trabalhando em alguns projetos fullpunk na empresa que ainda me encontro,<br/>
como está bem acelerado as coias no inicio do ano por aqui, peço a consideração,<br/>
porém em um momento oportuno que poder demostrar minha habilidade com tais skill <br/>faltante ficaria agradecido.<br/>
