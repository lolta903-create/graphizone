// ملف JavaScript الخاص بصفحة المعرض
document.addEventListener('DOMContentLoaded', function() {
    setupPortfolioFilter();
    setupModalEvents();
    setupLoadMore();
});

// إعداد مرشح المعرض
function setupPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // تحديث الأزرار النشطة
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // تصفية العناصر
            filterPortfolioItems(filter);
        });
    });
}

// تصفية عناصر المعرض
function filterPortfolioItems(filter) {
    const items = document.querySelectorAll('.portfolio-item');
    
    items.forEach(item => {
        if(filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 100);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
}

// إعداد أحداث النوافذ المنبثقة
function setupModalEvents() {
    // إغلاق النوافذ عند النقر على الزر X
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // إغلاق النوافذ بمفتاح ESC
    document.addEventListener('keydown', function(e) {
        if(e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
        }
    });
}

// فتح نافذة المعرض
function openPortfolioModal(itemNumber) {
    const modal = document.getElementById('portfolioModal');
    const modalImg = document.getElementById('portfolioModalImg');
    const modalTitle = document.getElementById('portfolioModalTitle');
    const modalDesc = document.getElementById('portfolioModalDesc');
    const modalTags = document.getElementById('portfolioModalTags');
    
    // بيانات النماذج
    const portfolioData = {
        1: {
            img: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&h=600&fit=crop',
            title: 'شعار تقني حديث',
            desc: 'تصميم شعار لشركة تقنية ناشئة متخصصة في الذكاء الاصطناعي',
            tags: ['شعار', 'تقني', 'حديث']
        },
        2: {
            img: 'https://images.unsplash.com/photo-1611262588019-db6cc2032da3?w=800&h=600&fit=crop',
            title: 'شعار عيادة طبية',
            desc: 'تصميم شعار احترافي لعيادة متخصصة في الجراحة التجميلية',
            tags: ['شعار', 'طبي', 'احترافي']
        },
        3: {
            img: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&h=600&fit=crop',
            title: 'حملة إنستقرام',
            desc: 'سلسلة تصاميم متكاملة لحملة تسويقية على إنستقرام',
            tags: ['سوشيال ميديا', 'إنستقرام', 'تسويق']
        },
        4: {
            img: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
            title: 'ستوريات تفاعلية',
            desc: 'تصاميم ستوريات متحركة لعلامة تجارية في مجال الموضة',
            tags: ['ستوري', 'متحرك', 'موضة']
        },
        5: {
            img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
            title: 'هوية بصرية كاملة',
            desc: 'حزمة هوية بصرية متكاملة لشركة عقارية رائدة',
            tags: ['هوية بصرية', 'براندنج', 'متكامل']
        },
        6: {
            img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
            title: 'براندنغ متكامل',
            desc: 'حزمة براندنغ شاملة تشمل جميع عناصر الهوية البصرية',
            tags: ['براندنج', 'شامل', 'متكامل']
        }
    };
    
    const data = portfolioData[itemNumber];
    if(data && modal && modalImg && modalTitle && modalDesc && modalTags) {
        modalImg.src = data.img;
        modalImg.alt = data.title;
        modalTitle.textContent = data.title;
        modalDesc.textContent = data.desc;
        
        // إضافة الوسوم
        modalTags.innerHTML = '';
        data.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.textContent = tag;
            modalTags.appendChild(tagElement);
        });
        
        modal.style.display = 'flex';
    }
}

// إغلاق نافذة المعرض
function closePortfolioModal() {
    document.getElementById('portfolioModal').style.display = 'none';
}

// فتح نافذة الفيديو
function openVideoModal() {
    document.getElementById('videoModal').style.display = 'flex';
}

// إغلاق نافذة الفيديو
function closeVideoModal() {
    const iframe = document.getElementById('portfolioVideo');
    if(iframe) {
        const src = iframe.src;
        iframe.src = '';
        setTimeout(() => {
            iframe.src = src;
        }, 300);
    }
    document.getElementById('videoModal').style.display = 'none';
}

// إعداد زر تحميل المزيد
function setupLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if(loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreItems);
    }
}

// تحميل المزيد من العناصر
function loadMoreItems() {
    const btn = document.getElementById('loadMoreBtn');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحميل...';
    btn.disabled = true;
    
    // محاكاة جلب البيانات
    setTimeout(() => {
        // في التطبيق الحقيقي، هنا ستجلب البيانات من الخادم
        const portfolioGrid = document.querySelector('.portfolio-grid');
        
        // إضافة عناصر جديدة
        for(let i = 0; i < 3; i++) {
            const newItem = createPortfolioItem();
            portfolioGrid.appendChild(newItem);
        }
        
        btn.innerHTML = '<i class="fas fa-plus"></i> عرض المزيد';
        btn.disabled = false;
        
        // إعادة إعداد الأحداث للعناصر الجديدة
        setupModalEvents();
    }, 1500);
}

// إنشاء عنصر معرض جديد
function createPortfolioItem() {
    const item = document.createElement('div');
    item.className = 'portfolio-item';
    item.setAttribute('data-category', 'logos');
    
    const categories = ['logos', 'social', 'identity', 'branding'];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    item.setAttribute('data-category', randomCategory);
    
    const designs = [
        { title: 'تصميم شعار مبدع', desc: 'شعار فريد لعلامة تجارية جديدة' },
        { title: 'حملة تسويقية', desc: 'سلسلة تصاميم لحملة ترويجية' },
        { title: 'هوية بصرية', desc: 'تصميم هوية متكاملة لشركة' }
    ];
    const randomDesign = designs[Math.floor(Math.random() * designs.length)];
    
    item.innerHTML = `
        <div class="portfolio-img">
            <img src="https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000)}?w=600&h=400&fit=crop" alt="${randomDesign.title}">
            <div class="portfolio-overlay">
                <button class="view-btn" onclick="openPortfolioModal(${Math.floor(Math.random() * 6) + 1})">
                    <i class="fas fa-expand"></i>
                </button>
            </div>
        </div>
        <div class="portfolio-info">
            <h3>${randomDesign.title}</h3>
            <p>${randomDesign.desc}</p>
            <div class="portfolio-tags">
                <span class="tag">${randomCategory === 'logos' ? 'شعار' : randomCategory === 'social' ? 'سوشيال ميديا' : 'هوية بصرية'}</span>
                <span class="tag">${randomCategory}</span>
            </div>
        </div>
    `;
    
    return item;
}