const containerMainContent = document.getElementById('containerMainContent');

const btnsNav = document.getElementById('containerFilters')

const btnSearch = document.getElementById('search');

const searchInput = document.querySelector('input');



const productsDataBase = [
    {
        img: 'img/lightJacket.png',
        imgDescription: 'Black light jacket',
        filter: 'Camisetas',
        productName: 'Lightweight Jacket',
        description: 'Adicione um pouco de energia ao seu guarda-roupa de inverno com esta jaqueta vibrante...',
        price: '100.00',
        button: 'Adicionar ao carrinho',
    },

    {
        img: 'img/hat.png',
        imgDescription: 'Black hat',
        filter: 'Acessórios',
        productName: 'Black Hat',
        description: 'O gorro Next.js chegou! Esta beldade bordada tem um ajuste confortável que garante que...',
        price: '100.00',
        button: 'Adicionar ao carrinho',
    },

    {
        img: 'img/mask.png',
        imgDescription: 'Black surgical mask',
        filter: 'Acessórios',
        productName: 'Mask',
        description: 'Esta máscara facial durável é feita de duas camadas de tecido tratado e possui presilhas...',
        price: '40.00',
        button: 'Adicionar ao carrinho',
    },

    {
        img: 'img/t-shirt.png',
        imgDescription: 'Black t-shirt',
        filter: 'Camisetas',
        productName: 'T-Shirt',
        description: 'Esta t-shirt é imprescindível no seu guarda-roupa, combinando o caimento intemporal de...',
        price: '100.00',
        button: 'Adicionar ao carrinho',
    },

    {
        img: 'img/whiteT-shirt.png',
        imgDescription: 'White t-shirt',
        filter: 'Camisetas',
        productName: 'Short-Sleeve T-Shirt',
        description: 'Agora você encontrou a camiseta básica do seu guarda-roupa. É feito de um mais grosso...',
        price: '100.00',
        button: 'Adicionar ao carrinho',
    },

    {
        img: 'img/jacket.png',
        imgDescription: 'Black jacket',
        filter: 'Camisetas',
        productName: 'Champion Packabale Jacket',
        description: 'Proteja-se dos elementos com esta jaqueta embalável Champion. Esta jaqueta de poliést...',
        price: '100.00',
        button: 'Adicionar ao carrinho',
    },
]



function listProducts(srcImage, imgAlt, filterProduct, nameProduct, productDescription, productPrice) {

    const productCard = document.createElement('article');

    productCard.classList.add('productCard');

    productCard.innerHTML = `<div class="productImg">

    <img src=${srcImage} alt=${imgAlt}>

    </div>

    <div class="productDetails">

        <div class="productFilter">

            <span class="productTag">${filterProduct}</span>

        </div>

        <h2 class="productTitle">${nameProduct}</h2>

        <small>${productDescription}</small>

        <h3>R$ ${productPrice}</h3>

        <button class="addToCart">Adicionar ao carrinho</button>

    </div>`

    containerMainContent.appendChild(productCard);

}


function displayProducts(from = productsDataBase) {

    from.forEach((item) => listProducts(item.img, item.imgDescription, item.filter, item.productName, item.description, item.price));

}

displayProducts();



// function searchProducts(event) {

//     event.preventDefault();

//     const searchInputText = searchInput.value;

//     const pName = document.getElementsByClassName('productTitle');

//     const pTag = document.getElementsByClassName('productTag');

// }


// btnSearch.addEventListener('click', searchProduct);


function searchThroughFilter(event) {

    event.preventDefault();

    const btnFilters = document.getElementsByClassName('filters');

    const btnClicked = event.target;

    if (btnClicked.id !== 'containerFilters') {

        for (let i = 0; i < btnFilters.length; i++) {

            btnFilters.item(i).classList.remove('selected');

        }

        btnClicked.classList.add('selected');

        const selectedFilter = btnClicked.innerText;

        const selectedProducts = productsDataBase.filter( (item) => {

            return item.filter.includes(selectedFilter);

        });

        containerMainContent.innerHTML = '';

        if (selectedFilter === 'Todos') {

            displayProducts();

        } else {

            displayProducts(selectedProducts);

        }

    }

}

btnsNav.addEventListener('click', searchThroughFilter);