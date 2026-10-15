// Đợi DOM load xong mới chạy (fix lỗi null)
document.addEventListener('DOMContentLoaded', function() {
  // Tăng dần số nhà hảo tâm
  let count = 437;
  setInterval(() => {
    count += Math.floor(Math.random() * 5) + 1;
    const donorEl = document.getElementById('donorCount');
    if (donorEl) donorEl.textContent = count.toLocaleString('vi-VN');
  }, 12000);

  // Confetti function
  function shootConfetti() {
    if (typeof confetti === 'function') {
      confetti({ 
        particleCount: 200, 
        spread: 90, 
        origin: { y: 0.6 }, 
        colors: ['#52c41a', '#ffeb3b', '#ff4d4f'] 
      });
    }
  }

  // Modal QR
  const qrModal = document.getElementById('qrModal');
  const qrCloseBtn = document.querySelector('#qrModal .close');  // Selector cụ thể hơn
  const qrDoneBtn = document.getElementById('doneBtn');

  if (qrModal) {
    // Đóng modal khi click X
    if (qrCloseBtn) {
      qrCloseBtn.addEventListener('click', () => {
        qrModal.style.display = 'none';
      });
    }

    // Đóng khi click done
    if (qrDoneBtn) {
      qrDoneBtn.addEventListener('click', () => {
        shootConfetti();
        alert('Cảm ơn boss đã nuôi tui! Tui sẽ ăn ngon hơn hẳn từ hôm nay ❤️');
        qrModal.style.display = 'none';
      });
    }

    // Đóng khi click ngoài modal
    qrModal.addEventListener('click', (e) => {
      if (e.target === qrModal) {
        qrModal.style.display = 'none';
      }
    });
  }

  // Event cho nút chọn gói
  // const packageBtns = document.querySelectorAll('.btn[data-amount]');
  // packageBtns.forEach(btn => {
  //   btn.addEventListener('click', function() {
  //     const amount = this.dataset.amount;
  //     const pack = this.dataset.pack;
  //     const note = `NuoiTui ${pack} ${Date.now().toString().slice(-6)}`;

  //     if (qrModal) {
  //       document.getElementById('modalTitle').innerHTML = `${pack}<br><strong style="font-size:2rem">${parseInt(amount).toLocaleString('vi-VN')}đ</strong>`;
  //       document.getElementById('note').textContent = note;

  //       // Xóa QR cũ
  //       const qrDiv = document.getElementById('qrcode');
  //       if (qrDiv) qrDiv.innerHTML = '';

  //       // Tạo QR mới (thay link VietQR của mày ở đây)
  //       if (typeof QRCode !== 'undefined') {
  //         new QRCode(qrDiv, {
  //           text: `https://img.vietqr.io/image/MB-0888888888-compact2.jpg?amount=${amount}&addInfo=${encodeURIComponent(note)}&accountName=TÊN CỦA MÀY`,
  //           width: 280,
  //           height: 280
  //         });
  //       }

  //       qrModal.style.display = 'flex';
  //       if (this.classList.contains('hot')) shootConfetti();
  //     }
  //   });
  // });
  // THAY ĐOẠN NÀY TRONG js/main.js (khoảng dòng 80–100)
// document.querySelectorAll('.btn[data-amount]').forEach(btn => {
//   btn.addEventListener('click', function() {
//     const amount = this.dataset.amount;
//     const pack = this.dataset.pack;
//     const note = `NuoiTui ${pack}`;

//     // Nội dung ngắn gọn để tránh lỗi overflow
//     const qrText = `https://img.vietqr.io/image/MB-0123456789-compact2.png?amount=${amount}&addInfo=${note}`;

//     document.getElementById('modalTitle').innerHTML = `${pack}<br><strong style="font-size:2rem">${parseInt(amount).toLocaleString('vi-VN')}đ</strong>`;
//     document.getElementById('note').textContent = note;

//     const qrDiv = document.getElementById('qrcode');
//     qrDiv.innerHTML = ''; // xóa cũ

//     // DÙNG ẢNH QR TĨNH HOẶC LINK NGẮN ĐỂ TRÁNH LỖI
//     // Cách 1: Dùng ảnh QR tĩnh (khuyên dùng, không bao giờ lỗi)
//     const staticQR = {
//       "Gói Cơ Bản": "/qr.jpg",
//       "Gói Tiêu Chuẩn": "image/qr.jpg",
//       "Gói VIP": "image/qr.jpg",
//       "Gói Ultra VIP": "image/qr.jpg"
//     };

//     if (staticQR[pack]) {
//       const img = document.createElement('img');
//       img.src = staticQR[pack];
//       img.style.cssText = "width:280px;height:280px;border-radius:16px;box-shadow:0 10px 30px rgba(0,0,0,.3);";
//       qrDiv.appendChild(img);
//     } else {
//       // Cách 2: Nếu vẫn muốn dùng QR động thì rút ngắn nội dung
//       new QRCode(qrDiv, {
//         text: qrText,
//         width: 280,
//         height: 280,
//         colorDark: "#000",
//         colorLight: "#fff",
//         correctLevel: QRCode.CorrectLevel.L   // ← QUAN TRỌNG: giảm level xuống L để chứa nội dung dài hơn
//       });
//     }

//     qrModal.style.display = 'flex';
//     if (this.classList.contains('hot')) shootConfetti();
//   });
// });

// =========================================
// FIX LỖI CLICK CHỌN GÓI BẰNG EVENT DELEGATION
// =========================================
document.addEventListener('click', function(e) {
  // Bắt sự kiện cho tất cả các nút có class 'btn' và thuộc tính 'data-amount'
  if (e.target && e.target.classList.contains('btn') && e.target.hasAttribute('data-amount')) {
    const amount = e.target.dataset.amount;
    const pack = e.target.dataset.pack;
    const note = `NuoiTui ${pack}`;

    // Nội dung ngắn gọn để tránh lỗi overflow khi quét QR
    const qrText = `https://img.vietqr.io/image/MB-0123456789-compact2.png?amount=${amount}&addInfo=${note}`;

    document.getElementById('modalTitle').innerHTML = `${pack}<br><strong style="font-size:2rem">${parseInt(amount).toLocaleString('vi-VN')}đ</strong>`;
    document.getElementById('note').textContent = note;

    const qrDiv = document.getElementById('qrcode');
    qrDiv.innerHTML = ''; // xóa cũ

    // Cập nhật thêm các gói Fan vào danh sách QR tĩnh
    const staticQR = {
      "Gói Cơ Bản": "image/qr.jpg",
      "Gói Tiêu Chuẩn": "image/qr.jpg",
      "Gói VIP": "image/qr.jpg",
      "Gói Ultra VIP": "image/qr.jpg",
      "Gói Fan Cứng": "image/qr.jpg",
      "Gói Fan Chân Chính": "image/qr.jpg",
      "Gói Fan Cuồng": "image/qr.jpg"
    };

    if (staticQR[pack]) {
      const img = document.createElement('img');
      img.src = staticQR[pack]; // Nếu không có ảnh thực, nó sẽ hiện icon vỡ ảnh, lúc đó nên dùng mã QR động bên dưới
      img.style.cssText = "width:280px;height:280px;border-radius:16px;box-shadow:0 10px 30px rgba(0,0,0,.3);";
      
      // Bắt lỗi nếu file ảnh không tồn tại thì fallback về QR động
      img.onerror = function() {
        qrDiv.innerHTML = '';
        new QRCode(qrDiv, { text: qrText, width: 280, height: 280, colorDark: "#000", colorLight: "#fff", correctLevel: QRCode.CorrectLevel.L });
      };
      qrDiv.appendChild(img);
    } else {
      // Dùng QR động
      new QRCode(qrDiv, {
        text: qrText,
        width: 280,
        height: 280,
        colorDark: "#000",
        colorLight: "#fff",
        correctLevel: QRCode.CorrectLevel.L
      });
    }

    document.getElementById('qrModal').style.display = 'flex';
    if (e.target.classList.contains('hot')) shootConfetti();
  }
});

// =========================================
// LOGIC CHO NÚT "CHO SẢ ĂN" (ỦNG HỘ TUỲ TÂM)
// =========================================
const feedBtn = document.getElementById('feedBtn');
const feedModal = document.getElementById('feedModal');
const closeFeed = document.querySelector('.close-feed');
const doneFeedBtn = document.getElementById('doneFeedBtn');

if(feedBtn && feedModal) {
  // Mở modal khi bấm vào bụng gấu
  feedBtn.addEventListener('click', () => {
    feedModal.style.display = 'flex';
    if(typeof shootConfetti === 'function') shootConfetti();
  });

  // Đóng modal khi bấm nút X
  if(closeFeed) {
    closeFeed.addEventListener('click', () => {
      feedModal.style.display = 'none';
    });
  }

  // Bấm nút Đã cho ăn xong
  if(doneFeedBtn) {
    doneFeedBtn.addEventListener('click', () => {
      alert('Sả đã nhận được tình yêu thương! Cảm ơn boss nhiều lắm 💖');
      feedModal.style.display = 'none';
      if(typeof shootConfetti === 'function') shootConfetti();
    });
  }

  // Bấm ra ngoài rìa để đóng modal
  feedModal.addEventListener('click', (e) => {
    if (e.target === feedModal) {
      feedModal.style.display = 'none';
    }
  });
}

  // FAQ accordion
  const faqQs = document.querySelectorAll('.faq-q');
  faqQs.forEach(q => {
    q.addEventListener('click', () => {
      const span = q.querySelector('span');
      if (span) span.textContent = span.textContent === '+' ? '−' : '+';
      const a = q.nextElementSibling;
      if (a) a.classList.toggle('open');
    });
  });

  // Tạo mã NT
  const generateBtn = document.getElementById('generateBtn');
  if (generateBtn) {
    generateBtn.addEventListener('click', () => {
      const code = 'NT-' + Math.floor(1000 + Math.random() * 9000);
      const ntCodeEl = document.getElementById('ntCode');
      if (ntCodeEl) ntCodeEl.textContent = code;
      shootConfetti();
      alert('Chúc mừng! Mã NT độc quyền của bạn: ' + code + '\n(Có thể trùng với người khác do... hệ thống bận)');
    });
  }

  // Dark mode toggle
  const darkToggle = document.getElementById('darkToggle');
  if (darkToggle) {
    darkToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const icon = darkToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
      }
      localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
    // Load saved theme
    if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark-mode');
      darkToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }
  }
});

