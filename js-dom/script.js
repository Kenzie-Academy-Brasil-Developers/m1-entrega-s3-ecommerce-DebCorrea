const containerMainContent = document.getElementById('containerMainContent');

const btnsNav = document.getElementById('containerFilters')

const searchInput = document.querySelector('input');

const btnSearch = document.getElementById('search');

const cartBody = document.getElementById('emptyCart');

const productsInCart = document.getElementsByClassName('productInCart');



const productsDataBase = [
    {
        img: 'img/lightJacket.png',
        imgDescription: 'Black light jacket',
        filter: 'Camisetas',
        productName: 'Lightweight Jacket',
        description: 'Adicione um pouco de energia ao seu guarda-roupa de inverno com esta jaqueta vibrante...',
        price: 100.00,
        button: 'Adicionar ao carrinho',
        btnId: 0,
    },

    {
        img: 'img/hat.png',
        imgDescription: 'Black hat',
        filter: 'Acessórios',
        productName: 'Black Hat',
        description: 'O gorro Next.js chegou! Esta beldade bordada tem um ajuste confortável que garante que...',
        price: 100.00,
        button: 'Adicionar ao carrinho',
        btnId: 1,
    },

    {
        img: 'img/mask.png',
        imgDescription: 'Black surgical mask',
        filter: 'Acessórios',
        productName: 'Mask',
        description: 'Esta máscara facial durável é feita de duas camadas de tecido tratado e possui presilhas...',
        price: 40.00,
        button: 'Adicionar ao carrinho',
        btnId: 2,
    },

    {
        img: 'img/t-shirt.png',
        imgDescription: 'Black t-shirt',
        filter: 'Camisetas',
        productName: 'T-Shirt',
        description: 'Esta t-shirt é imprescindível no seu guarda-roupa, combinando o caimento intemporal de...',
        price: 100.00,
        button: 'Adicionar ao carrinho',
        btnId: 3,
    },

    {
        img: 'img/whiteT-shirt.png',
        imgDescription: 'White t-shirt',
        filter: 'Camisetas',
        productName: 'Short-Sleeve T-Shirt',
        description: 'Agora você encontrou a camiseta básica do seu guarda-roupa. É feito de um mais grosso...',
        price: 100.00,
        button: 'Adicionar ao carrinho',
        btnId: 4,
    },

    {
        img: 'img/jacket.png',
        imgDescription: 'Black jacket',
        filter: 'Camisetas',
        productName: 'Champion Packabale Jacket',
        description: 'Proteja-se dos elementos com esta jaqueta embalável Champion. Esta jaqueta de poliést...',
        price: 100.00,
        button: 'Adicionar ao carrinho',
        btnId: 5,
    },
]



