// ==========================================
// VEZLO MART - SECURE FRONTEND APPLICATION
// ==========================================

const API_BASE = 'http://localhost:8000/api'; // Change this to your PHP/Python hosted API URL

const State = {
    user: null,
    cart: [],
    products: [],
    currentPage: 'home'
};

// --- ROUTER ---
const Router = {
    navigate(page) {
        State.currentPage = page;
        PageRenderer.render();
        window.scrollTo(0, 0);
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active', 'text-white'));
    }
};

// --- API CALLS (No Supabase keys here! Pure secure API links) ---
const Api = {
    async get(endpoint) {
        try {
            const res = await fetch(`${API_BASE}/${endpoint}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('vezlo_token') || ''}` }
            });
            return await res.json();
        } catch (err) { console.error('API Error:', err); return []; }
    },
    async post(endpoint, data) {
        try {
            const res = await fetch(`${API_BASE}/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('vezlo_token') || ''}` },
                body: JSON.stringify(data)
            });
            return await res.json();
        } catch (err) { console.error('API Error:', err); return { error: true }; }
    }
};

// --- PAGE RENDERER ---
const PageRenderer = {
    render() {
        const app = document.getElementById('app');
        switch(State.currentPage) {
            case 'home': app.innerHTML = Pages.home(); break;
            case 'about': app.innerHTML = Pages.about(); break;
            case 'category': app.innerHTML = Pages.category(); break;
            case 'offers': app.innerHTML = Pages.offers(); break;
            case 'products': app.innerHTML = Pages.products(); break;
            case 'contact': app.innerHTML = Pages.contact(); break;
            case 'login': app.innerHTML = Pages.login(); break;
            case 'cart': app.innerHTML = Pages.cart(); break;
            default: app.innerHTML = Pages.home();
        }
    }
};

