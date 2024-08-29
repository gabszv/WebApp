let dadosPaises = {};

function carregarDados() {
    fetch('https://api-paises.pages.dev/paises.json')
        .then(response => response.json())
        .then(dados => {
            dadosPaises = dados;
        })
        .catch(error => console.error('Erro ao carregar os dados dos países:', error));
}

function sugerirPaises() {
    const input = document.querySelector('#nome').value.toLowerCase();
    const sugestoes = document.querySelector('#sugestoes');

    sugestoes.innerHTML = ''; 

    if (input.length === 0) return; 

    const paisesFiltrados = Object.values(dadosPaises).filter(pais => 
        pais.pais.toLowerCase().includes(input)
    );

    paisesFiltrados.forEach(pais => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${pais.img}" alt="Bandeira de ${pais.pais}">
            <div>
                <span>${pais.pais}</span>
                <span>DDI: +${pais.ddi}</span>
                <span>${pais.continente}</span>
            </div>
        `;
        li.onclick = () => {
            document.querySelector('#nome').value = pais.pais;
            buscarPais(); 
            document.querySelector('#sugestoes').innerHTML = ''; // Limpa as sugestões
        };
        sugestoes.appendChild(li);
    });
}

function buscarPais() {
    const nomePais = document.querySelector('#nome').value.toLowerCase();
    const resultadoDiv = document.querySelector('#resultado');
    const sugestoes = document.querySelector('#sugestoes');

    resultadoDiv.innerHTML = ''; // Limpa o resultado anterior
    sugestoes.innerHTML = ''; // Limpa as sugestões

    const paisEncontrado = Object.values(dadosPaises).find(pais => 
        pais.pais.toLowerCase() === nomePais
    );

    if (paisEncontrado) {
        const paisDiv = document.createElement('div');
        paisDiv.className = 'pais';
        paisDiv.innerHTML = `
            <img src="${paisEncontrado.img}" alt="Bandeira de ${paisEncontrado.pais}">
            <div>
                <p><strong>País:</strong> ${paisEncontrado.pais}</p>
                <p><strong>DDI:</strong> +${paisEncontrado.ddi}</p>
                <p><strong>Continente:</strong> ${paisEncontrado.continente}</p>
            </div>
        `;
        resultadoDiv.appendChild(paisDiv);
    } else {
        resultadoDiv.innerHTML = '<p>País não encontrado.</p>';
    }
}


carregarDados();


document.querySelector('#nome').addEventListener('input', sugerirPaises);


document.querySelector('#btn').addEventListener('click', buscarPais);