function listProducts(srcImage, imgAlt, filterProduct, nameProduct, productDescription, productPrice, idBtn) {

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

        <button class="addToCart" id="${idBtn}">Adicionar ao carrinho</button>

    </div>`

    containerMainContent.appendChild(productCard);

}


function displayProducts(from = productsDataBase) {

    from.forEach((item) => listProducts(item.img, item.imgDescription, item.filter, item.productName, item.description, item.price, item.btnId));

}

displayProducts();



function searchProducts(e) {

    e.preventDefault();

    const searchInputText = searchInput.value.toLowerCase();

    const resultSearchByName = productsDataBase.filter((item) => {

        return item.productName.toLowerCase().includes(searchInputText)

    });

    const resultSearchByTag = productsDataBase.filter((item) => {

        return item.filter.toLowerCase().includes(searchInputText)

    });

    containerMainContent.innerHTML = '';

    searchInput.value = '';

    if (resultSearchByName.length > 0) {

        displayProducts(resultSearchByName);

        const arrResultSearchByName = [];

        for (let i = 0; i < resultSearchByName.length; i++) {

            arrResultSearchByName.push(resultSearchByName[i].btnId);

        }

        for (let i = 0; i < arrResultSearchByName; i++) {

            const btnAdd = document.getElementById(arrResultSearchByName[i]);

            btnAdd.addEventListener('click', addToCart);

        }

    } else if (resultSearchByTag.length > 0) {

        displayProducts(resultSearchByTag);

        const arrResultSearchByTag = [];

        for (let i = 0; i < resultSearchByTag.length; i++) {

            arrResultSearchByTag.push(resultSearchByTag[i].btnId);

        }

        for (let i = 0; i < arrResultSearchByTag.length; i++) {

            const btnAdd = document.getElementById(arrResultSearchByTag[i]);

            btnAdd.addEventListener('click', addToCart);

        }

    } else {

        const emptyMsg = document.createElement('p');

        emptyMsg.innerText = 'Nenhum produto foi encontrado. Tente outra palavra-chave!';

        containerMainContent.appendChild(emptyMsg);

    }

}


btnSearch.addEventListener('click', searchProducts);



function searchThroughFilter(event) {

    const btnFilters = document.getElementsByClassName('filters');

    const btnClicked = event.target;

    const selectedFilter = btnClicked.innerText;

    const selectedProducts = productsDataBase.filter((item) => {

        return item.filter.includes(selectedFilter);

    });

    if (btnClicked.id !== 'containerFilters') {

        for (let i = 0; i < btnFilters.length; i++) {

            btnFilters.item(i).classList.remove('selected');

        }

        btnClicked.classList.add('selected');

        containerMainContent.innerHTML = '';

        if (selectedFilter === 'Todos') {

            displayProducts();

            for (let i = 0; i < productsDataBase.length; i++) {

                const btnAdd = document.getElementById(i);

                btnAdd.addEventListener('click', addToCart);

            }

        } else {

            if (selectedProducts.length < 1) {

                const emptyMsg = document.createElement('p');

                emptyMsg.innerText = 'Nenhum produto foi encontrado. Tente outra categoria!';

                containerMainContent.appendChild(emptyMsg);

            } else {

                displayProducts(selectedProducts);

                const arrSelectedProducts = [];

                for (let i = 0; i < selectedProducts.length; i++) {

                    arrSelectedProducts.push(selectedProducts[i].btnId);

                }

                for (let i = 0; i < arrSelectedProducts.length; i++) {

                    const btnAdd = document.getElementById(arrSelectedProducts[i]);

                    btnAdd.addEventListener('click', addToCart);

                }

            }

        }

    }

}


btnsNav.addEventListener('click', searchThroughFilter);



let productQnt = 0;

let totalValue = 0;

function addToCart(e) {

    const item = e.target.id;

    productQnt += 1;

    totalValue += productsDataBase[item].price;

    if (cartBody.id === 'emptyCart') {

        cartBody.removeAttribute('id');

        cartBody.id = 'filledCart';

        cartBody.innerHTML = '';

        cartBody.innerHTML = `<section class="productInCart">

            <div class="productImgInCart">

                <img src=${productsDataBase[item].img} alt=${productsDataBase[item].imgDescription}>

            </div>

            <div class="detailsProductCart">

                <h3 class="productNameInCart">${productsDataBase[item].productName}</h3>

                <h4>R$ ${productsDataBase[item].price}</h4>

                <button class="rmvProduct">Remover produto</button>

            </div>

        </section>

        <div class="totalProductsCart">

            <div id="qntTotal">

                <h4 class="whiteLettersCart">Quantidade:</h4>

                <h4 class="grayLettersCart">${productQnt}</h4>

            </div>

            <div id="totalValue">

                <h4 class="whiteLettersCart">Total:</h4>

                <h4 class="grayLettersCart">R$ ${totalValue}</h4>

            </div>

        </div>`

    } else {

        cartBody.innerHTML += `<section class="productInCart">

            <div class="productImgInCart">

                <img src=${productsDataBase[item].img} alt=${productsDataBase[item].imgDescription}>

            </div>

            <div class="detailsProductCart">

                <h3 class="productNameInCart">${productsDataBase[item].productName}</h3>

                <h4>R$ ${productsDataBase[item].price}</h4>

                <button class="rmvProduct">Remover produto</button>

            </div>

        </section>`

        const divTotalQnt = document.getElementById('qntTotal');

        const divTotalValue = document.getElementById('totalValue');

        divTotalQnt.innerHTML = `<h4 class="whiteLettersCart">Quantidade:</h4>

        <h4 class="grayLettersCart">${productQnt}</h4>`;

        divTotalValue.innerHTML = `<h4 class="whiteLettersCart">Total:</h4>

        <h4 class="grayLettersCart">R$ ${totalValue}</h4>`;

    }

    const btnsRemove = document.getElementsByClassName('rmvProduct');

    for (let i = 0; i < productsInCart.length; i++) {

        btnsRemove[i].addEventListener('click', function removeFromCart() {

            productsInCart[i].remove();

            if (productsInCart.length < 1) {

                cartBody.removeAttribute('id');

                cartBody.id = 'emptyCart';

                cartBody.innerHTML = `<h3>Carrinho vazio</h3>

                <span>Adicione itens</span>`;

                productQnt = 0;

                totalValue = 0;

            } else {

                const divTotalQnt = document.getElementById('qntTotal');
    
                const divTotalValue = document.getElementById('totalValue');

                divTotalQnt.innerHTML = `<h4 class="whiteLettersCart">Quantidade:</h4>

                <h4 class="grayLettersCart">${productQnt -= 1}</h4>`;

                divTotalValue.innerHTML = `<h4 class="whiteLettersCart">Total:</h4>

                <h4 class="grayLettersCart">R$ ${totalValue}</h4>`;

            }

        });

    }

}


for (let i = 0; i < productsDataBase.length; i++) {

    const btnAdd = document.getElementById(i);

    btnAdd.addEventListener('click', addToCart);

}