// ==================== CALCULATOR (thêm vào nếu chưa có) ====================
const calcBtn = document.getElementById('calcBtn');
if (calcBtn) {
  calcBtn.addEventListener('click', () => {
    const budget = parseInt(document.getElementById('monthlyBudget').value) || 0;
    const result = document.getElementById('calcResult');

    if (budget < 100000) {
      result.textContent = "Thôi để tui nhịn đói luôn cho rồi... 😭";
      result.style.color = "#999";
    } else if (budget < 400000) {
      result.textContent = "Với số tiền này tui chỉ mua được trà sữa đá thôi. Gói Cơ Bản là đủ rồi! ☕";
      result.style.color = "#52c41a";
    } else if (budget < 1500000) {
      result.textContent = "Ối zời ơi giàu thế! Nuôi tui gói Tiêu Chuẩn đi, tui sẽ gọi video cảm ơn mỗi tuần 1 lần! 📹";
      result.style.color = "#d4380d";
    } else {
      result.textContent = "BOSS LỚN ĐẾN TỪ GIÃ?!?! Gói VIP hoặc Ultra VIP ngay và luôn, tui làm osin cho boss 1 ngày cũng được!!! 💰";
      result.style.color = "#ff4d4f";
      shootConfetti();
    }
  });
}

// ==================== PROGRESS BAR RANDOM ====================
window.addEventListener('load', () => {
  const percent = 50 + Math.random() * 40; // 50-90%
  const progressEl = document.getElementById('monthlyProgress');
  const percentEl = document.querySelector('.progress-percent');
  const labelEl = document.querySelector('.progress-label span');

  if (progressEl) progressEl.style.width = percent + '%';
  if (percentEl) percentEl.textContent = percent.toFixed(1) + '%';
  if (labelEl) {
    const achieved = (percent / 100 * 10000000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
    labelEl.textContent = achieved;
  }
});

// Nút donate progress bar
const progressDonate = document.querySelector('.progress-donate');
if (progressDonate) {
  progressDonate.addEventListener('click', () => {
    const vipBtn = document.querySelector('.btn[data-pack="Gói VIP"]');
    if (vipBtn) vipBtn.click();
  });
}

// ==================== QUIZ (nếu có nút quiz-btn) ====================
const quizBtn = document.querySelector('.quiz-btn');
const quizModal = document.getElementById('quizModal');
let quizStep = 0;
let quizScore = 0;

const quizQuestions = [
  { q: "Bạn thích uống gì hơn?", a: ["Trà sữa size L", "Cà phê Starbucks"], points: [1, 3] },
  { q: "Bạn hay xem Netflix kiểu nào?", a: ["Lậu 100%", "Premium chính chủ"], points: [1, 3] },
  { q: "Cuối tuần bạn làm gì?", a: ["Ở nhà xem phim", "Đi cafe, ăn nhà hàng"], points: [1, 3] },
  { q: "Bạn sẵn sàng chi bao nhiêu để nuôi tui?", a: ["Dưới 500k", "Trên 5 triệu cũng được"], points: [1, 5] }
];

if (quizBtn && quizModal) {
  quizBtn.addEventListener('click', startQuiz);
  document.querySelector('#quizModal .close').addEventListener('click', () => quizModal.style.display = 'none');

  function startQuiz() {
    quizStep = 0;
    quizScore = 0;
    showQuizQuestion();
  }

  function showQuizQuestion() {
    const content = document.getElementById('quizContent');
    const progress = document.getElementById('quizProgress');
    if (content && progress) {
      content.innerHTML = `<p><strong>Câu ${quizStep + 1}/4:</strong> ${quizQuestions[quizStep].q}</p>
        <button class="quiz-option" data-value="0">${quizQuestions[quizStep].a[0]}</button>
        <button class="quiz-option" data-value="1">${quizQuestions[quizStep].a[1]}</button>`;
      progress.textContent = `${quizStep + 1}/4`;
    }
    quizModal.style.display = 'flex';
  }

  document.getElementById('quizContent').addEventListener('click', (e) => {
    if (e.target.classList.contains('quiz-option')) {
      const val = parseInt(e.target.dataset.value);
      quizScore += quizQuestions[quizStep].points[val];
      quizStep++;
      if (quizStep >= quizQuestions.length) {
        showQuizResult();
      } else {
        showQuizQuestion();
      }
    }
  });

  function showQuizResult() {
    const content = document.getElementById('quizContent');
    let recommend;
    if (quizScore <= 5) recommend = "Gói Cơ Bản – vừa túi tiền, vẫn thương tui được chút đỉnh 😊";
    else if (quizScore <= 9) recommend = "Gói Tiêu Chuẩn – HOT NHẤT, hợp lý nhất! 🔥";
    else recommend = "Gói VIP – boss giàu quá tui sợ luôn! 💎";

    if (content) {
      content.innerHTML = `<h3>Kết quả của bạn:</h3>
        <p style="font-size:1.5rem">${recommend}</p>
        <button class="btn" style="margin-top:20px" onclick="document.querySelector('.popular .btn').click(); quizModal.style.display='none';">Nuôi tui gói này luôn!</button>`;
      shootConfetti();
    }
  }
}

// Nhật ký được nuôi – tự cập nhật mỗi 15s
const diaryEntries = [
  "Hôm nay ăn phở nhờ anh A, cảm ơn anh nhiềuuuu",
  "Chị B chuyển 200k, tui vừa mua trà sữa đào",
  "Anh C nuôi gói VIP, tui vừa đi Starbucks xong",
  "Chị D gửi 5 triệu, tui mua iPhone 15 Pro Max rồi nha",
  "Anh Nắng gửi 100 nghìn, tui mua jollibee đớp hết rồi nha",
  "Mèo gửi 50 k, đủ 2 cái cánh gà",
  "Cảm ơn anh E đã nuôi tui cả năm, tui béo lên 4kg rồi",
  "Hôm nay tui đi ăn nhà hàng nhờ tiền của các boss F",
  "Cảm ơn anh K đã tài trợ tôi làm tóc",
  "Anh Hùng chuyển tiền mua đùi gà cho Bii",
  "Tui vừa đặt vé đi Đà Lạt nhờ chị G nuôi gói Ultra",
  "Vừa nhận được tiền làm móng từ anh Linh",
  "Cảm ơn tất cả các boss đã không để tui đói"
];

const diaryFeed = document.getElementById('diaryFeed');
if (diaryFeed) {
  function addDiary() {
    const entry = diaryEntries[Math.floor(Math.random() * diaryEntries.length)];
    const time = new Date().toLocaleTimeString('vi-VN');
    const div = document.createElement('div');
    div.innerHTML = `<p style="background:#fff;padding:20px;border-radius:16px;margin:15px 0;box-shadow:0 5px 15px rgba(0,0,0,.08);font-style:italic"><strong>${time}</strong> – ${entry}</p>`;
    diaryFeed.insertBefore(div, diaryFeed.firstChild);
    if (diaryFeed.children.length > 8) diaryFeed.removeChild(diaryFeed.lastChild);
  }
  addDiary();
  setInterval(addDiary, 15000);
}

// FIX 100% LỖI copyRef is not defined + copy ngon lành
document.addEventListener('DOMContentLoaded', function() {
  const copyBtn = document.getElementById('copyBtn');
  const refLink = document.getElementById('refLink');
  const copyMsg = document.getElementById('copyMsg');

  if (copyBtn && refLink) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(refLink.value);
        copyMsg.textContent = "Đã copy link! Giờ đi spam group đi boss";
        shootConfetti();
      } catch (err) {
        // fallback cho trình duyệt cũ
        refLink.select();
        document.execCommand('copy');
        copyMsg.textContent = "Đã copy (cách cổ điển)!";
        shootConfetti();
      }
      setTimeout(() => copyMsg.textContent = "", 5000);
    });
  }
});

