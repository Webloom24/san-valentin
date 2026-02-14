// Ocultar el botón cuadrado personalizado al cargar
var navBtn = document.getElementById("custom-nav-btn");
if (navBtn) navBtn.style.display = "none";
window.addEventListener("DOMContentLoaded", function () {
  // Mostrar el mensaje al hacer clic en el botón 'Presioname'
  var startBtn = document.getElementById("start-btn");
  var flowerMsg = document.querySelector(".flower-message");
  if (startBtn && flowerMsg) {
    startBtn.addEventListener("click", function () {
      flowerMsg.hidden = false;
      flowerMsg.style.opacity = 1;
    });
  }
  // Botón para saltar al mensaje final
  // Eliminar el botón para saltar al mensaje final
  // const skipBtn = document.getElementById("skip-to-final");
  // if (skipBtn) {
  //   skipBtn.addEventListener("click", function () {
  //     // Ocultar el botón
  //     skipBtn.style.display = "none";
  //     // Saltar directamente al mensaje final
  //     if (typeof showFinalValentineMessage === "function") {
  //       showFinalValentineMessage();
  //     } else {
  //       // fallback: simular el final
  //       if (window.msg) {
  //         window.msg.innerHTML = `<span class='final-valentine-message'><span class='final-heart'>❤️</span><br>Te amo,<br>feliz<br>San Valentín<br><span class='final-heart'>❤️</span></span>`;
  //         window.msg.style.opacity = 1;
  //       }
  //     }
  //   });
  // }

  // Exponer función para mostrar el mensaje final
  // window.showFinalValentineMessage = function() {
  //   if (!window.msg) window.msg = document.querySelector('.flower-message');
  //   if (!window.msg) return;
  //   window.msg.style.display = '';
  //   window.msg.style.opacity = 0;
  //   setTimeout(() => {
  //     window.msg.innerHTML = `<span class='final-valentine-message'><span class='final-heart'>❤️</span><br>Te amo,<br>feliz<br>San Valentín<br><span class='final-heart'>❤️</span></span>`;
  //     window.msg.style.opacity = 1;
  //     setTimeout(() => {
  //       window.msg.style.transition = 'opacity 4.5s cubic-bezier(0.4,0,0.2,1)';
  //       window.msg.style.opacity = 0;
  //       const music = document.getElementById('bg-music');
  //       if (music) {
  //         let fadeAudio = setInterval(() => {
  //           if (music.volume > 0.01) {
  //             music.volume = Math.max(0, music.volume - 0.01);
  //           } else {
  //             music.volume = 0;
  //             clearInterval(fadeAudio);
  //           }
  //         }, 180);
  //       }
  //       let blackBg = document.createElement('div');
  //       blackBg.id = 'final-black-bg';
  //       blackBg.style.position = 'fixed';
  //       blackBg.style.top = 0;
  //       blackBg.style.left = 0;
  //       blackBg.style.width = '100vw';
  //       blackBg.style.height = '100vh';
  //       blackBg.style.background = '#000';
  //       blackBg.style.opacity = 0;
  //       blackBg.style.zIndex = 9999;
  //       blackBg.style.transition = 'opacity 4.5s cubic-bezier(0.4,0,0.2,1)';
  //       document.body.appendChild(blackBg);
  //       setTimeout(() => {
  //         blackBg.style.opacity = 1;
  //       }, 2200);
  //     }, 10000);
  //   }, 400);
  // }
  // Partículas flotando (corazones) solo al presionar el botón
  function startParticles() {
    const particlesCanvas = document.getElementById("particles-canvas");
    if (particlesCanvas) {
      particlesCanvas.width = window.innerWidth;
      particlesCanvas.height = window.innerHeight;
      const ctx = particlesCanvas.getContext("2d");
      const particles = [];
      function randomColor() {
        const colors = ["#ff4f8b", "#ffb6d5", "#ff7eb9", "#ff65a3"];
        return colors[Math.floor(Math.random() * colors.length)];
      }
      function createHeartParticle() {
        const size = 18 + Math.random() * 18;
        return {
          x: Math.random() * particlesCanvas.width,
          y: particlesCanvas.height + size,
          size,
          speed: 0.5 + Math.random() * 1.2,
          drift: (Math.random() - 0.5) * 0.7,
          alpha: 0.7 + Math.random() * 0.3,
          color: randomColor(),
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
        };
      }
      function drawHeart(ctx, x, y, size, color, alpha, rotation) {
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(0, -size / 2, size, -size / 2, size, 0);
        ctx.bezierCurveTo(size, size / 1.5, 0, size, 0, size * 1.2);
        ctx.bezierCurveTo(0, size, -size, size / 1.5, -size, 0);
        ctx.bezierCurveTo(-size, -size / 2, 0, -size / 2, 0, 0);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }
      function animateParticles() {
        ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.y -= p.speed;
          p.x += p.drift;
          p.rotation += p.rotationSpeed;
          drawHeart(ctx, p.x, p.y, p.size, p.color, p.alpha, p.rotation);
        }
        // Eliminar partículas fuera de pantalla
        for (let i = particles.length - 1; i >= 0; i--) {
          if (
            particles[i].y < -40 ||
            particles[i].x < -40 ||
            particles[i].x > particlesCanvas.width + 40
          ) {
            particles.splice(i, 1);
          }
        }
        // Añadir nuevas partículas
        if (particles.length < 22) {
          particles.push(createHeartParticle());
        }
        requestAnimationFrame(animateParticles);
      }
      animateParticles();
      window.addEventListener("resize", () => {
        particlesCanvas.width = window.innerWidth;
        particlesCanvas.height = window.innerHeight;
      });
    }
  }
  var doc = document,
    flower = doc.querySelector(".flower"),
    petalPartMarkup = '<div class="box"><div class="shape"></div></div>',
    maxParts = 20,
    maxPetals = 6,
    partsFontStep = 25 / maxParts;
  createFlower();
  function createFlower() {
    var angle = 360 / maxPetals;
    for (var i = 0; i < maxPetals; i++) {
      var petal = createPetal(),
        currAngle = angle * i + "deg",
        transform =
          "transform: rotateY(" +
          currAngle +
          ") rotateX(-30deg) translateZ(9vmin)";
      petal.setAttribute("style", transform);
      flower.appendChild(petal);
    }
  }
  function createPetal() {
    var box = createBox(null, 0),
      petal = doc.createElement("div");
    petal.classList.add("petal");
    for (var i = 1; i <= maxParts; i++) {
      box = createBox(box, i);
    }
    petal.appendChild(box);
    return petal;
  }
  function createBox(box, pos) {
    var fontSize = partsFontStep * (maxParts - pos) + "vmin",
      half = maxParts / 2,
      bright = "50";
    if (pos < half + 1) {
      fontSize = partsFontStep * pos + "vmin";
    } else {
      bright = 10 + (40 / half) * (maxParts - pos);
    }
    var baseHue = 320,
      hueVariation = 30,
      saturation = 70 + (20 * pos) / maxParts,
      color =
        "hsl(" +
        (baseHue + (hueVariation * pos) / maxParts) +
        ", " +
        saturation +
        "%, " +
        bright +
        "%)",
      newShape = doc.createElement("div");
    newShape.classList.add("shape");
    var newBox = doc.createElement("div");
    newBox.classList.add("box");
    newBox.setAttribute("style", "color: " + color + ";font-size: " + fontSize);
    if (box) newBox.appendChild(box);
    newBox.appendChild(newShape);
    return newBox;
  }
  function drawGalaxy() {
    var canvas = document.getElementById("galaxy-canvas");
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);
    var stars = [],
      numStars = 120;
    for (var i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.7,
        dy: (Math.random() - 0.5) * 0.7,
        alpha: Math.random() * 0.5 + 0.5,
      });
    }
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,182,193,0.9)";
        ctx.shadowColor = "#ffb6d5";
        ctx.shadowBlur = 2;
        ctx.fill();
        ctx.restore();
        s.x += s.dx;
        s.y += s.dy;
        if (s.x < 0 || s.x > canvas.width) s.dx *= -1;
        if (s.y < 0 || s.y > canvas.height) s.dy *= -1;
      }
      requestAnimationFrame(animate);
    }
    animate();
  }
  document.addEventListener("DOMContentLoaded", drawGalaxy);
  var mainContent = document.getElementById("main-content");
  if (mainContent) mainContent.style.display = "";
  // Efecto typing en el botón al inicio
  var startBtn = document.getElementById("start-btn");
  var btnText = "Presioname";
  startBtn.textContent = "";
  startBtn.disabled = true;
  let iBtn = 0;

  function typeBtn() {
    if (iBtn < btnText.length) {
      startBtn.textContent += btnText.charAt(iBtn);
      iBtn++;
      setTimeout(typeBtn, 90);
    } else {
      startBtn.disabled = false;
    }
  }
  typeBtn();

  // Followers - Cambiar mensajes
  const messages = [
    "Para mi morena hermosa:\n",
    "Han sido casi tres años increíbles a tu lado, y aun así siento que cada día descubro algo nuevo en ti.",
    "Contigo aprendí que la felicidad está en los pequeños momentos, en las miradas, en las risas espontáneas y en todo lo que compartimos sin darnos cuenta.",
    "Cada recuerdo a tu lado tiene un pedacito de tu sonrisa y un latido de mi corazón.",
    "Gracias por caminar conmigo, por apoyarme, por ser refugio en los días difíciles y celebración en los días felices.",
    "Eres mi calma, mi emoción y mi lugar seguro.",
    "Te amo más de lo que las palabras pueden explicar, más de lo que cualquier detalle puede demostrar.",
    "Elegirte cada día es mi mayor certeza.",
    "Eres, sin duda, la historia más bonita que estoy viviendo y mi mejor aventura. ❤️",
  ];

  var wrapper = document.querySelector(".wrapper");
  var msg = document.querySelector(".flower-message");
  // Definir isMobile en scope global
  var isMobile = window.innerWidth <= 600;
  // Asegura que el mensaje sea visible y esté por encima de otros elementos
  if (msg) {
    msg.style.display = "";
    msg.style.opacity = 1;
    msg.style.zIndex = 1000;
  }

  // Centra el contenedor con JS
  var container = document.getElementById("start-btn-container");
  container.style.position = "fixed";
  container.style.top = "50%";
  container.style.left = "50%";
  container.style.transform = "translate(-50%,-50%)";
  container.style.zIndex = "100";

  startBtn.addEventListener("click", function () {
    // Iniciar partículas flotando
    startParticles();
    // Detect mobile (screen width <= 600px)
    var isMobile = window.innerWidth <= 600;
    // Eliminado loader móvil
    container.style.display = "none";
    wrapper.style.display = "";
    // Mostrar mensaje SIEMPRE
    msg.style.display = "block";
    msg.style.opacity = 1;
    msg.style.zIndex = 1000;
    // Reproducir música
    var music = document.getElementById("bg-music");
    if (music) {
      music.currentTime = 0;
      var playPromise = music.play();
      if (playPromise !== undefined) {
        playPromise.catch(function (error) {
          alert(
            "No se pudo reproducir la música. Verifica el archivo o permisos del navegador.",
          );
        });
      }
    }
    // Mostrar el primer mensaje inmediatamente
    let current = 0;
    function typeText(text, cb) {
      msg.textContent = "";
      let i = 0;
      function type() {
        if (i < text.length) {
          msg.textContent += text.charAt(i);
          i++;
          setTimeout(type, 90);
        } else if (cb) {
          setTimeout(cb, 1000);
        }
      }
      type();
    }
    function showNext() {
      if (current < messages.length) {
        typeText(messages[current], function () {
          current++;
          showNext();
        });
      } else {
        msg.innerHTML = `
          <span class="final-valentine-message">
            <span class="final-heart">💗</span><br>
            Te amo,<br>feliz<br>San Valentín<br>
            <span class="final-heart">💗</span>
          </span>
        `;
        msg.style.transition = "opacity 1.5s cubic-bezier(0.4,0,0.2,1)";
        msg.style.opacity = 0;
        setTimeout(() => {
          msg.style.opacity = 1;
        }, 100);
        // Efecto de desvanecido final más fluido y escalonado
        setTimeout(() => {
          const fadeDuration = 6000;
          // Mensaje se desvanece primero
          msg.style.transition = `opacity ${fadeDuration}ms cubic-bezier(0.4,0,0.2,1)`;
          msg.style.opacity = 0;
          // Música se desvanece suavemente
          const music = document.getElementById("bg-music");
          if (music) {
            let fadeAudio = setInterval(() => {
              if (music.volume > 0.01) {
                music.volume = Math.max(0, music.volume - 0.01);
              } else {
                music.volume = 0;
                clearInterval(fadeAudio);
              }
            }, 100);
          }
          // Flor, galaxia y corazones se desvanecen escalonadamente
          const wrapper = document.querySelector(".wrapper");
          const galaxy = document.getElementById("galaxy-canvas");
          const particles = document.getElementById("particles-canvas");
          setTimeout(() => {
            [wrapper, galaxy, particles].forEach((el) => {
              if (el) {
                el.style.transition = `opacity ${fadeDuration}ms cubic-bezier(0.4,0,0.2,1)`;
                el.style.opacity = 0;
                // Mantener la perspectiva y animación de la flor
                if (el.classList && el.classList.contains("wrapper")) {
                  el.style.transform = "rotateX(-45deg)";
                  el.style.transformStyle = "preserve-3d";
                  el.style.animation = window.getComputedStyle(el).animation;
                }
              }
            });
          }, 1200);
          // Fondo negro elegante aparece al final
          let blackBg = document.createElement("div");
          blackBg.id = "final-black-bg";
          blackBg.style.position = "fixed";
          blackBg.style.top = 0;
          blackBg.style.left = 0;
          blackBg.style.width = "100vw";
          blackBg.style.height = "100vh";
          blackBg.style.background = "#000";
          blackBg.style.opacity = 0;
          blackBg.style.zIndex = 9999;
          blackBg.style.transition = `opacity ${fadeDuration}ms cubic-bezier(0.4,0,0.2,1)`;
          document.body.appendChild(blackBg);
          setTimeout(() => {
            blackBg.style.opacity = 1;
          }, fadeDuration);
        }, 10000); // Espera 10s antes de desvanecer todo
      }
    }
    showNext();
  });
});
