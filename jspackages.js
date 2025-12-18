// ملف JavaScript الخاص بصفحة الباقات
document.addEventListener('DOMContentLoaded', function() {
    setupPackageFilters();
    setupFAQs();
    checkURLHash();
});

// إعداد مرشحات الباقات
function setupPackageFilters() {
    const filterButtons = document.querySelectorAll('.category-tab');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            filterPackages(category);
        });
    });
}

// تصفية الباقات حسب الفئة
function filterPackages(category) {
    // تحديد الزر النشط
    document.querySelectorAll('.category-tab').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeBtn = Array.from(document.querySelectorAll('.category-tab'))
        .find(btn => btn.getAttribute('onclick').includes(`'${category}'`));
    if(activeBtn) activeBtn.classList.add('active');
    
    // تصفية الباقات
    const sections = document.querySelectorAll('.package-category-section');
    sections.forEach(section => {
        if(category === 'all' || section.id.includes(category)) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
    
    // التمرير إلى القسم
    if(category !== 'all') {
        const targetSection = document.getElementById(`${category}-section`);
        if(targetSection) {
            setTimeout(() => {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }
}

// إعداد الأسئلة الشائعة
function setupFAQs() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // إغلاق جميع الإجابات الأخرى
            document.querySelectorAll('.faq-answer').forEach(item => {
                if(item !== answer && item.style.maxHeight) {
                    item.style.maxHeight = null;
                    item.previousElementSibling.querySelector('i').classList.remove('fa-chevron-up');
                    item.previousElementSibling.querySelector('i').classList.add('fa-chevron-down');
                }
            });
            
            // تبديل الإجابة الحالية
            if(answer.style.maxHeight) {
                answer.style.maxHeight = null;
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            } else {
                answer.style.maxHeight = answer.scrollHeight + "px";
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            }
        });
    });
}

// التحقق من الهاش في الرابط
function checkURLHash() {
    const hash = window.location.hash.substring(1);
    if(hash && (hash === 'logos' || hash === 'social' || hash === 'identity' || hash === 'branding' || hash === 'basic' || hash === 'pro')) {
        setTimeout(() => {
            if(hash === 'basic' || hash === 'pro') {
                // إذا كان hash يشير إلى باقة معينة
                const packageElement = document.getElementById(hash);
                if(packageElement) {
                    packageElement.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                // إذا كان hash يشير إلى فئة
                filterPackages(hash);
            }
        }, 500);
    }
}

// اختيار باقة
function selectPackage(packageName, price) {
    if(currentUser) {
        document.getElementById('selectedPackageName').textContent = packageName;
        document.getElementById('selectedPackagePrice').textContent = `${price.toLocaleString()} ريال`;
        document.getElementById('packageModal').style.display = 'flex';
    } else {
        showLoginModal();
        setTimeout(() => {
            showNotification('يرجى إنشاء حساب أولاً لاختيار الباقة', 'info');
        }, 500);
    }
}

// تأكيد اختيار الباقة
function confirmPackageSelection() {
    const packageName = document.getElementById('selectedPackageName').textContent;
    
    // حفظ اختيار الباقة للمستخدم
    if(currentUser) {
        let userPackages = JSON.parse(localStorage.getItem('graphizone_packages') || '{}');
        if(!userPackages[currentUser.id]) {
            userPackages[currentUser.id] = [];
        }
        
        const packageSelection = {
            id: Date.now(),
            name: packageName,
            date: new Date().toISOString(),
            status: 'pending'
        };
        
        userPackages[currentUser.id].push(packageSelection);
        localStorage.setItem('graphizone_packages', JSON.stringify(userPackages));
    }
    
    closePackageModal();
    showNotification(`تم اختيار ${packageName} بنجاح! سيتواصل معك فريق الدعم خلال 24 ساعة.`, 'success');
    
    // إعادة التوجيه بعد 2 ثانية
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

// إغلاق نافذة الباقة
function closePackageModal() {
    document.getElementById('packageModal').style.display = 'none';
}