/* ============================================================
   SOULARIUM — Visual Reflection App
   Vanilla JS — no dependencies
   ============================================================ */

(function () {
  "use strict";

  // ---- Data ----

  var questions = [
    {
      id: "Q1",
      text: "Gambar mana yang paling menggambarkan bagaimana Anda melihat diri Anda saat ini?"
    },
    {
      id: "Q2",
      text: "Gambar mana yang paling menggambarkan tantangan terbesar yang Anda hadapi saat ini?"
    },
    {
      id: "Q3",
      text: "Gambar mana yang paling menggambarkan hal yang paling Anda hargai?"
    },
    {
      id: "Q4",
      text: "Gambar mana yang paling menggambarkan bagaimana Anda melihat masa depan Anda?"
    },
    {
      id: "Q5",
      text: "Gambar mana yang paling menggambarkan perubahan yang ingin Anda lakukan dalam hidup?"
    }
  ];

  var images = [
    "images/image1.jpg",
    "images/image2.jpg",
    "images/image3.jpg",
    "images/image4.jpg",
    "images/image5.jpg",
    "images/image6.jpg",
    "images/image7.jpg",
    "images/image8.jpg"
  ];

  // Answer interpretations per question, keyed by image number
  var interpretations = {
    Q1: {
      1: "Melihat diri sebagai seseorang yang terhubung dengan teknologi, inovasi, dan berbagai kemungkinan baru.",
      2: "Melihat diri sebagai seseorang yang sedang berkembang, belajar, dan meningkatkan kemampuan.",
      3: "Melihat diri sebagai seseorang yang menghargai hubungan, kerja sama, dan koneksi dengan orang lain.",
      4: "Melihat diri sebagai seseorang yang sedang menghadapi ketidakpastian, pilihan, atau arah yang belum jelas.",
      5: "Melihat diri sebagai seseorang yang sedang mencari keseimbangan, kestabilan, dan keharmonisan.",
      6: "Melihat diri sebagai seseorang yang mandiri, percaya diri, dan menginginkan kebebasan.",
      7: "Melihat diri sebagai seseorang yang sedang mengalami tekanan, ketegangan, atau konflik internal.",
      8: "Melihat diri sebagai seseorang yang sedang mengalami transformasi atau menjadi versi baru dari dirinya."
    },
    Q2: {
      1: "Beradaptasi dengan teknologi, AI, atau perubahan teknologi yang berlangsung cepat.",
      2: "Menjaga pertumbuhan diri dan terus mengembangkan kemampuan.",
      3: "Mengelola hubungan, komunikasi, kerja sama, atau tuntutan sosial.",
      4: "Mengambil keputusan penting ketika menghadapi ketidakpastian tentang masa depan.",
      5: "Menjaga keseimbangan antara berbagai tanggung jawab dan prioritas.",
      6: "Menemukan kemandirian, kebebasan, atau keberanian untuk keluar dari zona nyaman.",
      7: "Menghadapi konflik, tekanan, persaingan, atau tuntutan yang saling bertentangan.",
      8: "Menerima dan mengelola perubahan besar dalam kehidupan pribadi atau profesional."
    },
    Q3: {
      1: "Inovasi, teknologi, pengetahuan, dan kemampuan menciptakan berbagai kemungkinan baru.",
      2: "Pertumbuhan, pembelajaran, pengembangan diri, dan perbaikan berkelanjutan.",
      3: "Hubungan, kolaborasi, rasa memiliki, dan koneksi yang bermakna.",
      4: "Kejelasan, arah, tujuan, dan kemampuan membuat pilihan yang tepat.",
      5: "Keseimbangan, kestabilan, keharmonisan, dan kehidupan yang berkelanjutan.",
      6: "Kebebasan, kemandirian, eksplorasi, dan kemampuan menentukan pilihan sendiri.",
      7: "Kekuatan, ketangguhan, keberanian, dan kemampuan mengatasi kesulitan.",
      8: "Transformasi, pembaruan diri, perkembangan pribadi, dan menjadi versi diri yang lebih baik."
    },
    Q4: {
      1: "Masa depan yang sangat dipengaruhi oleh AI, teknologi, inovasi, dan transformasi digital.",
      2: "Masa depan yang ditandai dengan pembelajaran, pertumbuhan, dan pengembangan diri secara berkelanjutan.",
      3: "Masa depan yang dibangun melalui kolaborasi, hubungan, jaringan, dan komunitas.",
      4: "Masa depan yang masih penuh ketidakpastian dan membutuhkan keputusan serta arah yang jelas.",
      5: "Masa depan yang berfokus pada keseimbangan, kestabilan, kesejahteraan, dan kesuksesan yang berkelanjutan.",
      6: "Masa depan yang memberikan lebih banyak kebebasan, kemandirian, eksplorasi, dan pengalaman baru.",
      7: "Masa depan yang melibatkan tantangan, persaingan, perubahan besar, atau kebutuhan untuk mengatasi berbagai hambatan.",
      8: "Masa depan yang melibatkan transformasi besar, pembaruan diri, dan memasuki tahap kehidupan yang baru."
    },
    Q5: {
      1: "Merangkul teknologi dan menjadi lebih mampu memanfaatkan AI serta berbagai alat digital.",
      2: "Berkembang secara pribadi atau profesional melalui pembelajaran dan peningkatan diri secara berkelanjutan.",
      3: "Membangun hubungan yang lebih kuat, meningkatkan kemampuan berkolaborasi, dan lebih terhubung dengan orang lain.",
      4: "Mendapatkan kejelasan mengenai arah hidup dan membuat keputusan dengan lebih percaya diri.",
      5: "Menciptakan keseimbangan dan keharmonisan yang lebih baik antara pekerjaan, kehidupan pribadi, dan berbagai prioritas lainnya.",
      6: "Menjadi lebih mandiri, berani, percaya diri, dan terbuka terhadap berbagai kemungkinan baru.",
      7: "Mengatasi konflik, tekanan, ketakutan, atau hambatan yang selama ini menghambat perkembangan diri.",
      8: "Melakukan transformasi diri, meninggalkan situasi lama, dan memulai babak kehidupan yang baru."
    }
  };

  var answers = {
    Q1: null,
    Q2: null,
    Q3: null,
    Q4: null,
    Q5: null
  };

  var currentIndex = 0;
  var isAdvancing = false; // prevent double-clicks during auto-advance

  // ---- DOM References ----

  var questionView = document.getElementById("question-view");
  var resultView = document.getElementById("result-view");
  var questionText = document.getElementById("question-text");
  var imageGrid = document.getElementById("image-grid");
  var btnBack = document.getElementById("btn-back");
  var btnRestart = document.getElementById("btn-restart");
  var progressLabel = document.getElementById("progress-label");
  var progressDots = document.getElementById("progress-dots");
  var resultCards = document.getElementById("result-cards");

  // ---- Build Image Grid ----

  function buildGrid() {
    imageGrid.innerHTML = "";
    images.forEach(function (src, i) {
      var imageNumber = i + 1;

      var card = document.createElement("div");
      card.className = "image-card";
      card.setAttribute("role", "radio");
      card.setAttribute("aria-checked", "false");
      card.setAttribute("aria-label", "Gambar " + imageNumber);
      card.setAttribute("tabindex", "0");
      card.dataset.index = imageNumber;

      var img = document.createElement("img");
      img.src = src;
      img.alt = "Gambar " + imageNumber;
      img.loading = "lazy";
      img.width = 800;
      img.height = 800;

      var label = document.createElement("div");
      label.className = "image-label";
      label.textContent = imageNumber;

      // Check indicator (SVG checkmark)
      var check = document.createElement("div");
      check.className = "check-indicator";
      check.setAttribute("aria-hidden", "true");
      check.innerHTML =
        '<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>';

      card.appendChild(check);
      card.appendChild(img);
      card.appendChild(label);

      // Click handler — select and auto-advance
      card.addEventListener("click", function () {
        if (!isAdvancing) {
          selectAndAdvance(imageNumber);
        }
      });

      // Keyboard handler
      card.addEventListener("keydown", function (e) {
        if ((e.key === "Enter" || e.key === " ") && !isAdvancing) {
          e.preventDefault();
          selectAndAdvance(imageNumber);
        }
      });

      imageGrid.appendChild(card);
    });
  }

  // ---- Select Image & Auto-Advance ----

  function selectAndAdvance(imageNumber) {
    var qId = questions[currentIndex].id;
    answers[qId] = imageNumber;

    // Update visual state
    var cards = imageGrid.querySelectorAll(".image-card");
    cards.forEach(function (c) {
      var isSelected = parseInt(c.dataset.index, 10) === imageNumber;
      c.classList.toggle("selected", isSelected);
      c.setAttribute("aria-checked", isSelected ? "true" : "false");
    });

    // Block further clicks during advance
    isAdvancing = true;
    imageGrid.classList.add("advancing");

    // Brief delay to show selection feedback, then advance
    setTimeout(function () {
      isAdvancing = false;
      imageGrid.classList.remove("advancing");

      if (currentIndex < 4) {
        currentIndex++;
        showQuestion();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        showResults();
      }
    }, 400);
  }

  // ---- Update Progress ----

  function updateProgress() {
    var num = currentIndex + 1;
    progressLabel.textContent = "Pertanyaan " + num + " dari 5";
    progressDots.setAttribute("aria-valuenow", num);

    var dots = progressDots.querySelectorAll(".dot");
    dots.forEach(function (dot, i) {
      dot.classList.toggle("filled", i < num);
    });
  }

  // ---- Show Question ----

  function showQuestion() {
    var q = questions[currentIndex];
    questionText.textContent = q.text;

    // Show/hide back button
    btnBack.hidden = currentIndex === 0;

    // Reset selection visual
    var cards = imageGrid.querySelectorAll(".image-card");
    cards.forEach(function (c) {
      c.classList.remove("selected");
      c.setAttribute("aria-checked", "false");
    });

    // Restore previous answer if revisiting
    if (answers[q.id] !== null) {
      var prev = answers[q.id];
      cards.forEach(function (c) {
        if (parseInt(c.dataset.index, 10) === prev) {
          c.classList.add("selected");
          c.setAttribute("aria-checked", "true");
        }
      });
    }

    updateProgress();
  }

  // ---- Show Results ----

  function showResults() {
    questionView.hidden = true;
    resultView.hidden = false;

    // Build result cards
    resultCards.innerHTML = "";

    questions.forEach(function (q) {
      var imgNum = answers[q.id];
      var imgSrc = images[imgNum - 1];
      var interpretation = interpretations[q.id][imgNum];

      // Card
      var card = document.createElement("div");
      card.className = "result-card";

      var textDiv = document.createElement("div");
      textDiv.className = "result-card-text";

      var labelEl = document.createElement("div");
      labelEl.className = "result-card-label";
      labelEl.textContent = q.id;

      var questionEl = document.createElement("p");
      questionEl.className = "result-card-question";
      questionEl.textContent = q.text;

      var answerEl = document.createElement("p");
      answerEl.className = "result-card-answer";
      answerEl.textContent = interpretation;

      textDiv.appendChild(labelEl);
      textDiv.appendChild(questionEl);
      textDiv.appendChild(answerEl);

      var imgEl = document.createElement("img");
      imgEl.className = "result-card-img";
      imgEl.src = imgSrc;
      imgEl.alt = "Gambar " + imgNum;
      imgEl.width = 120;
      imgEl.height = 120;

      card.appendChild(textDiv);
      card.appendChild(imgEl);
      resultCards.appendChild(card);
    });

    // Build narrative summary
    var narrativeEl = document.getElementById("narrative-text");

    function lowerFirst(str) {
      return str.charAt(0).toLowerCase() + str.slice(1);
    }
    function removePeriod(str) {
      return str.replace(/\.$/, "");
    }

    var q1Text = lowerFirst(removePeriod(interpretations.Q1[answers.Q1]));
    var q2Text = lowerFirst(removePeriod(interpretations.Q2[answers.Q2]));
    var q3Text = lowerFirst(removePeriod(interpretations.Q3[answers.Q3]));
    var q4Text = lowerFirst(removePeriod(interpretations.Q4[answers.Q4]));
    var q5Text = lowerFirst(removePeriod(interpretations.Q5[answers.Q5]));

    var narrative =
      "Saat ini, Anda " + q1Text + ". " +
      "Tantangan terbesar yang Anda hadapi adalah " + q2Text + ". " +
      "Hal yang paling Anda hargai adalah " + q3Text + ". " +
      "Anda melihat " + q4Text + ". " +
      "Dan perubahan yang ingin Anda lakukan dalam hidup adalah " + q5Text + ".";

    narrativeEl.textContent = narrative;

    // Log research data to console
    var researchData = {};
    questions.forEach(function (q) {
      researchData[q.id] = answers[q.id];
    });
    console.log("Soularium Results:", researchData);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ---- Go Back ----

  function goBack() {
    if (currentIndex > 0) {
      currentIndex--;
      showQuestion();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  // ---- Restart ----

  function restart() {
    currentIndex = 0;
    questions.forEach(function (q) {
      answers[q.id] = null;
    });

    resultView.hidden = true;
    questionView.hidden = false;
    showQuestion();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ---- Event Listeners ----

  btnBack.addEventListener("click", goBack);
  btnRestart.addEventListener("click", restart);

  // ---- Init ----

  buildGrid();
  showQuestion();
})();
