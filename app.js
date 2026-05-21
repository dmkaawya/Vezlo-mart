// ==========================================
// 1. SUPABASE INITIALIZATION
// ==========================================
// REPLACE WITH YOUR SUPABASE URL AND ANON KEY
const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ==========================================
// 2. UI INTERACTION (TABS)
// ==========================================
function switchTab(tab) {
    document.getElementById('login-form').classList.remove('active');
    document.getElementById('register-form').classList.remove('active');
    document.getElementById('login-tab').classList.remove('active');
    document.getElementById('register-tab').classList.remove('active');

    if (tab === 'login') {
        document.getElementById('login-form').classList.add('active');
        document.getElementById('login-tab').classList.add('active');
    } else {
        document.getElementById('register-form').classList.add('active');
        document.getElementById('register-tab').classList.add('active');
    }
}

// ==========================================
// 3. AUTH LOGIC
// ==========================================

// Redirect logic based on Role
async function redirectBasedOnRole(userId) {
    const { data: profile, error } = await supabase
        .from('profiles')
        .select('role, reseller_status')
        .eq('id', userId)
        .single();

    if (error) {
        console.error('Error fetching profile', error);
        return;
    }

    // Route Protection Logic
    switch (profile.role) {
        case 'owner':
            window.location.href = '/dashboard-owner.html';
            break;
        case 'manager':
            window.location.href = '/dashboard-manager.html';
            break;
        case 'staff':
            window.location.href = '/dashboard-staff.html';
            break;
        case 'reseller':
            // If they registered but aren't approved yet, treat them as customers
            if (profile.reseller_status !== 'approved') {
                window.location.href = '/dashboard-customer.html';
            } else {
                window.location.href = '/dashboard-reseller.html';
            }
            break;
        case 'customer':
        default:
            window.location.href = '/dashboard-customer.html';
            break;
    }
}

// Handle Login
async function handleLogin(event) {
    event.preventDefault();
    const btn = document.getElementById('login-btn');
    const msgEl = document.getElementById('login-message');
    
    btn.disabled = true;
    btn.textContent = 'Signing In...';
    msgEl.textContent = '';

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        msgEl.textContent = error.message;
        msgEl.className = 'message error';
        btn.disabled = false;
        btn.textContent = 'Sign In';
    } else {
        msgEl.textContent = 'Success! Redirecting...';
        msgEl.className = 'message success';
        await redirectBasedOnRole(data.user.id);
    }
}

// Handle Register
async function handleRegister(event) {
    event.preventDefault();
    const btn = document.getElementById('register-btn');
    const msgEl = document.getElementById('register-message');

    btn.disabled = true;
    btn.textContent = 'Creating Account...';
    msgEl.textContent = '';

    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const fullName = document.getElementById('reg-name').value;
    const isReseller = document.getElementById('reg-is-reseller').checked;

    // Pass metadata to the trigger function to auto-create profile
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
                role: isReseller ? 'reseller' : 'customer'
            }
        }
    });

    if (error) {
        msgEl.textContent = error.message;
        msgEl.className = 'message error';
        btn.disabled = false;
        btn.textContent = 'Create Account';
    } else {
        // Note: If email confirmation is ON in Supabase, data.user will exist but data.session will be null.
        // For this boilerplate, we assume either email confirmation is OFF, or we handle the redirect.
        if (data.user) {
            msgEl.textContent = isReseller ? 'Account created! Your reseller application is pending review.' : 'Account created! Redirecting...';
            msgEl.className = 'message success';
            
            // If session exists (email confirm off), redirect immediately
            if (data.session) {
                setTimeout(() => redirectBasedOnRole(data.user.id), 1500);
            } else {
                msgEl.textContent = 'Please check your email to verify your account before logging in.';
                btn.disabled = false;
                btn.textContent = 'Create Account';
            }
        }
    }
}

// Check if user is already logged in on page load
async function checkSession() {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
        await redirectBasedOnRole(session.user.id);
    }
}

checkSession();