// === HIỆU ỨNG ĐẶC BIỆT CHO GÓI ULTRA VIP ===
document.querySelectorAll('.btn[data-pack="Gói Ultra VIP"]').forEach(btn => {
  btn.addEventListener('click', function() {
    // 1. Bắn pháo hoa siêu to khổng lồ
    confetti({
      particleCount: 400,
      spread: 120,
      angle: 90,
      startVelocity: 60,
      decay: 0.95,
      gravity: 0.5,
      ticks: 300,
      origin: { y: 0.3 },
      colors: ['#ffd700', '#ff6b35', '#ff1493', '#00ff00', '#00bfff', '#ff4500']
    });

    // 2. Bắn thêm 2 bên trái phải
    setTimeout(() => {
      confetti({
        particleCount: 200,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.5 }
      });
      confetti({
        particleCount: 200,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.5 }
      });
    }, 300);

    // 3. Bắn thêm vòng tròn vàng ở giữa
    setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 90,
        spread: 360,
        startVelocity: 45,
        origin: { y: 0.5 },
        colors: ['#ffd700', '#ffeb3b', '#fff700']
      });
    }, 600);

    // 4. Thông báo siêu lầy
    setTimeout(() => {
      alert("CHÚC MỪNG ĐẠI GIA!!!\n\nTui sẽ làm osin cho boss cả đời này luôn!\nCảm ơn boss đã cứu đói cả dòng họ nhà tui");
    }, 1000);

    // 5. Rung nhẹ màn hình cho đã
    document.body.classList.add('ultra-vip-shake');
    setTimeout(() => document.body.classList.remove('ultra-vip-shake'), 1000);
  });
});

