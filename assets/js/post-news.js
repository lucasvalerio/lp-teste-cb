
  // Seleciona os elementos do DOM
  const form = document.getElementById('newsletter-form');
  const nameInput = form.name;
  const emailInput = form.email;
  const nameAlert = document.getElementById('inputNameAlert');
  const emailAlert = document.getElementById('inputEmailAlert');
  const newsletterContent = document.getElementById('newsletter-content');
  const successMessage = document.getElementById('success-message');
  const newSubscribeBtn = document.getElementById('new-subscribe');

  // Função para validar o nome
  function validateName() {
    let message = "";
    if (!nameInput.value.trim()) {
      message = "Preencha com seu nome completo";
      nameInput.classList.add('erro'); // classe para destaque
    } else {
      nameInput.classList.remove('erro');
    }
    nameAlert.innerText = message;
    // Retorna "true" se não houver erro
    return message === "";
  }

  // Função para validar o e-mail
  function validateEmail() {
    let message = "";
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    // Verifica se está vazio
    if (!emailInput.value.trim()) {
      message = "Preencha com um e-mail válido";
      emailInput.classList.add('erro');
    }
    // Verifica a sintaxe via regex
    else if (!regexEmail.test(emailInput.value)) {
      message = "Preencha com um e-mail válido";
      emailInput.classList.add('erro');
    } else {
      emailInput.classList.remove('erro');
    }

    emailAlert.innerText = message;
    return message === "";
  }

  // Ouvinte de evento "submit"
  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Impede o envio automático

    // Limpa mensagens de erro anteriores
    nameAlert.innerText = "";
    emailAlert.innerText = "";

    // Executa validações
    const isNameValid = validateName();
    const isEmailValid = validateEmail();

    // Se algum campo estiver inválido, interrompe
    if (!isNameValid || !isEmailValid) return;

    // Monta o objeto JSON para enviar
    const raw = JSON.stringify({
      name: nameInput.value,
      email: emailInput.value
    });

    // Faz a requisição para a API
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

        // Se deu certo (status 200 ou 201 e mensagem de sucesso)
        if ((response.status === 200 || response.status === 201) && result.message === "Created successfully") {
          newsletterContent.classList.add('hidden'); // Esconde o formulário
          successMessage.classList.remove('hidden'); // Mostra a mensagem de sucesso
          form.reset(); // Limpa os campos
        } else {
          alert("Erro ao enviar. Tente novamente.");
        }
      })
      .catch(error => {
        console.error('Erro:', error);
        alert("Erro ao enviar. Tente novamente.");
      });
  });

  // Botão para exibir o formulário novamente
  newSubscribeBtn.addEventListener('click', function () {
    successMessage.classList.add('hidden');
    newsletterContent.classList.remove('hidden');
  });
