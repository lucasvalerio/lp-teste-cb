// Código JavaScript para o formulário de newsletter
console.log("JS carregado com sucesso");
	const form = document.getElementById('newsletter-form');
	const nameInput = form.name;
	const emailInput = form.email;
	const newsletterContent = document.getElementById('newsletter-content');
	const successMessage = document.getElementById('success-message');
	const newSubscribeBtn = document.getElementById('new-subscribe');
  
	form.addEventListener('submit', function (e) {
	  e.preventDefault();
  
	  // Reset
	  nameInput.classList.remove('erro');
	  emailInput.classList.remove('erro');
  
	  let erro = false;
  
	  if (!nameInput.value.trim()) {
		nameInput.classList.add('erro');
		erro = true;
	  }
  
	  if (!emailInput.value.trim() || !emailInput.value.includes('@')) {
		emailInput.classList.add('erro');
		erro = true;
	  }
  
	  if (erro) return;
  
	  const raw = JSON.stringify({
		name: nameInput.value,
		email: emailInput.value
	  });
  
	  fetch("https://corebiz-test-server.onrender.com/api/v1/newsletter", {
		method: 'POST',
		body: raw,
		headers: {
		  'Content-Type': 'application/json'
		}
	  })
		.then(async response => {
		  const result = await response.json();
		  console.log("Status HTTP:", response.status);
		  console.log("Resposta da API:", result);
  
		  if ((response.status === 200 || response.status === 201) && result.message === "Created successfully") {
			newsletterContent.classList.add('hidden'); // Oculta h2 + form
			successMessage.classList.remove('hidden'); // Mostra mensagem
			form.reset();
		  }
		})
		.catch(error => {
		  console.error('Erro:', error);
		  alert("Erro ao enviar. Tente novamente.");
		});
	});
  
	// Reexibir o formulário
	newSubscribeBtn.addEventListener('click', function () {
	  successMessage.classList.add('hidden');
	  newsletterContent.classList.remove('hidden');
	});
    console.log("Status HTTP:", response.status);
    console.log("Resposta da API:", result);
  