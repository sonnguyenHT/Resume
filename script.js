document.addEventListener('DOMContentLoaded', function() {
    // Thêm hiệu ứng khi cuộn trang
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Thêm hiệu ứng cho các phần kỹ năng
    const skills = document.querySelectorAll('.skill');
    skills.forEach(skill => {
        skill.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
        
        skill.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Thêm nút chuyển đổi chế độ tối/sáng
    const container = document.querySelector('.container');
    const themeToggle = document.createElement('button');
    themeToggle.textContent = '🌙';
    themeToggle.classList.add('theme-toggle');
    themeToggle.title = 'Chuyển đổi chế độ tối/sáng';
    document.body.appendChild(themeToggle);

    // Xử lý sự kiện chuyển đổi chế độ
    let darkMode = false;
    themeToggle.addEventListener('click', function() {
        darkMode = !darkMode;
        if (darkMode) {
            document.body.classList.add('dark-mode');
            themeToggle.textContent = '☀️';
        } else {
            document.body.classList.remove('dark-mode');
            themeToggle.textContent = '🌙';
        }
    });

    // Thêm nút in CV
    const printButton = document.createElement('button');
    printButton.textContent = '🖨️ In CV';
    printButton.classList.add('print-button');
    printButton.title = 'In CV';
    document.body.appendChild(printButton);

    // Xử lý sự kiện in
    printButton.addEventListener('click', function() {
        window.print();
    });

    // Thêm hiệu ứng cho các mục kinh nghiệm
    const experienceItems = document.querySelectorAll('.experience-item');
    experienceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f8f9fa';
            this.style.borderRadius = '8px';
            this.style.padding = '15px';
            this.style.transition = 'all 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
            this.style.padding = '0';
        });
    });
}); 