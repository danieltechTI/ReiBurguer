// DADOS DE PRODUTOS
const PRODUTOS = [
    { id: 1, nome: 'Hambúrguer Clássico', categoria: 'hamburgueres', preco: 18.90, descricao: 'Pão, carne, alface, tomate, queijo', emoji: '🍔' },
    { id: 2, nome: 'Hambúrguer Bacon Premium', categoria: 'hamburgueres', preco: 22.90, descricao: 'Com bacon crocante e cheddar', emoji: '🍔' },
    { id: 3, nome: 'Hambúrguer Frango', categoria: 'hamburgueres', preco: 19.90, descricao: 'Frango grelhado suculento', emoji: '🍗' },
    { id: 4, nome: 'Hambúrguer Vegetariano', categoria: 'hamburgueres', preco: 17.90, descricao: 'Proteína vegetal com rúcula', emoji: '🥬' },
    { id: 5, nome: 'Coca-Cola 2L', categoria: 'bebidas', preco: 8.90, descricao: 'Refrigerante gelado', emoji: '🥤' },
    { id: 6, nome: 'Guaraná 2L', categoria: 'bebidas', preco: 7.90, descricao: 'Guaraná natural', emoji: '🥤' },
    { id: 7, nome: 'Milk Shake', categoria: 'bebidas', preco: 12.90, descricao: 'Milk Shake de chocolate ou morango', emoji: '🥛' },
    { id: 8, nome: 'Batata Frita Grande', categoria: 'acompanhamentos', preco: 9.90, descricao: 'Batata crocante e quentinha', emoji: '🍟' },
    { id: 9, nome: 'Anéis de Cebola', categoria: 'acompanhamentos', preco: 8.90, descricao: 'Anéis dourados e crocantes', emoji: '🧅' },
    { id: 10, nome: 'Sorvete de Chocolate', categoria: 'sobremesas', preco: 6.90, descricao: 'Sorvete cremoso', emoji: '🍨' },
    { id: 11, nome: 'Sundae com Cobertura', categoria: 'sobremesas', preco: 10.90, descricao: 'Sorvete com calda e granulado', emoji: '🍨' },
];

// CARRINHO (localStorage)
class Carrinho {
    constructor() {
        this.itens = JSON.parse(localStorage.getItem('carrinho')) || [];
    }

    adicionar(produto) {
        const item = this.itens.find(i => i.id === produto.id);
        if (item) {
            item.quantidade++;
        } else {
            this.itens.push({ ...produto, quantidade: 1 });
        }
        this.salvar();
    }

    remover(id) {
        this.itens = this.itens.filter(i => i.id !== id);
        this.salvar();
    }

    atualizar(id, quantidade) {
        const item = this.itens.find(i => i.id === id);
        if (item) {
            item.quantidade = Math.max(1, quantidade);
        }
        this.salvar();
    }

    limpar() {
        this.itens = [];
        this.salvar();
    }

    getTotal() {
        return this.itens.reduce((total, item) => total + (item.preco * item.quantidade), 0);
    }

    salvar() {
        localStorage.setItem('carrinho', JSON.stringify(this.itens));
        atualizarCarrinho();
    }
}

// AUTENTICAÇÃO (localStorage)
class Auth {
    constructor() {
        this.usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        this.usuarioAtual = JSON.parse(localStorage.getItem('usuarioAtual')) || null;
    }

    registrar(email, senha) {
        if (this.usuarios.find(u => u.email === email)) {
            alert('Email já cadastrado!');
            return false;
        }
        this.usuarios.push({ id: Date.now(), email, senha: btoa(senha) });
        localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
        alert('Registrado com sucesso!');
        return true;
    }

    login(email, senha) {
        const usuario = this.usuarios.find(u => u.email === email && u.senha === btoa(senha));
        if (usuario) {
            this.usuarioAtual = usuario;
            localStorage.setItem('usuarioAtual', JSON.stringify(usuario));
            return true;
        }
        alert('Email ou senha incorretos!');
        return false;
    }

    logout() {
        this.usuarioAtual = null;
        localStorage.removeItem('usuarioAtual');
        location.reload();
    }

    estaAutenticado() {
        return this.usuarioAtual !== null;
    }
}

// INSTÂNCIAS GLOBAIS
const carrinho = new Carrinho();
const auth = new Auth();

// FUNÇÕES DO CARRINHO
function abrirCarrinho() {
    document.getElementById('cartModal').classList.add('active');
    renderizarCarrinho();
}

