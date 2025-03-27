// Atualiza o contador na tela e no localStorage
function updateCartCount(newCount) {
	const cartCountElem = document.querySelector('.cart-count');
	if (cartCountElem) {
	  cartCountElem.textContent = newCount;
	}
	localStorage.setItem('cartCount', newCount);
  }
  
  // Ao carregar a página, inicializa o contador com o valor salvo
  document.addEventListener('DOMContentLoaded', () => {
	const savedCount = parseInt(localStorage.getItem('cartCount')) || 0;
	updateCartCount(savedCount);
  });
  
  console.log("JS carregado com sucesso");
  var requestOptions = {
	method: 'GET',
	redirect: 'follow'
  };
  
  fetch("https://corebiz-test-server.onrender.com/api/v1/products", requestOptions)
	.then(response => response.json())
	.then(products => {
	  console.log(products);
	  
	  // Seleciona o container do swiper-wrapper para os produtos
	  const list = document.getElementById('product-swiper-wrapper');
  
	  products.forEach((product, index) => {
		// Cria o slide para o Swiper
		const slide = document.createElement('div');
		slide.className = 'swiper-slide';
  
		// Cria o card do produto – usamos a classe "card"
		const card = document.createElement('div');
		card.className = 'card';
  
		// Estrelas
		const starCount = product.stars || 0;
		const stars = '★'.repeat(starCount) + '☆'.repeat(5 - starCount);
  
		// Preço "de" – exibe se houver listPrice (indicando desconto)
		const de = product.listPrice 
		  ? `<div class="preco-de">de R$ ${(product.listPrice / 100).toFixed(2)}</div>` 
		  : '';
  
		// Label de desconto – exibe "OFF" se houver listPrice
		const off = product.listPrice 
		  ? `<p class="off">OFF</p>` 
		  : '';
  
		// Parcelamento
		const installment = product.installments[0]
		  ? `<div class="parcelamento">${product.installments[0].quantity}x de R$ ${(product.installments[0].value / 100).toFixed(2)}</div>`
		  : '';
  
		// Botão CTA
		const cta = `<button class="cta-button">COMPRAR</button>`;
  
		card.innerHTML = `
		  <img class="img-prodct" src="${product.imageUrl}" alt="${product.productName}">
		  <h3>${product.productName}</h3>
		  <div class="stars">${stars}</div>
		  ${de}
		  <div class="preco-por">por R$ ${(product.price / 100).toFixed(2)}</div>
		  ${installment}
		  ${off}
		  ${cta}
		`;
  
		// Adiciona evento ao botão CTA para incrementar o contador do carrinho
		const btnCTA = card.querySelector('.cta-button');
		btnCTA.addEventListener('click', (e) => {
		  e.stopPropagation(); // Impede que o clique no botão dispare outros eventos
		  let currentCount = parseInt(localStorage.getItem('cartCount')) || 0;
		  updateCartCount(currentCount + 1);
		});
  
		// Insere o card dentro do slide e o slide no swiper-wrapper
		slide.appendChild(card);
		list.appendChild(slide);
	  });
  
	  // Inicializa o Swiper para o slider de produtos
	  new Swiper('.product-swiper', {
		loop: true,
		slidesPerView: 2, // Mobile: 2 produtos
		spaceBetween: 20,
		navigation: {
		  nextEl: '.swiper-button-next',
		  prevEl: '.swiper-button-prev'
		},
		breakpoints: {
		  768: {
			slidesPerView: 4 // Desktop: 4 produtos
		  }
		}
	  });
	})
	.catch(error => console.error('Erro ao carregar os produtos:', error));
  
  // Injeção de CSS específico para o slider de produtos
  const style = document.createElement('style');
  style.innerHTML = `
	/* Estilização do container do swiper-wrapper */
	#product-swiper-wrapper {
	  padding: 0 20px;
	}
  
	/* Navegação */
	.product-swiper .swiper-button-prev,
	.product-swiper .swiper-button-next {
	  position: absolute;
	  top: 50%;
	  transform: translateY(-50%);
	  color: #000;
	  font-size: 2em;
	  z-index: 10;
	}
	.product-swiper .swiper-button-prev {
	  left: 0;
	}
	.product-swiper .swiper-button-next {
	  right: 0;
	}
  
	/* Card do produto */
	.card {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  max-width: 216px; /* Largura máxima para o card no desktop */
	  min-height: 350px; /* Altura mínima para o card */
	  margin: 10px;
	  position: relative;
	}
	.card h3 {
	  color: #7A7A7A;
	  text-align: center;
	  font-family: Nunito, sans-serif;
	  font-size: 12px;
	  font-weight: 600;
	}
	.stars {
	  color: #F8475F;
	}
	/* Botão CTA do card – oculto por padrão, mas com margin-top: auto para ficar alinhado à base */
	.cta-button {
	  display: none;
	  margin-top: auto;
	  padding: 10px 20px;
	  background-color: black;
	  color: white;
	  text-align: center;
	  border: none;
	  font-weight: bold;
	  cursor: pointer;
	  border-radius: 4px;
	  margin-bottom: 10px;
	  transition: background-color 0.2s;
	  align-self: center;
	}
	/* Exibe o botão quando o mouse passa sobre o card */
	.card:hover .cta-button {
	  display: block;
	}
	/* O botão se mantém visível quando houver interação (para a lógica do cart-count, por exemplo) */
	.card.selected .cta-button {
	  display: block !important;
	}
	/* Efeito hover para o botão */
	.cta-button:hover {
	  background-color: #333;
	}

.card:hover {
    background-color: #E6E8EA;}

  
	/* Imagem do produto - Desktop */
	.card img {
	  width: 216px;
	  height: auto;
	}
  
	/* Ajustes para mobile */
	@media (max-width: 768px) {
	  /* Remove setas de navegação */
	  .product-swiper .swiper-button-prev,
	  .product-swiper .swiper-button-next {
		display: none;
	  }
	  /* Diminui o padding para aproximar o slider das bordas */
	  #product-swiper-wrapper {
		padding: 0 10px;
	  }
	  /* Reduz o margin dos cards para evitar sobreposição */
	  .card {
		margin: 5px;
		text-align: center;
		max-width: 160px;
	  }
	  /* Ajuste de largura da imagem no mobile */
	  .card img {
		width: 160px;
		height: auto;
	  }
	}
  
	/* CSS para a label de desconto */
	#product-swiper-wrapper .card .off {
	  display: flex;
	  position: absolute;
	  padding: 12.25px 7.92px 0 0;
	  right: 0;
	  color: var(--light-text-color, #fff);
	  font-weight: 900;
	  font-size: 16px;
	  line-height: 22px;
	  clip-path: polygon(100% 0, 0 0, 100% 100%);
	  width: 81.36px;
	  height: 72.04px;
	  justify-content: flex-end;
	}
  `;
  document.head.appendChild(style);
  