//Oi, tudo bom?
//Pedro aqui, sim o carinha da live,
//primeiramente gostaria de agradecer a compreensão e o carinho demonstrado na live de segunda, e o empenho de vocês para desenvolver esse projeto
//segundamente fiz esse repositório para vocês, para poder explicar melhor possíveis dúvidas que tenham ficado,
//terceiramente esqueci deixar o contatinho, https://www.linkedin.com/in/pedro-sato/
//fiquem a vontade para me adicionar, sempre estou respondendo dúvidas dos alunos, mesmo que não relacionadas aos projetos
//da Gama, então se tiver dúvidas e eu souber responde-las estarei lá é só chamar!
//de resto é isso fiquem com o repositório feito com carinho para vocês <3

// - Pedro Hiro Sato

const API_URL = "https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72";
//guardamos a url dentro de uma constante

let currentPage = 1;
//criamos uma váriavel global de estado para armazenar a página atual que deverá ser renderizada
//pelo navegador

const ITEMS_PER_PAGE = 8;
//criamos uma constante para organizar em um único lugar quantas propriedades devem ser renderizadas
//por página

const filterPlaces = (input, places) => {
    //os dois parâmetros esperados são:
    //input => o input completo html selecionado através do método: document.querySelector(#ID_DO_INPUT)
    //places => um array com todos os lugares, no nosso caso nossa resposta da API

    //essa função transforma os valores do nome do lugar e do input de filtragem para caixa baixa,
    //e através do método de strings "includes" verifica se a string inicial possui a substring passada pelo método
    //Ex: "mansão maravilhosa nas ilhas maldivas".includes("ilha") retornará true
    //portanto utilizamos o método "filter" no array dos valores vindos da API para filtrar apenas aqueles valores que contém
    //a substring passada no input
    //ps: a função de arrays "filter" gerará um novo array apenas com os valores que retornarem true na função passada como parâmetro
    //Ex: [1,2,3,4,5,6,6,7,8,9,10].filter((number)=> number > 6) retornará [7,8,9,10]

    //mais sobre filter e includes:
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
    return places.filter(place => place.name.toLowerCase().includes(input.value.toLowerCase()))
}
//função de filtragem dos lugares pelo nome

const paginateData = (data) => {
    //chegamos ao nosso famigerado reduce que nos causou tantas dúvidas 😬
    //bom o reduce é um método de arrays, ou seja ele pode ser utilizado para tratar dados em arrays (dãã)

    //como ele faz isso é que complica a história:
    //ele recebe 2 parâmetros normalmente, que são: função que será executada em todos os elementos do array,
    //e o valor inicial de total.
    //essa função que é recebida como parâmetro também recebe 2 parâmetros normalmente, que são: total que é o acumulador
    //que será modificado de forma iterativa, ou seja, ele será modificado a cada iteração (ciclo) do reduce
    //o outro parâmetro é o current que é o valor do elemento que está sendo iterado no momento (do mesmo jeito que forEach, map, etc)
    //o total, é o acumulador ou seja é aquele lugar que você vai ter todos os valores alterados como você quiser
    //Ex:
    //[1,2,3,4,5,6].reduce((total,current)=> console.log(current)) ele vai imprimir no console na primeira iteração o número 1,
    //na segunda o 2 e assim por diante até que por final ele imprima o 6
    //agora usando isso junto:
    //[1,2,3,4,5,6].reduce((total,current)=>{
    //  total.unshift(current)
    //  return total
    //},[])
    //o retorno dessa função será [6,5,4,3,2,1]
    //IMPORTANTE: reparem que o valor inicial de total foi declarado como um array vazio, para que possamos utilizar o método unshift (método nativo do Javascript para arrays)
    //IMPORTANTE2: reparem que o valor de total foi retornado para que seja possível utilizar o valor atualizado de total a cada iteração.
    //mais sobre reduce:
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/array/reduce
    return data.reduce((total, current, index) => {
        const belongArrayIndex = Math.ceil((index + 1) / ITEMS_PER_PAGE) - 1
        //essa é uma lógica para descobrir a qual página o item iterado pertence
        //Ex:
        //temos o item de índice 7 do array ele será o oitavo elemento daquele array, 
        // index + 1 => 7+1 => 8 =======> 8/ITEMS_PER_PAGE => 8/8 => 1 ==============> 1 - 1 = 0
        // ou seja ele pertence a página cujo indice é 0 que no nosso caso é a página 1
        // ps: o Math.ceil é uma função que arredonda um número para o maior número inteiro, para evitar que o resultado
        // da divisão menos 1 retorne um número negativo que obviamente não seria encontrado nos indices do array :)

        total[belongArrayIndex] ? total[belongArrayIndex].push(current) : total.push([current])
        //o ternaaaaaaaaaario nosso medalha de prata em dúvidas, bom ele é bem simples e funciona quase como um if/else
        //colocamos alguma condição ex: 1===2, 5!==0, true && false
        //no caso eu fiz uma condição passando um valor de um indice do nosso array,
        //o javascript por padrão entende quase qualquer valor se for utilizado como condição e tenta verificar truthy/falsy
        //ou seja alguns valores retornam true e outros false

        //Ex: 0 retorna false
        // 1 retorna true
        // "" retorna false
        // "false" retorna true
        // const valor retorna false
        // const valor = "isso é um valor" retorna true
        // mais sobre truthy/falsy e ternário:
        // https://developer.mozilla.org/en-US/docs/Glossary/Truthy
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator

        //bom voltando ao ternário, depois da condição adicionamos o operador "?" que é o nosso operador ternário
        //o código que vem após o ternário é o código que será executado caso a condição seja verdadeira,
        //após isso adicionamos ":" e depois dos ":" adicionamos o código que será executado caso a condição seja falsa 

        //no nosso caso: caso total[belongArrayIndex] exista ele executa total[belongArrayIndex].push(current) pois o array
        //que é a página já existe, caso contrário ele cria esse array (por isso os colchetes), e da um push no array total,
        //criando assim a página (espero que tenha ficada claro :))


        return total;
    }, [])
    //ao final disso teremos um array de arrays nesse formato: [[1,2,3],[4,5,6],[7,8]] isso para 8 objetos e 3 items por página
}
//função de páginação dos lugares

