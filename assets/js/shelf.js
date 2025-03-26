console.log("JS carregado com sucesso");
var requestOptions = {
	method: 'GET',
	redirect: 'follow'
};

fetch("https://corebiz-test-server.onrender.com/api/v1/products")
	.then(response => response.json())
	.then(products => {
		console.log(products);
		
		// Seleciona o container do swiper-wrapper para os produtos
		const list = document.getElementById('product-swiper-wrapper');

		products.forEach((product, index) => {
			// Cria o slide para o Swiper
			const slide = document.createElement('div');
			slide.className = 'swiper-slide';

			// Cria o card do produto
			const card = document.createElement('div');
			card.className = 'product-card';

			// Estrelas
			const starCount = product.stars || 0;
			const stars = '★'.repeat(starCount) + '☆'.repeat(5 - starCount);

			// Preço "de"
			const de = product.listPrice ? `<div class="price-de">de R$ ${(product.listPrice / 100).toFixed(2)}</div>` : '';

			// Parcelamento
			const installment = product.installments[0]
				? `<div class="parcelamento">${product.installments[0].quantity}x de R$ ${(product.installments[0].value / 100).toFixed(2)}</div>`
				: '';

			// Botão CTA
			const cta = `<button class="cta-button" style="display: none;">COMPRAR</button>`;

			card.innerHTML = `
				<img class="img-prodct" src="${product.imageUrl}" alt="${product.productName}">
				<h3>${product.productName}</h3>
				<div class="stars">${stars}</div>
				${de}
				<div class="price-por">por R$ ${(product.price / 100).toFixed(2)}</div>
				${installment}
				${cta}
			`;

			// Evento para selecionar o produto
			card.addEventListener('click', () => {
				const previouslySelected = document.querySelector('.product-card.selected');
				if (previouslySelected && previouslySelected !== card) {
					previouslySelected.classList.remove('selected');
					previouslySelected.querySelector('.cta-button').style.display = 'none';
				}
				card.classList.toggle('selected');
				const ctaButton = card.querySelector('.cta-button');
				ctaButton.style.display = card.classList.contains('selected') ? 'block' : 'none';
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
	});

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

	.product-card {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		max-width: 200px;
		margin: 10px;
	}
	.product-card.selected {
		background-color: #E6E8EA;
	}
	.product-card h3 {
		color: #7A7A7A;
		text-align: center;
		font-family: Nunito, sans-serif;
		font-size: 12px;
		font-weight: 600;
	}
	.stars {
		color: #F8475F;
	}
	.cta-button {
		padding: 10px 20px;
		background-color: black;
		color: white;
		text-align: center;
		border: none;
		font-weight: bold;
		cursor: pointer;
		border-radius: 4px;
		transition: background-color 0.2s;
		align-self: center;
		display: none;
	}
`;
document.head.appendChild(style);