function fecharCarrinho() {
    document.getElementById('cartModal').classList.remove('active');
}

function renderizarCarrinho() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    if (carrinho.itens.length === 0) {
        cartItems.innerHTML = '<p>Seu carrinho está vazio</p>';
        return;
    }

    cartItems.innerHTML = carrinho.itens.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.emoji} ${item.nome}</div>
                <div class="cart-item-price">R$ ${(item.preco * item.quantidade).toFixed(2)}</div>
            </div>
            <div class="cart-item-controls">
                <button onclick="carrinho.atualizar(${item.id}, ${item.quantidade - 1})">-</button>
                <span>${item.quantidade}</span>
                <button onclick="carrinho.atualizar(${item.id}, ${item.quantidade + 1})">+</button>
                <button onclick="carrinho.remover(${item.id})" style="background-color: #ff6b6b;">X</button>
            </div>
        </div>
    `).join('');

    cartTotal.textContent = carrinho.getTotal().toFixed(2);
}

function atualizarCarrinho() {
    document.getElementById('cart-count').textContent = carrinho.itens.length;
    atualizarMenuUsuario();
}

function atualizarMenuUsuario() {
    const userMenu = document.getElementById('user-menu');
    if (auth.estaAutenticado()) {
        userMenu.innerHTML = `
            <span>Olá, ${auth.usuarioAtual.email}</span>
            <button class="btn-auth" onclick="auth.logout()">Sair</button>
        `;
    } else {
        userMenu.innerHTML = `
            <button class="btn-auth" onclick="abrirLoginModal()">Entrar</button>
        `;
    }
}

function irParaCheckout() {
    if (carrinho.itens.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    window.location.href = 'checkout.html';
}

// FUNÇÕES DE AUTENTICAÇÃO
function abrirLoginModal() {
    document.getElementById('loginModal').classList.add('active');
}

function fecharLoginModal() {
    document.getElementById('loginModal').classList.remove('active');
}

function abrirRegistroModal() {
    document.getElementById('loginModal').classList.remove('active');
    document.getElementById('registroModal').classList.add('active');
}

function fecharRegistroModal() {
    document.getElementById('registroModal').classList.remove('active');
}

// FORM LISTENERS
document.addEventListener('DOMContentLoaded', () => {
    atualizarCarrinho();
    atualizarMenuUsuario();

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = loginForm.querySelector('input[type="email"]').value;
            const senha = loginForm.querySelector('input[type="password"]').value;
            if (auth.login(email, senha)) {
                fecharLoginModal();
                atualizarMenuUsuario();
            }
        });
    }

    const registroForm = document.getElementById('registroForm');
    if (registroForm) {
        registroForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = registroForm.querySelector('input[type="email"]').value;
            const senha = registroForm.querySelector('input[type="password"]').value;
            if (auth.registrar(email, senha)) {
                fecharRegistroModal();
                abrirLoginModal();
            }
        });
    }

    // Carregar destaques na homepage
    const destaqueGrid = document.getElementById('destaques-grid');
    if (destaqueGrid) {
        renderizarDestaques();
    }
});

function renderizarDestaques() {
    const destaqueGrid = document.getElementById('destaques-grid');
    destaqueGrid.innerHTML = PRODUTOS.slice(0, 4).map(produto => `
        <div class="product-card">
            <div class="product-image">${produto.emoji}</div>
            <div class="product-info">
                <div class="product-name">${produto.nome}</div>
                <div class="product-desc">${produto.descricao}</div>
                <div class="product-price">R$ ${produto.preco.toFixed(2)}</div>
                <button class="btn-add-cart" onclick="carrinho.adicionar({id: ${produto.id}, nome: '${produto.nome}', preco: ${produto.preco}, emoji: '${produto.emoji}'})">
                    Adicionar ao Carrinho
                </button>
            </div>
        </div>
    `).join('');
}

// FECHAR MODAL AO CLICAR FORA
window.onclick = function(event) {
    const cartModal = document.getElementById('cartModal');
    const loginModal = document.getElementById('loginModal');
    const registroModal = document.getElementById('registroModal');
    
    if (event.target === cartModal) {
        cartModal.classList.remove('active');
    }
    if (event.target === loginModal) {
        loginModal.classList.remove('active');
    }
    if (event.target === registroModal) {
        registroModal.classList.remove('active');
    }
}
