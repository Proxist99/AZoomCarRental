document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Hamburger Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.getElementById('navbar');

    if (mobileMenu && navbar) {
        mobileMenu.addEventListener('click', () => {
            navbar.classList.toggle('active');
        });
    }

    // Hero Section Buttons Interactive Logic
    const heroBookBtn = document.getElementById('heroBookBtn');
    const heroExploreBtn = document.getElementById('heroExploreBtn');
    const heroOffersBtn = document.getElementById('heroOffersBtn');

    if (heroBookBtn) {
        heroBookBtn.addEventListener('click', () => {
            window.location.href = 'reserve.html';
        });
    }

    if (heroExploreBtn) {
        heroExploreBtn.addEventListener('click', () => {
            window.location.href = 'reserve.html';
        });
    }

    if (heroOffersBtn) {
        heroOffersBtn.addEventListener('click', () => {
            const promoSection = document.querySelector('.promotion');
            if (promoSection) {
                promoSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Promotion Learn More Modal Logic
    const promoModal = document.getElementById('promoModal');
    const closePromoModal = document.getElementById('closePromoModal');
    const promoModalTitle = document.getElementById('promoModalTitle');
    const promoModalDesc = document.getElementById('promoModalDesc');
    const promoModalActionBtn = document.getElementById('promoModalActionBtn');

    const promoData = {
        weekend: {
            title: "Weekend Special (10% Off)",
            desc: "Take advantage of our weekend getaway offer! Book any of our electric vehicles for a weekend trip (Friday through Sunday) and enjoy an automatic 10% discount on your rental subtotal."
        },
        longterm: {
            title: "Long-Term Rental Savings",
            desc: "Planning an extended road trip or need a reliable ride for the week? Rent any vehicle for 7 consecutive days or more and our system will automatically apply a 10% long-term discount at checkout."
        },
        newcustomer: {
            title: "New Customer Welcome",
            desc: "Welcome to AZoom Car Rentals! First-time registered customers get priority vehicle allocation, zero security deposit hassles, and streamlined booking verification."
        }
    };

    document.querySelectorAll('.promo-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const promoType = e.target.getAttribute('data-promo');
            const data = promoData[promoType];

            if (data && promoModal) {
                promoModalTitle.textContent = data.title;
                promoModalDesc.textContent = data.desc;
                promoModal.classList.remove('hidden');
            }
        });
    });

    if (closePromoModal && promoModal) {
        closePromoModal.addEventListener('click', () => {
            promoModal.classList.add('hidden');
        });
    }

    if (promoModalActionBtn && promoModal) {
        promoModalActionBtn.addEventListener('click', () => {
            promoModal.classList.add('hidden');
        });
    }

    // Close modal when clicking outside the card
    if (promoModal) {
        promoModal.addEventListener('click', (e) => {
            if (e.target === promoModal) {
                promoModal.classList.add('hidden');
            }
        });
    }

    // 2. Dynamic Navbar updates based on Login State (Runs on all pages)
    const loggedInUser = JSON.parse(localStorage.getItem('azoom_logged_in_user'));
    const loggedInEmp = JSON.parse(localStorage.getItem('azoom_logged_in_employee'));

    if (loggedInUser && navbar) {
        navbar.innerHTML = `
            <a href="carrental.html" class="nav-link">Home</a>
            <a href="about.html" class="nav-link">About</a>
            <a href="reserve.html" class="nav-link">Rent</a>
            <a href="return.html" class="nav-link">Return</a>
            <a href="payment.html" class="nav-link">Payment</a>
            <span class="nav-link" style="color: #00bcd4; font-weight: bold;">Hi, ${loggedInUser.fullname}</span>
            <a href="#" id="logout-btn" class="nav-link" style="color: #ff4d4d;">Logout</a>
        `;

        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('azoom_logged_in_user');
                alert('You have been logged out.');
                window.location.href = 'carrental.html';
            });
        }
    } else if (loggedInEmp && navbar) {
        navbar.innerHTML = `
            <a href="carrental.html" class="nav-link">Home</a>
            <a href="employee.html" class="nav-link" style="color: #00bcd4;">Staff Portal</a>
            <span class="nav-link" style="font-weight: bold;">Staff: ${loggedInEmp.email}</span>
            <a href="#" id="emp-logout-nav-btn" class="nav-link" style="color: #ff4d4d;">Logout</a>
        `;

        const empLogoutNavBtn = document.getElementById('emp-logout-nav-btn');
        if (empLogoutNavBtn) {
            empLogoutNavBtn.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('azoom_logged_in_employee');
                alert('Staff logged out.');
                window.location.href = 'carrental.html';
            });
        }
    }

    // 3. Signup Form Logic (Runs only on signup.html)
    const fullnameInput = document.getElementById('fullname');
    const authForm = document.querySelector('.auth-form');

    if (authForm && fullnameInput) {
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const fullname = fullnameInput.value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (email.toLowerCase() === 'staff@azoom.com') {
                alert("This email address is reserved for staff members and cannot be registered as a customer.");
                return;
            }

            if (password.length < 6) {
                alert("Password must be at least 6 characters long!");
                return;
            }

            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            let users = JSON.parse(localStorage.getItem('azoom_users')) || [];
            const existingUser = users.find(user => user.email.toLowerCase() === email.toLowerCase());

            if (existingUser) {
                alert('An account with this email already exists! Please log in.');
                window.location.href = 'login.html';
                return;
            }

            users.push({ fullname, email, password });
            localStorage.setItem('azoom_users', JSON.stringify(users));

            alert('Account created successfully! Redirecting to login...');
            window.location.href = 'login.html';
        });
    }

    // 5. Forgot Password Modal Logic
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const forgotPasswordModal = document.getElementById('forgotPasswordModal');
    const closeForgotModal = document.getElementById('closeForgotModal');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const resetMessage = document.getElementById('resetMessage');

    if (forgotPasswordLink && forgotPasswordModal) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            forgotPasswordModal.classList.remove('hidden');
            if (resetMessage) resetMessage.textContent = '';
        });
    }

    if (closeForgotModal && forgotPasswordModal) {
        closeForgotModal.addEventListener('click', () => {
            forgotPasswordModal.classList.add('hidden');
        });
    }

    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const resetEmail = document.getElementById('resetEmail').value.trim();
            const newPassword = document.getElementById('newPassword').value.trim();
            const users = JSON.parse(localStorage.getItem('azoom_users')) || [];
            const userIndex = users.findIndex(u => u.email.toLowerCase() === resetEmail.toLowerCase());

            if (userIndex !== -1) {
                users[userIndex].password = newPassword;
                localStorage.setItem('azoom_users', JSON.stringify(users));

                resetMessage.className = 'reset-message success';
                resetMessage.textContent = 'Success! Your password has been updated. You can now log in.';

                forgotPasswordForm.reset();
                setTimeout(() => {
                    forgotPasswordModal.classList.add('hidden');
                }, 2000);
            } else {
                resetMessage.className = 'reset-message error';
                resetMessage.textContent = 'No account found with this email address.';
            }
        });
    }

    // 6. Date Picker Validation & Catalog Logic (reserve.html)
    const pickupInput = document.getElementById('pickupDate');
    const returnInput = document.getElementById('returnDate');

    if (pickupInput && returnInput) {
        const todayStr = new Date().toISOString().split('T')[0];
        pickupInput.min = todayStr;
        returnInput.min = todayStr;

        pickupInput.addEventListener('change', () => {
            if (pickupInput.value) {
                returnInput.min = pickupInput.value;
                if (returnInput.value && returnInput.value < pickupInput.value) {
                    returnInput.value = pickupInput.value;
                }
            }
        });
    }

    const carCatalogGrid = document.getElementById('carCatalogGrid');
    if (carCatalogGrid) {
        const catalogCars = [
            { id: 'car1', name: 'Polestar 2 BST Edition', price: 110, image: '../image/2022_polestar_2_bst_edition_270_4k_8k-1920x1080.jpg', desc: 'High-performance electric fastback with specialized chassis tuning.' },
            { id: 'car2', name: 'Audi e-tron GT', price: 150, image: '../image/2022-Audi-e-tron-GT-Front-Right-4.jpg', desc: 'Stunning luxury grand tourer blending instant EV torque with German engineering.' },
            { id: 'car3', name: 'Lucid Air Sapphire', price: 190, image: '../image/2024-lucid-air-sapphire-exterior-front-view.jpg', desc: 'Ultra-luxury electric sedan delivering groundbreaking range and hypercar acceleration.' },
            { id: 'car4', name: 'Ford Mustang Mach-E', price: 95, image: '../image/2025 Mustang Mach E 3.jpg', desc: 'Dynamic all-electric SUV offering spirited driving and modern connectivity.' },
            { id: 'car5', name: 'Porsche Taycan', price: 170, image: '../image/2025-porsche-taycan.webp', desc: 'Iconic sports EV engineered for precision handling and blistering track speeds.' },
            { id: 'car6', name: 'BMW i4 M50', price: 120, image: '../image/bmw_i4_m50_2021_5k_2-1920x1080.jpg', desc: 'All-electric performance gran coupe carrying classic M-division agility.' },
            { id: 'car7', name: 'Kia EV6 GT', price: 105, image: '../image/kia_ev6_gt_2022-1920x1080.jpg', desc: 'Award-winning futuristic electric crossover with exhilarating dual-motor power.' },
            { id: 'car8', name: 'Rivian R1T', price: 130, image: '../image/rivian.jfif', desc: 'Versatile electric adventure truck built for rugged terrain and road trips.' },
            { id: 'car9', name: 'Tesla Model 3 Performance', price: 90, image: '../image/tesla3.jpg', desc: 'Sleek, minimalist electric sedan with rapid acceleration and autopilot tech.' },
            { id: 'car10', name: 'Hyundai Ioniq 5 N', price: 115, image: '../image/hyundai-ioniq-5-n.jpg', desc: 'High-performance electric hot hatch designed for pure driving engagement.' }
        ];

        const existingBookings = JSON.parse(localStorage.getItem('azoom_bookings')) || [];
        const rentedCarNames = existingBookings
            .filter(b => b.status !== 'Completed' && b.status !== 'Returned' && !b.status.includes('Completed'))
            .map(b => b.car);

        carCatalogGrid.innerHTML = catalogCars.map(car => {
            const isRented = rentedCarNames.includes(car.name);
            return `
                <div class="car-card" style="background: #fdfbf7; border: 1px solid #e0dcd0; border-radius: 8px; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <img src="${car.image}" alt="${car.name}" onerror="this.src='https://via.placeholder.com/400x250?text=AZoom+Car+Image'" style="width: 100%; aspect-ratio: 16 / 10; object-fit: cover; border-radius: 6px; margin-bottom: 12px;">
                        <h3 style="font-size: 18px; margin-bottom: 6px; color: #222;">${car.name}</h3>
                        <p style="font-size: 13px; color: #666; margin-bottom: 14px; line-height: 1.4;">${car.desc}</p>
                    </div>
                    <div>
                        <p style="font-size: 16px; font-weight: bold; color: #008b8b; margin-bottom: 14px;">$${car.price}.00 <span style="font-size: 12px; color: #666; font-weight: normal;">/ day</span></p>
                        <button class="btn-submit rent-car-btn" data-car="${car.name}" data-price="${car.price}" 
                            style="width: 100%; ${isRented ? 'background-color: #777; cursor: not-allowed;' : ''}" 
                            ${isRented ? 'disabled' : ''}>
                            ${isRented ? 'Rented / Booked' : 'Proceed to Pay'}
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        document.querySelectorAll('.rent-car-btn:not([disabled])').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const loggedInUser = JSON.parse(localStorage.getItem('azoom_logged_in_user'));

                if (!loggedInUser) {
                    alert('You must be logged in to rent a vehicle. Redirecting to login page...');
                    localStorage.setItem('azoom_redirect_after_login', 'reserve.html');
                    window.location.href = 'login.html';
                    return;
                }

                const pickVal = pickupInput ? pickupInput.value : '';
                const retVal = returnInput ? returnInput.value : '';

                if (!pickVal || !retVal) {
                    alert('Please select valid Pick-up and Return dates before renting!');
                    return;
                }

                const startDate = new Date(pickVal);
                const endDate = new Date(retVal);
                const diffTime = endDate - startDate;
                const days = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

                const carName = e.target.getAttribute('data-car');
                const dailyRate = parseFloat(e.target.getAttribute('data-price'));

                // ==========================================
                // STACKABLE DAY-BY-DAY PRICING & DISCOUNTS
                // ==========================================
                let subtotal = dailyRate * days;
                let weekendDiscountAmount = 0;
                let weekendDaysCount = 0;
                let appliedDiscounts = [];

                // 1. Calculate weekend-specific discounts day-by-day
                for (let i = 0; i < days; i++) {
                    const tempDate = new Date(startDate);
                    tempDate.setDate(tempDate.getDate() + i);
                    const dayOfWeek = tempDate.getDay(); // 0 = Sunday, 6 = Saturday

                    if (dayOfWeek === 0 || dayOfWeek === 6) {
                        weekendDaysCount++;
                        weekendDiscountAmount += (dailyRate * 0.10); // 10% off for each weekend day's rate
                    }
                }

                if (weekendDaysCount > 0) {
                    appliedDiscounts.push(`Weekend Special (10% off on ${weekendDaysCount} weekend day${weekendDaysCount > 1 ? 's' : ''})`);
                }

                // 2. Calculate Long-Term Discount (10% off subtotal if 7+ days)
                let longTermDiscountAmount = 0;
                if (days >= 7) {
                    longTermDiscountAmount = subtotal * 0.10;
                    appliedDiscounts.push("10% Long-Term Discount");
                }

                // 3. Calculate New Customer Discount (10% off subtotal if 0 previous bookings)
                const existingBookings = JSON.parse(localStorage.getItem('azoom_bookings')) || [];
                const userBookings = existingBookings.filter(b => b.user === loggedInUser.email);
                const isNewCustomer = (userBookings.length === 0);

                let newCustomerDiscountAmount = 0;
                if (isNewCustomer) {
                    newCustomerDiscountAmount = subtotal * 0.10;
                    appliedDiscounts.push("New Customer Welcome (10%)");
                }

                // Stack all eligible discounts together!
                let totalDiscount = weekendDiscountAmount + longTermDiscountAmount + (isNewCustomer ? newCustomerDiscountAmount : 0);

                // Optional safety check: ensure discount doesn't exceed the subtotal
                totalDiscount = Math.min(totalDiscount, subtotal);

                let totalBasePrice = subtotal - totalDiscount;
                let appliedDiscountName = appliedDiscounts.length > 0 ? appliedDiscounts.join(" + ") : "No discount";
                // ==========================================

                const pickupLocInput = document.getElementById('pickupLocation');
                const pickupLocationVal = pickupLocInput ? pickupLocInput.value : 'AZoom HQ - Downtown Central';

                if (!pickupLocationVal) {
                    alert('Please select a pick-up location before proceeding.');
                    return;
                }

                const pendingPayment = {
                    id: 'AZOOM-' + Math.floor(100000 + Math.random() * 900000),
                    user: loggedInUser.email,
                    car: carName,
                    dailyRate: dailyRate,
                    pickup: pickVal,
                    returnDate: retVal,
                    pickupLocation: pickupLocationVal,
                    days: days,
                    subtotal: subtotal,
                    discount: totalDiscount,
                    discountName: appliedDiscountName, // <-- Ensure this is passed
                    totalBasePrice: totalBasePrice
                };

                localStorage.setItem('azoom_pending_payment', JSON.stringify(pendingPayment));
                window.location.href = 'payment.html';
            });
        });
    }

    // 7. Payment Page Logic (payment.html) - Secured & Consolidated
    const pendingPayment = JSON.parse(localStorage.getItem('azoom_pending_payment'));
    const pendingDamagePayment = JSON.parse(localStorage.getItem('azoom_pending_damage_payment'));
    const basePaymentForm = document.getElementById('basePaymentForm');

    if (window.location.pathname.includes('payment.html')) {
        const loggedInUsr = localStorage.getItem('currentUser') || localStorage.getItem('azoom_logged_in_user');
        if (!loggedInUsr) {
            alert('Access denied. Please log in to proceed with payment.');
            window.location.href = 'login.html';
            return;
        }
    }

    if (basePaymentForm) {
        if (pendingDamagePayment) {
            document.getElementById('payCarName').textContent = pendingDamagePayment.car + ' (Damage Penalty Settlement)';
            document.getElementById('payDates').textContent = `Booking ID: ${pendingDamagePayment.id}`;
            document.getElementById('payDays').textContent = '1';
            document.getElementById('payDailyRate').textContent = `$${pendingDamagePayment.amount.toFixed(2)}`;
            document.getElementById('paySubtotal').textContent = `$${pendingDamagePayment.amount.toFixed(2)}`;
            document.getElementById('payTotalAmount').textContent = `$${pendingDamagePayment.amount.toFixed(2)}`;

            const submitBtn = basePaymentForm.querySelector('button[type="submit"]');
            if (submitBtn) submitBtn.textContent = 'Pay Damage Fee';

            basePaymentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const cardInput = document.getElementById('cardNumber');
                const cardNumber = cardInput ? cardInput.value.replace(/\s+/g, '') : '';

                if (!/^\d{16}$/.test(cardNumber)) {
                    alert('Please enter a valid 16-digit credit card number.');
                    if (cardInput) cardInput.focus();
                    return;
                }

                let allBookings = JSON.parse(localStorage.getItem('azoom_bookings')) || [];
                const idx = allBookings.findIndex(b => b.id === pendingDamagePayment.id);

                if (idx !== -1) {
                    allBookings[idx].status = 'Completed / Cleared (Damages Paid)';
                    localStorage.setItem('azoom_bookings', JSON.stringify(allBookings));
                    localStorage.removeItem('azoom_pending_damage_payment');

                    alert(`Damage payment of $${pendingDamagePayment.amount.toFixed(2)} successful! Your booking is fully cleared.`);
                    window.location.href = 'return.html';
                }
            });

        } else if (pendingPayment) {
            document.getElementById('payCarName').textContent = pendingPayment.car;
            document.getElementById('payDates').textContent = `${pendingPayment.pickup} to ${pendingPayment.returnDate}`;
            document.getElementById('payDays').textContent = pendingPayment.days;
            document.getElementById('payDailyRate').textContent = `$${pendingPayment.dailyRate.toFixed(2)}`;
            document.getElementById('paySubtotal').textContent = `$${pendingPayment.subtotal.toFixed(2)}`;

            if (pendingPayment.discount > 0) {
                const discountRow = document.getElementById('discountRow');
                if (discountRow) discountRow.style.display = 'block';

                // Display the combined discount label and the total stacked amount saved
                const discountLabel = document.getElementById('payDiscountLabel') || document.querySelector('#discountRow span:first-child');
                const discountVal = document.getElementById('payDiscount');

                if (discountLabel && pendingPayment.discountName) {
                    discountLabel.textContent = pendingPayment.discountName + ":";
                }
                if (discountVal) {
                    discountVal.textContent = `-$${pendingPayment.discount.toFixed(2)}`;
                }
            }

            document.getElementById('payTotalAmount').textContent = `$${pendingPayment.totalBasePrice.toFixed(2)}`;

            basePaymentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const cardInput = document.getElementById('cardNumber');
                const cardNumber = cardInput ? cardInput.value.replace(/\s+/g, '') : '';

                if (!/^\d{16}$/.test(cardNumber)) {
                    alert('Please enter a valid 16-digit credit card number.');
                    if (cardInput) cardInput.focus();
                    return;
                }

                const reservation = {
                    id: pendingPayment.id,
                    user: pendingPayment.user,
                    car: pendingPayment.car,
                    dailyRate: pendingPayment.dailyRate,
                    pickup: pendingPayment.pickup,
                    returnDate: pendingPayment.returnDate,
                    pickupLocation: pendingPayment.pickupLocation || 'AZoom HQ - Downtown Central',
                    days: pendingPayment.days,
                    basePaid: pendingPayment.totalBasePrice,
                    status: 'Paid / Reserved',
                    damageFee: 0
                };

                let bookings = JSON.parse(localStorage.getItem('azoom_bookings')) || [];
                bookings.push(reservation);
                localStorage.setItem('azoom_bookings', JSON.stringify(bookings));
                localStorage.removeItem('azoom_pending_payment');

                alert(`Base payment of $${pendingPayment.totalBasePrice.toFixed(2)} successful!\nBooking ID: ${reservation.id}`);
                window.location.href = 'reserve.html';
            });
        }
    }

    // 8. Return Page Logic (return.html)
    const activeRentalsList = document.getElementById('activeRentalsList');
    if (activeRentalsList) {
        const loggedInUsr = JSON.parse(localStorage.getItem('azoom_logged_in_user'));

        if (!loggedInUsr) {
            activeRentalsList.innerHTML = `<p style="text-align:center;">Please <a href="login.html">login</a> to view your returns.</p>`;
            return;
        }

        let bookings = JSON.parse(localStorage.getItem('azoom_bookings')) || [];
        const userRentals = bookings.filter(b => b.user === loggedInUsr.email && !b.status.includes('Completed'));

        if (userRentals.length === 0) {
            activeRentalsList.innerHTML = `<p style="text-align:center; color:#666;">No active or pending car returns found.</p>`;
            return;
        }

        activeRentalsList.innerHTML = userRentals.map(booking => {
            let actionButtonHtml = '';
            let statusColor = '#008b8b';

            if (booking.status === 'Paid / Reserved') {
                actionButtonHtml = `
                    <div style="display: flex; flex-direction: column; gap: 8px; align-items: flex-end;">
                        <div style="width: 100%;">
                            <label style="font-size: 12px; color: #555; display: block; margin-bottom: 3px; font-weight: bold;">Select Drop-off Branch:</label>
                            <select id="dropoff-${booking.id}" style="padding: 6px; border-radius: 4px; border: 1px solid #ccc; font-size: 13px; background: #fff;">
                                <option value="AZoom HQ - Downtown Central">AZoom HQ - Downtown Central</option>
                                <option value="AZoom Airport Hub - Terminal 3">AZoom Airport Hub - Terminal 3</option>
                                <option value="AZoom West Hub - Jurong East">AZoom West Hub - Jurong East</option>
                                <option value="AZoom North Branch - Woodlands">AZoom North Branch - Woodlands</option>
                            </select>
                        </div>
                        <button class="return-single-car-btn" data-id="${booking.id}" style="padding: 10px 20px; background: #e53935; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; width: 100%;">Return This Car</button>
                    </div>
                `;
            } else if (booking.status === 'Awaiting Inspection') {
                statusColor = '#d97706';
                actionButtonHtml = `<span style="color: #d97706; font-weight: bold; font-style: italic;">Awaiting Staff Inspection...</span>`;
            } else if (booking.status === 'Awaiting Damage Payment') {
                statusColor = '#dc2626';
                actionButtonHtml = `<button class="pay-damage-btn" data-id="${booking.id}" data-fee="${booking.damageFee}" style="padding: 10px 20px; background: #dc2626; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">Pay Damage Fee ($${booking.damageFee.toFixed(2)})</button>`;
            }

            return `
                <div style="background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #e0dcd0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px;">
                    <div>
                        <h3 style="margin: 0 0 5px 0; font-size: 18px;">${booking.car}</h3>
                        <p style="margin: 0; font-size: 13px; color: #666;">ID: <strong>${booking.id}</strong> | Period: ${booking.pickup} to ${booking.returnDate}</p>
                        <p style="margin: 3px 0; font-size: 12px; color: #555;">Original Pickup Branch: <strong>${booking.pickupLocation || 'AZoom HQ - Downtown Central'}</strong></p>
                        <p style="margin: 5px 0 0 0; font-size: 13px; color: ${statusColor};">Status: <strong>${booking.status}</strong></p>
                        ${booking.inspectionNotes ? `<p style="margin: 5px 0 0 0; font-size: 12px; color: #444;">Staff Notes: ${booking.inspectionNotes}</p>` : ''}
                    </div>
                    <div>${actionButtonHtml}</div>
                </div>
            `;
        }).join('');

        document.querySelectorAll('.return-single-car-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetBookingId = e.target.getAttribute('data-id');
                const dropoffSelect = document.getElementById(`dropoff-${targetBookingId}`);
                const dropoffLocation = dropoffSelect ? dropoffSelect.value : 'AZoom HQ - Downtown Central';

                let allBookings = JSON.parse(localStorage.getItem('azoom_bookings')) || [];
                const idx = allBookings.findIndex(b => b.id === targetBookingId);

                if (idx !== -1) {
                    allBookings[idx].status = 'Awaiting Inspection';
                    allBookings[idx].dropoffLocation = dropoffLocation;
                    allBookings[idx].inspectionNotes = `Returned at ${dropoffLocation}, awaiting employee review.`;

                    localStorage.setItem('azoom_bookings', JSON.stringify(allBookings));
                    alert(`Vehicle (${allBookings[idx].car}) returned to ${dropoffLocation}! Status is now Awaiting Inspection.`);
                    window.location.reload();
                }
            });
        });

        document.querySelectorAll('.pay-damage-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetBookingId = e.target.getAttribute('data-id');
                const damageFee = parseFloat(e.target.getAttribute('data-fee'));

                let allBookings = JSON.parse(localStorage.getItem('azoom_bookings')) || [];
                const booking = allBookings.find(b => b.id === targetBookingId);

                if (booking) {
                    const damagePaymentData = {
                        id: booking.id,
                        car: booking.car,
                        type: 'damage_fee',
                        amount: damageFee
                    };
                    localStorage.setItem('azoom_pending_damage_payment', JSON.stringify(damagePaymentData));
                    window.location.href = 'payment.html';
                }
            });
        });
    }

    // 9. Employee Portal Logic (employee.html)
    const employeeLoginForm = document.getElementById('employeeLoginForm');
    const employeeLoginCard = document.getElementById('employeeLoginCard');
    const employeeDashboard = document.getElementById('employeeDashboard');
    const inspectionQueueList = document.getElementById('inspectionQueueList');

    if (employeeLoginForm) {
        const empLoggedIn = JSON.parse(localStorage.getItem('azoom_logged_in_employee'));
        if (empLoggedIn) {
            employeeLoginCard.style.display = 'none';
            employeeDashboard.style.display = 'block';
            loadFullFleetInspectionView();
        }

        employeeLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('empEmail').value.trim();
            const password = document.getElementById('empPassword').value.trim();

            let users = JSON.parse(localStorage.getItem('azoom_users')) || [];
            const isRegisteredCustomer = users.some(user => user.email.toLowerCase() === email.toLowerCase());

            if (isRegisteredCustomer) {
                alert("Access denied. Customer accounts cannot log in through the staff portal.");
                return;
            }

            if (email === 'staff@azoom.com' && password === 'staff123') {
                const empData = { email: email, name: 'Staff Inspector' };
                localStorage.setItem('azoom_logged_in_employee', JSON.stringify(empData));
                alert('Staff login successful!');
                employeeLoginCard.style.display = 'none';
                employeeDashboard.style.display = 'block';
                loadFullFleetInspectionView();
            } else {
                alert('Invalid staff credentials. (Use staff@azoom.com / staff123)');
            }
        });
    }

    function loadFullFleetInspectionView() {
        if (!inspectionQueueList) return;

        let bookings = JSON.parse(localStorage.getItem('azoom_bookings')) || [];

        if (bookings.length === 0) {
            inspectionQueueList.innerHTML = `<p style="color: #666; text-align: center;">No active reservations or fleet returns in system.</p>`;
            return;
        }

        inspectionQueueList.innerHTML = bookings.map(b => {
            let statusClass = 'badge-cleared';
            let isActionable = (b.status === 'Awaiting Inspection' || b.status === 'Returned');

            if (b.status === 'Awaiting Inspection' || b.status === 'Returned') {
                statusClass = 'badge-awaiting';
            } else if (b.status === 'Awaiting Damage Payment') {
                statusClass = 'badge-damage';
            } else if (b.status.includes('Completed') || b.status.includes('Cleared')) {
                statusClass = 'badge-cleared';
            } else {
                statusClass = 'badge-reserved';
            }

            return `
                <div class="inspection-card">
                    <div class="inspection-card-header">
                        <h3 class="inspection-car-title">${b.car} <span class="inspection-id">(ID: ${b.id})</span></h3>
                        <span class="status-badge ${statusClass}">${b.status}</span>
                    </div>

                    <p class="inspection-meta">
                        Rented by: <strong>${b.user}</strong> | 
                        Period: ${b.pickup} to ${b.returnDate} <br>
                        Pickup: <strong>${b.pickupLocation || 'AZoom HQ - Downtown Central'}</strong> → 
                        Drop-off: <strong class="branch-highlight">${b.dropoffLocation || 'Pending Return'}</strong>
                    </p>

                    ${isActionable ? `
                        <div class="inspection-form-box">
                            <h4 class="inspection-form-title">Log Vehicle Inspection Details:</h4>
                            <div class="inspection-controls">
                                <div class="control-group">
                                    <label class="control-label">Damage Fee ($):</label>
                                    <input type="number" id="damageInput-${b.id}" value="0" min="0" class="form-control-sm">
                                </div>
                                <div class="control-group">
                                    <label class="control-label">Inspection Notes:</label>
                                    <input type="text" id="notesInput-${b.id}" placeholder="e.g. Scratched bumper / Clean" class="form-control-md">
                                </div>
                                <button class="btn-submit submit-inspection-btn" data-id="${b.id}">Save Inspection</button>
                            </div>
                        </div>
                    ` : `
                        <p class="inspection-notes-text">Staff Notes: ${b.inspectionNotes || 'No notes logged.'}</p>
                    `}
                </div>
            `;
        }).join('');

        document.querySelectorAll('.submit-inspection-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const bookingId = e.target.getAttribute('data-id');
                const damageInput = document.getElementById(`damageInput-${bookingId}`);
                const notesInput = document.getElementById(`notesInput-${bookingId}`);

                const damageCost = damageInput ? parseFloat(damageInput.value) || 0 : 0;
                const notes = notesInput ? notesInput.value.trim() : 'No notes provided';

                let allBookings = JSON.parse(localStorage.getItem('azoom_bookings')) || [];
                const idx = allBookings.findIndex(item => item.id === bookingId);

                if (idx !== -1) {
                    if (damageCost > 0) {
                        allBookings[idx].status = 'Awaiting Damage Payment';
                        allBookings[idx].damageFee = damageCost;
                        allBookings[idx].inspectionNotes = notes;
                        alert(`Inspection logged for ${allBookings[idx].car}! Damage of $${damageCost.toFixed(2)} billed.`);
                    } else {
                        allBookings[idx].status = 'Completed / Cleared';
                        allBookings[idx].damageFee = 0;
                        allBookings[idx].inspectionNotes = notes || 'Inspected & Cleared: No damages.';
                        alert(`Vehicle ${allBookings[idx].car} passed inspection and is cleared!`);
                    }

                    localStorage.setItem('azoom_bookings', JSON.stringify(allBookings));
                    loadFullFleetInspectionView();
                }
            });
        });
    }

    // 10. Customer & Staff Login Tab Switcher Logic (login.html)
    const customerTabBtn = document.getElementById('customerTabBtn');
    const employeeTabBtn = document.getElementById('employeeTabBtn');
    const loginTitle = document.getElementById('loginTitle');
    const loginSubtitle = document.getElementById('loginSubtitle');
    const loginForm = document.getElementById('loginForm');

    let loginMode = 'customer';

    if (customerTabBtn && employeeTabBtn) {
        customerTabBtn.addEventListener('click', (e) => {
            e.preventDefault();
            loginMode = 'customer';
            customerTabBtn.classList.add('active-tab');
            employeeTabBtn.classList.remove('active-tab');
            if (loginTitle) loginTitle.textContent = 'Customer Login';
            if (loginSubtitle) loginSubtitle.textContent = 'Enter your customer credentials to access your account.';
        });

        employeeTabBtn.addEventListener('click', (e) => {
            e.preventDefault();
            loginMode = 'employee';
            employeeTabBtn.classList.add('active-tab');
            customerTabBtn.classList.remove('active-tab');
            if (loginTitle) loginTitle.textContent = 'Staff / Employee Login';
            if (loginSubtitle) loginSubtitle.textContent = 'Enter staff credentials to access inspection queue.';
        });
    }

    if (loginForm && !document.getElementById('fullname')) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');

            if (!emailInput || !passwordInput) return;

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            if (loginMode === 'employee') {
                let users = JSON.parse(localStorage.getItem('azoom_users')) || [];
                const isRegisteredCustomer = users.some(user => user.email.toLowerCase() === email.toLowerCase());

                if (isRegisteredCustomer) {
                    alert("Access denied. Customer accounts cannot log in through the staff portal.");
                    return;
                }

                if (email.toLowerCase() === 'staff@azoom.com' && password === 'staff123') {
                    const empData = { email: email, name: 'Staff Inspector' };
                    localStorage.setItem('azoom_logged_in_employee', JSON.stringify(empData));
                    alert('Staff login successful! Redirecting to Inspection Portal...');
                    window.location.href = 'employee.html';
                } else {
                    alert('Invalid staff credentials. (Use staff@azoom.com / staff123)');
                }
            } else {
                if (email.toLowerCase() === 'staff@azoom.com') {
                    alert("Staff accounts cannot log in via the customer portal. Please use the Staff Login tab.");
                    return;
                }

                let users = JSON.parse(localStorage.getItem('azoom_users')) || [];
                const validUser = users.find(
                    user => user.email.toLowerCase() === email.toLowerCase() && user.password === password
                );

                if (validUser) {
                    localStorage.setItem('azoom_logged_in_user', JSON.stringify(validUser));
                    alert(`Welcome back, ${validUser.fullname}!`);

                    const redirectPage = localStorage.getItem('azoom_redirect_after_login');
                    if (redirectPage) {
                        localStorage.removeItem('azoom_redirect_after_login');
                        window.location.href = redirectPage;
                    } else {
                        window.location.href = 'carrental.html';
                    }
                } else {
                    alert('Invalid email or password. Please try again.');
                }
            }
        });
    }

});