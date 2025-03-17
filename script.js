document.addEventListener('DOMContentLoaded', function() {
    // Khởi tạo các biến DOM
    const header = document.querySelector('header');
    const themeToggle = document.createElement('button');
    const printButton = document.createElement('button');
    const scrollTopButton = document.createElement('button');
    const progressContainer = document.createElement('div');
    const progressBar = document.createElement('div');

    // Tạo thanh tiến trình cuộn
    progressContainer.className = 'progress-container';
    progressBar.className = 'progress-bar';
    progressContainer.appendChild(progressBar);
    document.body.appendChild(progressContainer);

    // Hiệu ứng cuộn trang
    window.addEventListener('scroll', function() {
        // Cập nhật thanh tiến trình
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';

        // Hiển thị/ẩn nút cuộn lên đầu trang
        if (window.scrollY > 300) {
            scrollTopButton.classList.add('show');
        } else {
            scrollTopButton.classList.remove('show');
        }
    });

    // Thêm hiệu ứng cho các phần kỹ năng
    const skills = document.querySelectorAll('.skill');
    skills.forEach((skill, index) => {
        // Thêm hiệu ứng xuất hiện dần
        skill.style.animationDelay = (index * 0.05) + 's';
    });

    // Thêm nút chuyển đổi chế độ tối/sáng
    themeToggle.innerHTML = '🌙';
    themeToggle.className = 'theme-toggle';
    themeToggle.title = 'Chuyển đổi chế độ tối/sáng';
    document.body.appendChild(themeToggle);

    // Kiểm tra xem đã lưu chế độ tối chưa
    let darkMode = localStorage.getItem('darkMode') === 'true';
    
    // Áp dụng chế độ đã lưu
    if (darkMode) {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '☀️';
    }

    // Xử lý sự kiện chuyển đổi chế độ
    themeToggle.addEventListener('click', function() {
        darkMode = !darkMode;
        localStorage.setItem('darkMode', darkMode);
        
        if (darkMode) {
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '☀️';
        } else {
            document.body.classList.remove('dark-mode');
            themeToggle.innerHTML = '🌙';
        }
    });

    // Thêm nút in CV
    printButton.innerHTML = '🖨️ In CV';
    printButton.className = 'print-button';
    printButton.title = 'In CV';
    document.body.appendChild(printButton);

    // Xử lý sự kiện in
    printButton.addEventListener('click', function() {
        window.print();
    });

    // Thêm nút cuộn lên đầu trang
    scrollTopButton.innerHTML = '↑';
    scrollTopButton.className = 'scroll-top';
    scrollTopButton.title = 'Cuộn lên đầu trang';
    document.body.appendChild(scrollTopButton);

    // Xử lý sự kiện cuộn lên đầu trang
    scrollTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Chuyển đổi cấu trúc HTML cho card và timeline
    function setupLayout() {
        // Wrap nội dung trong card
        const container = document.querySelector('.container');
        const divs = Array.from(container.children);
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        
        // Di chuyển tất cả các phần tử vào card
        divs.forEach(div => {
            cardDiv.appendChild(div);
        });
        
        container.appendChild(cardDiv);

        // Thay đổi các tiêu đề section
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            const h2 = section.querySelector('h2');
            if (h2) {
                h2.className = 'section-title';
            }
        });

        // Tạo timeline cho phần kinh nghiệm
        const expSection = document.querySelector('.section:nth-of-type(3)');
        if (expSection) {
            const expItems = expSection.querySelectorAll('.experience-item');
            const timeline = document.createElement('div');
            timeline.className = 'timeline';
            
            expItems.forEach(item => {
                const companyDiv = item.querySelector('.company');
                if (companyDiv) {
                    const companyName = companyDiv.querySelector('span:first-child');
                    const location = companyDiv.querySelector('span:last-child');
                    
                    if (companyName) companyName.className = 'company-name';
                    
                    const jobTitle = item.querySelector('.job-title');
                    if (jobTitle) jobTitle.className = 'experience-role';
                }
                
                timeline.appendChild(item);
            });
            
            // Xóa nội dung hiện tại và thêm timeline mới
            const h2 = expSection.querySelector('h2');
            expSection.innerHTML = '';
            expSection.appendChild(h2);
            expSection.appendChild(timeline);
        }
    }

    // Thiết lập bố cục
    setupLayout();

    // Thêm hiệu ứng hover cho các mục
    document.querySelectorAll('a, button, .contact-item, .skill, .experience-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
    });

    // Thêm hiệu ứng typing cho tiêu đề khi tải trang
    setTimeout(() => {
        const h1 = document.querySelector('h1');
        if (h1) {
            h1.style.opacity = '1';
            h1.style.transform = 'translateY(0)';
        }
    }, 300);
}); 