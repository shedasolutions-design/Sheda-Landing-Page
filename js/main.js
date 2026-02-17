const toggleButtons = document.querySelectorAll(".toggle-answer");
const menuToggle = document.getElementById("menu-toggle");
const menu = document.querySelector(".menu");
const btn = document.querySelector(".btn");

//handles the faq answeer togglers
toggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const answer = button.closest(".question").querySelector(".answer");
    answer.classList.toggle("show");
    if (button.classList.contains("expanded")) {
      button.src = "/images/arrow-down.svg";
      button.classList.remove("expanded");
    } else {
      button.src = "/images/arrow-up.svg";
      button.classList.add("expanded");
    }
  });
});

menuToggle.addEventListener('click', () => {
  menu.classList.toggle('active');
  btn.classList.toggle('active');
  if(menuToggle.classList.contains("expanded")){
    menuToggle.src = "/images/toggle-button.svg"
    menuToggle.classList.remove("expanded")
  }else{
    menuToggle.src = "/images/toggle-close-x-svgrepo-com.svg"
    menuToggle.classList.add("expanded")
    }
  }
);

// Popup functionality for iOS "Coming Soon"
const iosBtn = document.querySelector('.ios-download-btn');
const iosPopup = document.getElementById('iosComingSoon');

if (iosBtn && iosPopup) {
  iosBtn.addEventListener('click', (e) => {
    e.preventDefault();
    iosPopup.classList.add('show');
    
    // Hide popup after 2 seconds
    setTimeout(() => {
      iosPopup.classList.remove('show');
    }, 2000);
  });
}

// Tab switching for How It Works section (Buyer vs Seller)
const tabs = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove active class from all tabs and content
    tabs.forEach(t => t.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    
    // Add active class to clicked tab
    tab.classList.add('active');
    
    // Show corresponding content
    const targetId = tab.dataset.tab;
    const targetContent = document.getElementById(targetId);
    if (targetContent) {
      targetContent.classList.add('active');
    }
  });
});