// =========================================
// LOGIC CHUYỂN TAB (VỀ SẢ & GÓI NUÔI SẢ)
// =========================================

// Hàm chuyển Tab cho Gói Nuôi Sả
window.openPackage = function(evt, pkgName) {
  let i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("pkg-tab-content");
  for (i = 0; i < tabcontent.length; i++) { 
    tabcontent[i].classList.remove("active-content"); 
  }
  tablinks = document.getElementsByClassName("pkg-tab-btn");
  for (i = 0; i < tablinks.length; i++) { 
    tablinks[i].classList.remove("active"); 
  }
  document.getElementById(pkgName).classList.add("active-content");
  evt.currentTarget.classList.add("active");
};

// Hàm chuyển Tab cho phần Về Sả (Giới thiệu, Album, Liên hệ)
window.openAbout = function(evt, aboutName) {
  let i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("about-tab-content");
  for (i = 0; i < tabcontent.length; i++) { 
    tabcontent[i].classList.remove("active-content"); 
  }
  tablinks = document.getElementsByClassName("about-tab-btn");
  for (i = 0; i < tablinks.length; i++) { 
    tablinks[i].classList.remove("active"); 
  }
  document.getElementById(aboutName).classList.add("active-content");
  evt.currentTarget.classList.add("active");
};

