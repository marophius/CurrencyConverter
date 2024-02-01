# CurrencyConverter

## Sobre o projeto

CurrencyConverter é uma aplicação angular cuja finalidade é verificar periodicamente se houve variações na cotação do Dólar Canadense(CAD), Peso Argentindo(ARS) e Libra Esterlina(GBP). Desenvolvido para ser reativo e responsivo, possuindo componentes que mudam seu estado de acordo com o carregamento dos dados.

### Tecnologias utilizadas
- Typescript
- Angular 17
- Docker
- Jasmine
- Visual Studio Code

### Arquitetura

Desenvolvido tendo como base uma arquitetura baseada em componentes, os componentes desse projeto são independentes para que seja possível reutilizar código, melhorar a testabilidade, ser flexível entre outras coisas.

### Smart Component

O smart component é o nome que se dá ao componente dentro do contexto de arquitetura baseada em componentes ao componente que é responsável por gerenciar estados, manipular lógica e interagir com serviços externos. No CurrencyConverter, o AppComponent é o nosso smart component.

- Os dados são trazidos através de um serviço que consulta a API e converte os objetos em objetos do tipo ICurrency, utilizamos um observable timer para criar uma sequência observável que consulta a API a cada 3 minutos.

### Dumb Component

- Outro conceito também da arquitetura baseada em componentes é o Dumb Component, que não possui um estado próprio, ele recebe dados que vem de componentes inteligentes, utilizar essa estratégia dentro do angular pode trazer benefícios como a possibilidade do uso de detecção de mudanças "OnPush" que amplifica a performance da aplicação, pois ela não terá que checar mudanças a todo o momento, apenas quando houverem mudanças nos inputs e outputs do component. Por issso nosso componente burro é o CurrencyCardComponent que vai receber dados do AppComponent(SmartComponent) através de inputs.

### Diretivas e Pipes

Visando separar responsabilidades e seguir boas práticas, uma diretiva foi criada para fazer alterações na DOM caso o valor das cotações se alterem e um pipe foi criado para deixar o nome da moeda como queremos.

### Suporte ao Docker

Caso queira ver a aplicação usando o docker você tem duas opções:
#### Opção 1:
- git clone https://github.com/marophius/CurrencyConverter.git
- Vá até a pasta onde o projeto se encontra, abra um terminal e escreva: "docker build -t currency-converter ."
- O comando acima irá construir uma imagem docker para que você possa rodar containers a partir dela.
- Após o fim da construção da imagem volte ao terminal e digite: "docker run -d -p 4200:80 currency-converter"

#### Opção 2 
Com o docker instalado no computador digite:
- docker pull marophius/currency-converter:latest
- docker run -d -p 4200:80 marophius/currency-converter

### Rodando o projeto localmente
Após baixar o projeto abra um terminal na pasta em que o projeto se encontra em seu computador e:
- Use o comando "npm i" para instalar as dependências
Após finalizar a instalação de dependências:
- Use o comando "ng serve" para rodar a aplicação.
- Abra seu navegador na porta 4200

### Imagens


