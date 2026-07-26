/*==================================================
    GILSA DENTAL LAB - Professional JavaScript
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==============================
        PRELOADER
    ==============================*/
    const preloader = document.getElementById("preloader");
    if (preloader) {
        // Hide preloader immediately since DOMContentLoaded already fired
        setTimeout(() => preloader.classList.add("hide"), 600);
    }

    /*==============================
        PROGRESS BAR
    ==============================*/
    const progressBar = document.querySelector(".progress-bar");
    if (progressBar) {
        window.addEventListener("scroll", () => {
            const scroll = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            progressBar.style.width = (scroll / height) * 100 + "%";
        });
    }

    /*==============================
        HEADER SCROLL
    ==============================*/
    const header = document.getElementById("header");
    let lastScroll = 0;
    window.addEventListener("scroll", () => {
        const current = window.pageYOffset;
        if (header) {
            if (current > 60) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
            if (current > lastScroll && current > 150) {
                header.style.transform = "translateY(-100%)";
            } else {
                header.style.transform = "translateY(0)";
            }
        }
        lastScroll = current;
    });

    /*==============================
        BACK TO TOP
    ==============================*/
    const backToTop = document.getElementById("backToTop");
    if (backToTop) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 500) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }
        });
        backToTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /*==============================
        REVEAL ANIMATION
    ==============================*/
    const reveals = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05, rootMargin: "0px 0px -50px 0px" });
    reveals.forEach(el => revealObserver.observe(el));

    // Fallback: show all reveals after 1.5s in case observer doesn't fire
    setTimeout(() => {
        reveals.forEach(el => el.classList.add("show"));
    }, 1500);

    /*==============================
        COUNTER ANIMATION
    ==============================*/
    const counters = document.querySelectorAll(".stat-number[data-target]");
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target);
                animateCounter(el, target);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(el => counterObserver.observe(el));

    function animateCounter(el, target) {
        let current = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = target.toLocaleString("fa-IR");
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current).toLocaleString("fa-IR");
            }
        }, 30);
    }

    /*==============================
        ACTIVE NAV
    ==============================*/
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("nav a");
    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const top = section.offsetTop - 150;
            if (window.scrollY >= top) {
                current = section.getAttribute("id");
            }
        });
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }
        });
    });

    /*==============================
        SMOOTH SCROLL
    ==============================*/
    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth", block: "start" });
                // Close mobile menu
                const nav = document.getElementById("mainNav");
                if (nav) nav.classList.remove("open");
            }
        });
    });

    /*==============================
        MOBILE MENU
    ==============================*/
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");
    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", () => {
            mainNav.classList.toggle("open");
        });
    }

    /*==============================
        AUTH MODAL
    ==============================*/
    const authModal = document.getElementById("authModal");
    const openAuthBtns = document.querySelectorAll(".open-auth");
    const closeAuth = document.querySelector(".close-auth");

    openAuthBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            authModal.classList.add("show");
            document.body.style.overflow = "hidden";
        });
    });

    function closeAuthModal() {
        authModal.classList.remove("show");
        document.body.style.overflow = "";
    }

    if (closeAuth) closeAuth.addEventListener("click", closeAuthModal);
    if (authModal) {
        authModal.addEventListener("click", (e) => {
            if (e.target === authModal) closeAuthModal();
        });
    }

    /*==============================
        AUTH TABS
    ==============================*/
    const tabBtns = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            tabBtns.forEach(b => b.classList.remove("active"));
            tabContents.forEach(c => c.classList.remove("active"));
            btn.classList.add("active");
            const tab = btn.dataset.tab;
            if (tab === "login") {
                document.getElementById("loginForm").classList.add("active");
            } else {
                document.getElementById("registerForm").classList.add("active");
            }
        });
    });

    /*==============================
        REGISTER
    ==============================*/
    const registerBtn = document.getElementById("registerBtn");
    if (registerBtn) {
        registerBtn.addEventListener("click", () => {
            const user = {
                type: document.getElementById("registerType").value,
                fullName: document.getElementById("fullName").value.trim(),
                workPlace: document.getElementById("workPlace").value.trim(),
                mobile: document.getElementById("mobile").value.trim(),
                workPhone: document.getElementById("workPhone").value.trim(),
                city: document.getElementById("city").value.trim(),
                address: document.getElementById("address").value.trim(),
                username: document.getElementById("registerUsername").value.trim(),
                password: document.getElementById("registerPassword").value,
                password2: document.getElementById("registerPassword2").value
            };

            if (!user.fullName || !user.mobile || !user.username || !user.password) {
                showToast("لطفاً تمام فیلدهای ضروری را تکمیل کنید.", "error");
                return;
            }
            if (user.password !== user.password2) {
                showToast("رمز عبور و تکرار آن یکسان نیست.", "error");
                return;
            }

            localStorage.setItem("gilsaUsers", JSON.stringify([user]));
            localStorage.setItem("gilsaUser", JSON.stringify(user));
            showToast("ثبت‌نام با موفقیت انجام شد! 🎉", "success");
            closeAuthModal();
            openDashboard(user);
        });
    }

    /*==============================
        LOGIN
    ==============================*/
    const loginBtn = document.getElementById("loginBtn");
    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            const username = document.getElementById("loginUsername").value.trim();
            const password = document.getElementById("loginPassword").value;
            const users = JSON.parse(localStorage.getItem("gilsaUsers")) || [];
            const user = users.find(u => u.username === username && u.password === password);

            if (!user) {
                showToast("نام کاربری یا رمز عبور اشتباه است.", "error");
                return;
            }

            localStorage.setItem("gilsaUser", JSON.stringify(user));
            closeAuthModal();
            openDashboard(user);
            showToast("خوش آمدید! 👋", "success");
        });
    }

    /*==============================
        DASHBOARD
    ==============================*/
    const dashboard = document.getElementById("dashboard");
    const mainContent = document.getElementById("mainContent");
    const footer = document.getElementById("footer");

    function openDashboard(user) {
        if (mainContent) mainContent.style.display = "none";
        if (header) header.style.display = "none";
        if (footer) footer.style.display = "none";
        if (dashboard) dashboard.classList.add("show");

        document.getElementById("dashName").textContent = user.fullName;
        document.getElementById("dashType").textContent =
            user.type === "doctor" ? "دندانپزشک" : "لابراتوار";

        loadProfile(user);
        loadOrders();
        updateDashStats();
    }

    function loadProfile(user) {
        const profile = document.getElementById("profileInfo");
        if (!profile) return;
        profile.innerHTML = `
            <p><strong>نام:</strong> ${user.fullName}</p>
            <p><strong>نوع کاربر:</strong> ${user.type === "doctor" ? "دندانپزشک" : "لابراتوار"}</p>
            <p><strong>نام محل کار:</strong> ${user.workPlace || "---"}</p>
            <p><strong>موبایل:</strong> ${user.mobile}</p>
            <p><strong>تلفن محل کار:</strong> ${user.workPhone || "---"}</p>
            <p><strong>شهر:</strong> ${user.city || "---"}</p>
            <p><strong>آدرس:</strong> ${user.address || "---"}</p>
            <p><strong>نام کاربری:</strong> ${user.username}</p>
        `;
    }

    function updateDashStats() {
        const orders = JSON.parse(localStorage.getItem("gilsaOrders")) || [];
        const totalEl = document.getElementById("totalOrders");
        const pendingEl = document.getElementById("pendingOrders");
        const doneEl = document.getElementById("doneOrders");
        if (totalEl) totalEl.textContent = orders.length;
        if (pendingEl) pendingEl.textContent = orders.filter(o => o.status === "در انتظار").length;
        if (doneEl) doneEl.textContent = orders.filter(o => o.status === "تکمیل شده").length;
    }

    /*==============================
        DASHBOARD MENU
    ==============================*/
    const dashMenuItems = document.querySelectorAll(".dash-menu li[data-page]");
    const dashPages = document.querySelectorAll(".dashboard-page");

    dashMenuItems.forEach(item => {
        item.addEventListener("click", () => {
            dashMenuItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");
            dashPages.forEach(page => page.classList.remove("active"));
            const pageId = item.dataset.page;
            const page = document.getElementById(pageId);
            if (page) page.classList.add("active");
        });
    });

    /*==============================
        LOGOUT
    ==============================*/
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("gilsaUser");
            location.reload();
        });
    }

    /*==============================
        AUTO LOGIN (disabled for preview - user must click login)
    ==============================*/
    // Auto login is intentionally disabled so the landing page shows first.
    // Users can log in via the auth modal.

    /*==============================
        ORDER MODAL
    ==============================*/
    const orderModal = document.getElementById("orderModal");
    const openOrderBtns = document.querySelectorAll(".open-order");
    const closeOrder = document.querySelector(".close-order");

    openOrderBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            orderModal.classList.add("show");
            document.body.style.overflow = "hidden";
        });
    });

    function closeOrderModal() {
        orderModal.classList.remove("show");
        document.body.style.overflow = "";
    }

    if (closeOrder) closeOrder.addEventListener("click", closeOrderModal);
    if (orderModal) {
        orderModal.addEventListener("click", (e) => {
            if (e.target === orderModal) closeOrderModal();
        });
    }

    /*==============================
        ORDER PRICING
    ==============================*/
    const basePrices = {
        zirconia: 2500000,
        pfm: 1800000,
        implant: 3500000,
        emax: 3000000,
        laminate: 4000000,
        repair: 500000
    };

    const materialExtra = {
        "Zirconia HT": 0,
        "Zirconia Multilayer": 700000,
        "E.max Press": 1000000,
        "E.max CAD": 800000,
        "PFM": 0
    };

    let finalPrice = 0;

    const calcBtn = document.querySelector(".calc-price");
    const sendBtn = document.querySelector(".send-order");
    const confirmBtn = document.querySelector(".confirm-send");
    const confirmBox = document.getElementById("confirmBox");

    if (calcBtn) {
        calcBtn.addEventListener("click", () => {
            const workType = document.getElementById("workType").value;
            const count = Number(document.getElementById("workCount").value) || 1;
            const material = document.getElementById("material").value;

            if (!workType) {
                showToast("لطفاً نوع کار را انتخاب کنید.", "error");
                return;
            }

            let basePrice = basePrices[workType] || 0;
            let extra = materialExtra[material] || 0;
            finalPrice = (basePrice + extra) * count;

            if (count >= 5) finalPrice = finalPrice * 0.9;

            document.getElementById("totalPrice").textContent =
                finalPrice.toLocaleString("fa-IR") + " تومان";

            const deliveryTime = document.getElementById("deliveryTime");
            if (deliveryTime) {
                deliveryTime.textContent = "⏱ زمان آماده‌سازی: " + calculateDelivery(count, workType);
            }
        });
    }

    function calculateDelivery(count, workType) {
        if (workType === "implant") return "۷ تا ۱۰ روز کاری";
        if (count >= 5) return "۵ تا ۷ روز کاری";
        return "۳ تا ۵ روز کاری";
    }

    /*==============================
        SEND ORDER
    ==============================*/
    if (sendBtn) {
        sendBtn.addEventListener("click", () => {
            if (finalPrice === 0) {
                showToast("لطفاً ابتدا قیمت را محاسبه کنید.", "error");
                return;
            }

            const name = document.getElementById("customerName").value;
            const phone = document.getElementById("customerPhone").value;
            const workEl = document.getElementById("workType");
            const workName = workEl.options[workEl.selectedIndex].text;
            const count = document.getElementById("workCount").value;
            const date = document.getElementById("deliveryDate").value;
            const toothNumber = document.getElementById("toothNumber").value;
            const shade = document.getElementById("shade").value;
            const material = document.getElementById("material").value;
            const notes = document.getElementById("notes").value;
            const file = document.getElementById("workFile").files[0];
            const fileName = file ? file.name : "ندارد";

            document.getElementById("orderPreview").innerHTML = `
                <strong>نام پزشک:</strong> ${name}<br>
                <strong>شماره تماس:</strong> ${phone}<br>
                <strong>نوع کار:</strong> ${workName}<br>
                <strong>تعداد واحد:</strong> ${count}<br>
                <strong>شماره دندان:</strong> ${toothNumber}<br>
                <strong>Shade:</strong> ${shade}<br>
                <strong>متریال:</strong> ${material}<br>
                <strong>تاریخ تحویل:</strong> ${date}<br>
                <strong>زمان آماده‌سازی:</strong> ${calculateDelivery(count, workEl.value)}<br>
                <strong>مبلغ تقریبی:</strong> ${finalPrice.toLocaleString("fa-IR")} تومان<br>
                <strong>فایل پیوست:</strong> ${fileName}<br>
                <strong>توضیحات:</strong> ${notes || "---"}
            `;

            if (confirmBox) confirmBox.style.display = "block";
        });
    }

    /*==============================
        CONFIRM & SEND WHATSAPP
    ==============================*/
    if (confirmBtn) {
        confirmBtn.addEventListener("click", () => {
            const text = document.getElementById("orderPreview").innerText;
            const whatsappNumber = "989140503522";

            // Save order
            const order = {
                code: generateOrderCode(),
                work: document.getElementById("workType").options[document.getElementById("workType").selectedIndex].text,
                count: document.getElementById("workCount").value,
                price: finalPrice,
                status: "در انتظار",
                created: new Date().toLocaleDateString("fa-IR")
            };

            let orders = JSON.parse(localStorage.getItem("gilsaOrders")) || [];
            orders.push(order);
            localStorage.setItem("gilsaOrders", JSON.stringify(orders));

            // Open WhatsApp
            const url = "https://wa.me/" + whatsappNumber + "?text=" +
                encodeURIComponent("سلام لابراتوار گیلسا\n\n" + text);
            window.open(url, "_blank");

            showToast("سفارش شما ثبت شد! ✅", "success");
            closeOrderModal();
            if (confirmBox) confirmBox.style.display = "none";
            loadOrders();
            updateDashStats();
        });
    }

    /*==============================
        ORDER CODE GENERATOR
    ==============================*/
    function generateOrderCode() {
        const year = new Date().getFullYear();
        let lastNumber = Number(localStorage.getItem("gilsaOrderNumber")) || 0;
        lastNumber++;
        localStorage.setItem("gilsaOrderNumber", lastNumber);
        return "GL-" + year + "-" + String(lastNumber).padStart(4, "0");
    }

    /*==============================
        LOAD ORDERS TABLE
    ==============================*/
    function loadOrders() {
        const table = document.getElementById("ordersTable");
        if (!table) return;
        table.innerHTML = "";
        const orders = JSON.parse(localStorage.getItem("gilsaOrders")) || [];

        if (orders.length === 0) {
            table.innerHTML = '<tr><td colspan="4" style="color:var(--text-muted);padding:30px;">هنوز سفارشی ثبت نشده است.</td></tr>';
            return;
        }

        orders.forEach(order => {
            table.innerHTML += `
                <tr>
                    <td>${order.code}</td>
                    <td>${order.work}</td>
                    <td>${order.created}</td>
                    <td><span class="status-badge">${order.status}</span></td>
                </tr>
            `;
        });
    }

    /*==============================
        FILE PREVIEW
    ==============================*/
    const fileInput = document.getElementById("workFile");
    const filePreview = document.getElementById("filePreview");

    if (fileInput && filePreview) {
        fileInput.addEventListener("change", function () {
            const file = this.files[0];
            if (!file) {
                filePreview.innerHTML = "فایلی انتخاب نشده";
                return;
            }
            filePreview.innerHTML = `<strong>${file.name}</strong> (${(file.size / 1024).toFixed(1)} KB)`;
            if (file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    filePreview.innerHTML += `<br><img src="${e.target.result}" style="max-width:100%;max-height:200px;border-radius:12px;margin-top:12px;">`;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    /*==============================
        ESC KEY - CLOSE MODALS
    ==============================*/
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeAuthModal();
            closeOrderModal();
        }
    });

    /*==============================
        TOAST NOTIFICATION
    ==============================*/
    function showToast(message, type = "info") {
        const existing = document.querySelector(".toast");
        if (existing) existing.remove();

        const toast = document.createElement("div");
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add("show"), 10);
        setTimeout(() => {
            toast.classList.remove("show");
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Add toast styles dynamically
    const toastStyles = document.createElement("style");
    toastStyles.textContent = `
        .toast{
            position:fixed;
            top:100px;
            left:50%;
            transform:translateX(-50%) translateY(-20px);
            padding:16px 32px;
            border-radius:12px;
            font-family:var(--font);
            font-weight:700;
            font-size:15px;
            z-index:999999;
            opacity:0;
            transition:.3s ease;
            box-shadow:0 10px 40px rgba(0,0,0,.3);
        }
        .toast.show{
            opacity:1;
            transform:translateX(-50%) translateY(0);
        }
        .toast-success{
            background:linear-gradient(135deg,#059669,#10b981);
            color:white;
        }
        .toast-error{
            background:linear-gradient(135deg,#dc2626,#ef4444);
            color:white;
        }
        .toast-info{
            background:linear-gradient(135deg,var(--gold-dark),var(--gold));
            color:var(--dark);
        }
        .status-badge{
            display:inline-block;
            padding:4px 12px;
            border-radius:20px;
            background:rgba(212,175,55,.15);
            color:var(--gold);
            font-size:13px;
            font-weight:700;
        }
    `;
    document.head.appendChild(toastStyles);

});