// Hàm chuyển Tab cho Lời nhận xét
window.openTestimonial = function(evt, tabName) {
  let i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("testi-tab-content");
  for (i = 0; i < tabcontent.length; i++) { 
    tabcontent[i].classList.remove("active-content"); 
  }
  tablinks = document.getElementsByClassName("testi-tab-btn");
  for (i = 0; i < tablinks.length; i++) { 
    tablinks[i].classList.remove("active"); 
  }
  document.getElementById(tabName).classList.add("active-content");
  evt.currentTarget.classList.add("active");
};

// Dark Mode Toggle + lưu trạng thái
// const darkToggle = document.getElementById('darkToggle');
// if (darkToggle) {
//   darkToggle.addEventListener('click', () => {
//     document.body.classList.toggle('dark-mode');
//     const isDark = document.body.classList.contains('dark-mode');
//     darkToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
//     localStorage.setItem('darkMode', isDark);
//   });

//   // Load trạng thái cũ
//   if (localStorage.getItem('darkMode') === 'true') {
//     document.body.classList.add('dark-mode');
//     darkToggle.innerHTML = '<i class="fas fa-sun"></i>';
//   }
// }

// // Back to Top
// const backToTop = document.getElementById('backToTop');
// window.addEventListener('scroll', () => {
//   if (window.scrollY > 500) {
//     backToTop.classList.add('show');
//   } else {
//     backToTop.classList.remove('show');
//   }
// });

// backToTop.addEventListener('click', () => {
//   window.scrollTo({ top: 0, behavior: 'smooth' });
//   // Rocket bay khi click
//   backToTop.style.animation = 'fly 1s ease-out';
//   setTimeout(() => backToTop.style.animation = '', 1000);
// });