// --- PAGES HTML TEMPLATES ---
const Pages = {
    home() {
        return `
        <div class="fade-in">
            <!-- Hero Section -->
            <section class="relative overflow-hidden bg-gradient-to-br from-vezlo-dark via-blue-900/20 to-vezlo-dark py-24 md:py-36 px-4 text-center">
                <div class="max-w-4xl mx-auto relative z-10">
                    <span class="badge-blue mb-4 inline-block">SRI LANKA'S SMARTEST MARKETPLACE</span>
                    <h1 class="text-4xl md:text-6xl font-black mb-6 leading-tight">Shop Smart. <br>Earn <span class="text-vezlo-blue">More.</span></h1>
                    <p class="text-gray-400 max-w-xl mx-auto mb-8 text-lg">Get the best retail deals with Cash on Delivery, or join our exclusive Reseller Network to start your own business and earn from home.</p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <button onclick="Router.navigate('products')" class="btn-primary text-base px-8 py-3 flex items-center justify-center gap-2">
                            <i class="fas fa-shopping-bag"></i> Shop Now
                        </button>
                        <button onclick="Router.navigate('login')" class="btn-outline text-base px-8 py-3 flex items-center justify-center gap-2">
                            <i class="fas fa-hand-holding-usd"></i> Become a Reseller
                        </button>
                    </div>
                </div>
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-vezlo-blue/10 rounded-full blur-3xl"></div>
            </section>

            <!-- Features -->
            <section class="max-w-7xl mx-auto px-4 py-16 grid grid-2 md:grid-4 gap-6">
                <div class="vezlo-card p-6 text-center hover:border-vezlo-blue/30">
                    <i class="fas fa-truck text-3xl text-vezlo-blue mb-3"></i>
                    <h3 class="font-bold mb-1">Islandwide Delivery</h3>
                    <p class="text-sm text-gray-400">Fast & secure delivery</p>
                </div>
                <div class="vezlo-card p-6 text-center hover:border-green-500/30">
                    <i class="fas fa-money-bill-wave text-3xl text-green-500 mb-3"></i>
                    <h3 class="font-bold mb-1">Cash on Delivery</h3>
                    <p class="text-sm text-gray-400">Pay when you receive</p>
                </div>
                <div class="vezlo-card p-6 text-center hover:border-yellow-500/30">
                    <i class="fas fa-shield-alt text-3xl text-yellow-500 mb-3"></i>
                    <h3 class="font-bold mb-1">Trusted Quality</h3>
                    <p class="text-sm text-gray-400">Verified products</p>
                </div>
                <div class="vezlo-card p-6 text-center hover:border-vezlo-red/30">
                    <i class="fas fa-headset text-3xl text-vezlo-red mb-3"></i>
                    <h3 class="font-bold mb-1">24/7 Support</h3>
                    <p class="text-sm text-gray-400">WhatsApp support</p>
                </div>
            </section>

            <!-- Categories Preview -->
            <section class="max-w-7xl mx-auto px-4 py-8">
                <div class="flex justify-between items-center mb-8">
                    <h2 class="text-2xl font-bold">Shop by Category</h2>
                    <button onclick="Router.navigate('category')" class="text-vezlo-blue text-sm font-semibold hover:underline">View All <i class="fas fa-arrow-right ml-1"></i></button>
                </div>
                <div class="grid grid-2 md:grid-4 gap-4">
                    <div onclick="Router.navigate('products')" class="vezlo-card p-6 text-center cursor-pointer group">
                        <i class="fas fa-microchip text-4xl text-vezlo-blue mb-3 group-hover:scale-110 transition-transform"></i>
                        <h3 class="font-bold">Tech Gadgets</h3>
                    </div>
                    <div onclick="Router.navigate('products')" class="vezlo-card p-6 text-center cursor-pointer group">
                        <i class="fas fa-t-shirt text-4xl text-vezlo-red mb-3 group-hover:scale-110 transition-transform"></i>
                        <h3 class="font-bold">Men's Clothing</h3>
                    </div>
                    <div onclick="Router.navigate('products')" class="vezlo-card p-6 text-center cursor-pointer group">
                        <i class="fas fa-gem text-4xl text-purple-500 mb-3 group-hover:scale-110 transition-transform"></i>
                        <h3 class="font-bold">Accessories</h3>
                    </div>
                    <div onclick="Router.navigate('products')" class="vezlo-card p-6 text-center cursor-pointer group">
                        <i class="fas fa-home text-4xl text-green-500 mb-3 group-hover:scale-110 transition-transform"></i>
                        <h3 class="font-bold">Home & Living</h3>
                    </div>
                </div>
            </section>
        </div>`;
    },

    about() {
        return `
        <div class="fade-in max-w-4xl mx-auto px-4 py-16">
            <h1 class="text-3xl font-bold mb-8 text-center">About <span class="text-vezlo-blue">Vezlo Mart</span></h1>
            <div class="vezlo-card p-8 space-y-6 text-gray-300 leading-relaxed">
                <p><strong class="text-white">Vezlo Mart</strong> is Sri Lanka's smartest marketplace, designed to empower both everyday shoppers and ambitious entrepreneurs. Whether you're looking for the best retail deals with Cash on Delivery, or you want to start your own business from home, we've got you covered.</p>
                <p>Our exclusive <strong class="text-vezlo-blue">Reseller Network</strong> allows you to earn from home by accessing wholesale prices, managing customers through a dedicated dashboard, and ordering seamlessly via our website or WhatsApp.</p>
                <div class="grid grid-2 gap-6 mt-8">
                    <div class="bg-gray-800/50 p-4 rounded-lg"><h3 class="font-bold text-white mb-2"><i class="fas fa-bullseye text-vezlo-red mr-2"></i>Our Mission</h3><p class="text-sm">To democratize e-commerce in Sri Lanka, making it accessible for anyone to start a business with zero investment.</p></div>
                    <div class="bg-gray-800/50 p-4 rounded-lg"><h3 class="font-bold text-white mb-2"><i class="fas fa-eye text-vezlo-blue mr-2"></i>Our Vision</h3><p class="text-sm">To become the most trusted and innovative platform connecting suppliers, resellers, and customers across the nation.</p></div>
                </div>
            </div>
        </div>`;
    },

    category() {
        return `
        <div class="fade-in max-w-7xl mx-auto px-4 py-16">
            <h1 class="text-3xl font-bold mb-8">All Categories</h1>
            <div class="grid grid-2 md:grid-3 gap-6">
                ${['Tech Gadgets', 'Men\'s Clothing', 'Women\'s Accessories', 'Footwear', 'Home & Living', 'Sports & Fitness'].map((cat, i) => `
                    <div onclick="Router.navigate('products')" class="vezlo-card p-8 text-center cursor-pointer group">
                        <i class="fas fa-${['microchip','t-shirt','gem','shoe-prints','home','dumbbell'][i]} text-5xl text-vezlo-blue mb-4 group-hover:scale-110 transition-transform"></i>
                        <h2 class="text-xl font-bold">${cat}</h2>
                        <p class="text-sm text-gray-400 mt-2">Browse ${cat.toLowerCase()}</p>
                    </div>
                `).join('')}
            </div>
        </div>`;
    },

    offers() {
        return `
        <div class="fade-in max-w-7xl mx-auto px-4 py-16">
            <div class="flex items-center gap-3 mb-8">
                <h1 class="text-3xl font-bold">Special Offers</h1>
                <span class="badge-red animate-pulse"><i class="fas fa-fire mr-1"></i> Hot Deals</span>
            </div>
            <div class="grid grid-2 md:grid-4 gap-6">
                ${Array(4).fill(0).map((_, i) => `
                    <div class="vezlo-card relative group">
                        <span class="absolute top-2 right-2 bg-vezlo-red text-white text-xs font-bold px-2 py-1 rounded z-10">25% OFF</span>
                        <div class="overflow-hidden"><img src="https://picsum.photos/seed/offer${i}/400/400" class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"></div>
                        <div class="p-4">
                            <h3 class="font-semibold">Special Offer Item ${i+1}</h3>
                            <div class="mt-2 flex items-baseline gap-2">
                                <span class="text-lg font-bold text-vezlo-red">Rs. ${(2990 + i*1000).toLocaleString()}</span>
                                <span class="text-xs text-gray-500 line-through">Rs. ${(3990 + i*1000).toLocaleString()}</span>
                            </div>
                            <button onclick="Utils.toast('Added to cart!')" class="w-full mt-3 btn-primary text-sm py-2">Add to Cart</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>`;
    },

    products() {
        return `
        <div class="fade-in max-w-7xl mx-auto px-4 py-16">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <h1 class="text-3xl font-bold">Our Products</h1>
                <div class="flex gap-2 flex-wrap">
                    <button class="btn-primary text-xs py-1 px-3">All</button>
                    <button class="btn-outline text-xs py-1 px-3">Tech</button>
                    <button class="btn-outline text-xs py-1 px-3">Clothing</button>
                    <button class="btn-outline text-xs py-1 px-3">Accessories</button>
                </div>
            </div>
            <div class="grid grid-2 md:grid-4 gap-6">
                ${Array(8).fill(0).map((_, i) => `
                    <div class="vezlo-card group">
                        <div class="overflow-hidden"><img src="https://picsum.photos/seed/prod${i}/400/400" class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"></div>
                        <div class="p-4">
                            <p class="text-[10px] text-vezlo-blue font-semibold uppercase">Category</p>
                            <h3 class="font-semibold mt-1">Product Item ${i+1}</h3>
                            <div class="mt-2 flex items-baseline gap-2">
                                <span class="text-lg font-bold text-vezlo-blue">Rs. ${(1990 + i*1500).toLocaleString()}</span>
                            </div>
                            <button onclick="Utils.toast('Added to cart!')" class="w-full mt-3 btn-outline text-sm py-2 hover:bg-vezlo-blue hover:text-white hover:border-vezlo-blue"><i class="fas fa-cart-plus mr-1"></i> Add to Cart</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>`;
    },

    contact() {
        return `
        <div class="fade-in max-w-4xl mx-auto px-4 py-16">
            <h1 class="text-3xl font-bold mb-8 text-center">Contact Us</h1>
            <div class="grid md:grid-cols-2 gap-8">
                <div class="vezlo-card p-6">
                    <h2 class="text-xl font-bold mb-6">Get in Touch</h2>
                    <div class="space-y-4">
                        <input type="text" placeholder="Your Name" class="vezlo-input">
                        <input type="email" placeholder="Your Email" class="vezlo-input">
                        <textarea placeholder="Your Message" rows="4" class="vezlo-input"></textarea>
                        <button class="btn-primary w-full" onclick="Utils.toast('Message sent successfully!', 'success')">Send Message</button>
                    </div>
                </div>
                <div class="space-y-6">
                    <div class="vezlo-card p-6 flex items-center gap-4">
                        <div class="w-12 h-12 rounded-full bg-vezlo-blue/20 flex items-center justify-center"><i class="fas fa-envelope text-vezlo-blue"></i></div>
                        <div><h3 class="font-semibold">Email</h3><p class="text-sm text-gray-400">chat.dmkaawya@gmail.com</p></div>
                    </div>
                    <div class="vezlo-card p-6 flex items-center gap-4">
                        <div class="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center"><i class="fab fa-whatsapp text-green-500"></i></div>
                        <div><h3 class="font-semibold">WhatsApp</h3><p class="text-sm text-gray-400">0775048455</p></div>
                    </div>
                    <div class="vezlo-card p-6 flex items-center gap-4">
                        <div class="w-12 h-12 rounded-full bg-vezlo-red/20 flex items-center justify-center"><i class="fas fa-phone text-vezlo-red"></i></div>
                        <div><h3 class="font-semibold">Call Us</h3><p class="text-sm text-gray-400">0775048455</p></div>
                    </div>
                </div>
            </div>
        </div>`;
    },

    login() {
        return `
        <div class="fade-in max-w-md mx-auto px-4 py-16">
            <div class="text-center mb-8">
                <i class="fas fa-bolt text-vezlo-blue text-3xl mb-2"></i>
                <h1 class="text-2xl font-bold">Welcome Back</h1>
                <p class="text-gray-400 text-sm mt-1">Login to access your dashboard</p>
            </div>
            <div class="vezlo-card p-6">
                <div class="space-y-4">
                    <div><label class="text-sm text-gray-400 block mb-1">Email</label><input type="email" id="login-email" class="vezlo-input" placeholder="you@example.com"></div>
                    <div><label class="text-sm text-gray-400 block mb-1">Password</label><input type="password" id="login-pass" class="vezlo-input" placeholder="••••••••"></div>
                    <button class="btn-primary w-full" onclick="Auth.login()">Login</button>
                    <div class="text-center text-sm text-gray-400">Don't have an account? <a onclick="Router.navigate('login')" class="text-vezlo-blue cursor-pointer hover:underline">Register</a></div>
                </div>
            </div>
        </div>`;
    },

    cart() {
        return `
        <div class="fade-in max-w-4xl mx-auto px-4 py-16">
            <h1 class="text-3xl font-bold mb-8">Shopping Cart</h1>
            <div class="grid md:grid-cols-3 gap-8">
                <div class="md:col-span-2 space-y-4">
                    <div class="vezlo-card p-4 flex gap-4 items-center">
                        <img src="https://picsum.photos/seed/cart1/100/100" class="w-20 h-20 object-cover rounded-lg">
                        <div class="flex-1">
                            <h3 class="font-semibold">Sample Product</h3>
                            <p class="text-vezlo-blue font-bold mt-1">Rs. 2,990</p>
                        </div>
                        <button class="text-gray-500 hover:text-vezlo-red transition"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
                <div class="vezlo-card p-6 h-fit">
                    <h3 class="font-bold text-lg mb-4">Order Summary</h3>
                    <div class="space-y-2 text-sm text-gray-400">
                        <div class="flex justify-between"><span>Subtotal</span><span>Rs. 2,990</span></div>
                        <div class="flex justify-between"><span>Delivery</span><span>Rs. 250</span></div>
                    </div>
                    <div class="border-t border-gray-700 my-4"></div>
                    <div class="flex justify-between font-bold text-lg"><span>Total</span><span class="text-vezlo-blue">Rs. 3,240</span></div>
                    <button class="btn-primary w-full mt-6">Proceed to Checkout</button>
                    <a href="https://wa.me/94775048455?text=Hi%20Vezlo%20Mart!%20I%20want%20to%20order" target="_blank" class="btn-outline w-full mt-3 flex items-center justify-center gap-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white">
                        <i class="fab fa-whatsapp"></i> Order via WhatsApp
                    </a>
                </div>
            </div>
        </div>`;
    }
};

// --- UTILS & AUTH ---
const Utils = {
    toast(msg, type = 'info') {
        const colors = { success: 'bg-green-600', error: 'bg-vezlo-red', info: 'bg-vezlo-blue' };
        const div = document.createElement('div');
        div.className = `${colors[type]} text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium fade-in`;
        div.textContent = msg;
        document.getElementById('toast-container').appendChild(div);
        setTimeout(() => div.remove(), 3000);
    }
};

const Auth = {
    async login() {
        const email = document.getElementById('login-email').value;
        const pass = document.getElementById('login-pass').value;
        
        // Calling our secure PHP/Python API - No Supabase key exposed!
        const result = await Api.post('login', { email, password: pass });
        
        if (result.token) {
            localStorage.setItem('vezlo_token', result.token);
            State.user = result.user;
            Utils.toast('Login Successful!', 'success');
            Router.navigate('home');
        } else {
            Utils.toast(result.message || 'Login Failed', 'error');
        }
    }
};

// Mobile Menu Toggle
function toggleMobileMenu() {
    document.getElementById('mobile-menu').classList.toggle('hidden');
}

// Initial Render
PageRenderer.render();