const fetchAPI = async (url) => {
    let response = await fetch(url)
    const textResponse = await response.text()
    return JSON.parse(textResponse)
}
//função para transformar os dados vindos da API em objeto JS para podermos utilizar

const changePage = (pageToBeRendered) => {
    currentPage = pageToBeRendered
    renderPage()
}
//método de mudar de página

const renderPaginationMenu = (paginatedData) => {

    const paginationContainer = document.querySelector('.pagination')
    //colocamos nossa div container dos cards em uma variável

    while (paginationContainer.firstChild) {
        paginationContainer.removeChild(paginationContainer.firstChild)
    }
    //esvaziamos essa div a cada render para que não seja rendedrizado o menu com os dados da página antiga do usuário

    const previousPage = document.createElement('span')
    previousPage.className = 'page-changer'
    previousPage.innerHTML = '<'
    previousPage.addEventListener('click', () => currentPage <= 1 ? () => { } : changePage(currentPage - 1))
    paginationContainer.appendChild(previousPage)
    //geramos um botão que ao ser clicado atualiza chama o método de mudar de página passando a página anterior se a página
    //atual não for 1

    paginatedData.forEach((_, index) => {
        //para cada array (página) dentro do nosso array total criaremos um botão numerado para ir para aquela página
        const pageButton = document.createElement('span')
        pageButton.innerHTML = index + 1 //index + 1 porque os indices começam em 0 e queremos mostrar a primeira página como 1

        pageButton.addEventListener('click', () => changePage(index + 1))

        if (currentPage === index + 1) {
            pageButton.className = 'active'
        }

        paginationContainer.appendChild(pageButton)
    })

    const nextPage = document.createElement('span')
    nextPage.className = 'page-changer'
    nextPage.innerHTML = '>'
    nextPage.addEventListener('click', () => currentPage >= paginatedData.length ? () => { } : changePage(currentPage + 1))

    paginationContainer.appendChild(nextPage)

    //por fim, método de avançãr a página que funciona igual o de voltar a página só que ao contrário :)
}

const renderPage = async () => {
    const apiData = await fetchAPI(API_URL)

    const searchInput = document.querySelector('#filter')
    let filteredApiData = filterPlaces(searchInput, apiData)

    const searchButton = document.querySelector('#search-button')
    searchButton.addEventListener('click', () => {
        filteredApiData = filterPlaces(searchInput, apiData)
        renderPage()
    })

    //aqui chamamos nossos métodos anteriormente criados e adicionamos um listener para a ação de click no botão de filtro
    //que filtrará nossos dados 


    const paginatedData = paginateData(ITEMS_PER_PAGE, filteredApiData)


    renderPaginationMenu(paginatedData);

    cardContainer = document.querySelector(".card-container");

    while (cardContainer.firstChild) {
        cardContainer.removeChild(cardContainer.firstChild)
    }

    //esvaziamos nosso container de cards para que não sejam renderizados os cards da página antiga do usuário

    paginatedData[currentPage - 1].forEach(property => {
        //para cada item naquela página iteramos por ele criando os cards

        const { name, photo, price, property_type } = property;
        //desestruturação dos dados para utilizarmos

        cardInfo = document.createElement("div");
        cardInfo.className = "card-info"

        card = document.createElement("div");
        card.className = "card"

        cardImg = document.createElement("img");
        cardImg.className = "card-img"
        cardImg.src = photo;

        propertyType = document.createElement("div");
        propertyType.className = "property-type";
        propertyType.innerHTML = property_type
        propertyPrice = document.createElement("div");
        propertyPrice.className = "property-price";
        propertyPrice.innerHTML = "R$ " + price.toFixed(2) + '/noite'
        propertyName = document.createElement("div");
        propertyName.className = "property-name";
        propertyName.innerHTML = name;

        cardContainer.appendChild(card)
        card.appendChild(cardImg)
        card.appendChild(cardInfo)
        cardInfo.appendChild(propertyName)
        cardInfo.appendChild(propertyType)
        cardInfo.appendChild(propertyPrice)

        //aqui inserimos cada filho no seu respectivo pai
    })


}



function initMap() {
    const locations = [
        ['Avenida Paulista', -23.563311, -46.654275, 5],
        ['Gama Academy', -23.567427, -46.684607, 4],
        ['Marco Zero', -23.550460, -46.633934, 3],
        ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
        ['Maroubra Beach', -33.950198, 151.259302, 1]
    ];

    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: new google.maps.LatLng(-23.550460, -46.633934),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    const infowindow = new google.maps.InfoWindow();

    let marker, i;

    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map
        });

        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }
}
//função gerada pelo google, a alteração que eu fiz foi: criar locations para serem renderizadas no mapa e ao invés de renderizar
//apenas um marcador, iteramos por esse array e renderizamos um marcador para cada localidade

renderPage()
//e esse é o nosso método que faz todo o resto mostrado ai em cima :)
//espero que tenham gostado, e entendido, qualquer dúvida só me procurar :)
//obrigado!!
