
# Teste Corebiz Front-end

Uma LP com uma vitrine de produtos com banner rotativo, formulário de newsletter e contador de carrinho persistente.

## Índice

- [Visão Geral](#visão-geral)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Como Executar](#como-executar)
- [Funcionalidades](#funcionalidades)
  - [Banner Rotativo (Swiper)](#banner-rotativo-swiper)
  - [Vitrine de Produtos](#vitrine-de-produtos)
  - [Formulário de Newsletter](#formulário-de-newsletter)
  - [Carrinho (Cart Count)](#carrinho-cart-count)
  - [Responsividade](#responsividade)
- [Estrutura de Arquivos](#estrutura-de-arquivos)
- [Próximos Passos](#próximos-passos)


## Visão Geral

Este projeto demonstra uma vitrine de produtos que consome uma API para exibir informações (imagem, nome, rating, preço, parcelamento e desconto) em um slider. Também inclui um banner rotativo usando Swiper, um formulário de newsletter com validação básica e um contador de carrinho que persiste seu valor via localStorage. O layout é totalmente responsivo, adaptando-se a diferentes tamanhos de tela.

## Tecnologias Utilizadas

- **HTML5**
- **CSS3**
- **JavaScript (ES6+)**
- **Swiper.js** – para o banner rotativo e o slider de produtos
- **Fetch API** – para consumo da API de produtos
- **localStorage** – para persistir o contador de carrinho

## Pré-requisitos

- Navegador moderno (Chrome, Firefox, Edge, etc.)
- Editor de código (VSCode, Sublime, etc.)
- (Opcional) Servidor local para testes (ex.: Live Server no VSCode)

## Como Executar

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/lucasvalerio/lp-teste-cb.git
   ```
2. **Entre na pasta do projeto:**
   ```bash
   cd seu-repo
   ```
3. **Abra o arquivo `index.html` em seu navegador** ou use um servidor local (como o Live Server do VSCode).

## Funcionalidades

### Banner Rotativo (Swiper)
- Exibe slides com imagens, com variações para mobile e desktop.
- Configurado para loop infinito e com paginação clicável.

### Vitrine de Produtos
- Consome dados da API em [https://corebiz-test-server.onrender.com/api/v1/products](https://corebiz-test-server.onrender.com/api/v1/products).
- Exibe informações como imagem, nome, rating (estrelas), preço e parcelamento.
- Se houver desconto, exibe uma label "OFF" sobre a imagem.

### Formulário de Newsletter
- Captura o nome e o e-mail do usuário.
- Realiza validação básica antes do envio.
- Ao enviar com sucesso, exibe uma mensagem de confirmação e limpa o formulário.

### Carrinho (Cart Count)
- Cada produto possui um botão "COMPRAR" que, ao ser clicado, incrementa um contador.
- O contador é persistido no localStorage, mantendo seu valor mesmo após recarregar ou sair da página.

### Responsividade
- O layout se adapta para diferentes tamanhos de tela:
  - **Newsletter:** Empilha os inputs e o botão verticalmente em dispositivos móveis.
  - **Footer:** Empilha e centraliza os elementos para melhor visualização em telas pequenas.

## Estrutura de Arquivos

A estrutura do projeto é organizada da seguinte forma:

```
.
├── assets
│   ├── css
│   │   └── style.css
│   ├── img
│   │   ├── banners
│   │   │   ├── desk1.png
│   │   │   ├── desk2.png
│   │   │   └── ...
│   │   └── ...
│   └── js
│       ├── post-news.js
│       └── shelf.js
├── index.html
└── README.txt
```

## Próximos Passos

### Otimizações
- Implementar lazy loading para as imagens.
- Minificar e agrupar arquivos CSS/JS para produção.


### Melhorar Acessibilidade
- Adicionar atributos `alt`nas imagens.

### Testes
- Adicionar testes unitários e de integração para as funcionalidades principais.

## Responsividade

- **Melhoria de responsividade**
  - Melhorar a responsividade de telas intermediárias
