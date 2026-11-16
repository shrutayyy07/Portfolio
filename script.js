(function () {
  var D = document, R = D.documentElement, JS = R.classList.contains("js");
  var CV_NAME = "Shruti_Samal_CV.pdf", CV_URL = "assets/Shruti_Samal_CV.pdf";
  var GM = "https://mail.google.com/mail/?view=cm&fs=1&to=shruti.samal07@gmail.com";
  var LINKS = [["GitHub","https://github.com/shrutayyy07",true],["LinkedIn","https://www.linkedin.com/in/shruti-samal-334aa5318/",true],["Email",GM,false]];

  /* buttons */
  D.querySelectorAll("[data-links]").forEach(function (box) {
    var short = box.getAttribute("data-links") === "short";
    if (!short) { var c = D.createElement("a"); c.className = "btn pri mag"; c.href = CV_URL; c.setAttribute("download", CV_NAME); c.innerHTML = 'View CV <span class="ar">↓</span>'; box.appendChild(c); }
    LINKS.forEach(function (l) {
      if (short && l[0] === "Email") return;
      var a = D.createElement("a"); a.className = "btn mag"; a.textContent = l[0]; a.href = l[1]; a.target = "_blank"; a.rel = "noopener";
      if (l[2]) { var s = D.createElement("span"); s.className = "ar"; s.textContent = "↗"; a.appendChild(D.createTextNode(" ")); a.appendChild(s); }
      box.appendChild(a);
    });
  });

  D.addEventListener("click", function (e) {
    var rb = e.target.closest(".rm");
    if (rb) {
      var o = rb.closest(".item").classList.toggle("open");
      rb.setAttribute("aria-expanded", o ? "true" : "false"); rb.firstChild.nodeValue = o ? "Show less " : "Read more ";
    }
  });

  /* mobile menu */
  var nv = D.querySelector(".nav"), bg = nv.querySelector(".burger");
  function closeMenu() { nv.classList.remove("open"); bg.setAttribute("aria-expanded", "false"); }
  bg.addEventListener("click", function () { var o = nv.classList.toggle("open"); bg.setAttribute("aria-expanded", o ? "true" : "false"); });
  nv.querySelectorAll(".nl a").forEach(function (a) { a.addEventListener("click", closeMenu); });
  D.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
  D.addEventListener("click", function (e) { if (!e.target.closest(".nav")) closeMenu(); });

  /* split letters */
  D.querySelectorAll("[data-split]").forEach(function (el) {
    var txt = el.getAttribute("data-split"); el.setAttribute("aria-label", txt);
    Array.from(txt).forEach(function (ch, i) {
      var s = D.createElement("span"); s.className = "ch"; s.setAttribute("aria-hidden", "true");
      s.style.setProperty("--i", i); s.textContent = ch === " " ? "\u00A0" : ch; el.appendChild(s);
    });
  });
  D.querySelectorAll(".chip").forEach(function (c) { c.style.setProperty("--r", (Math.random() * 10 - 5).toFixed(1) + "deg"); });

  /* marquees: duplicate for a seamless loop */
  if (JS) D.querySelectorAll("[data-mq]").forEach(function (t) { t.innerHTML += t.innerHTML; });

  if (!JS) return;

  /* reveal */
  var rvs = [];
  D.querySelectorAll(".item").forEach(function (it, n) {
    var a = it.children[0], b = it.children[1];
    a.classList.add("rv"); b.classList.add("rv");
    a.style.setProperty("--tx", "-44px"); a.style.setProperty("--ty", "0px");
    b.style.setProperty("--tx", "44px"); b.style.setProperty("--ty", "0px"); b.style.setProperty("--dl2", ".12s");
    a.__p = it; b.__p = it;
  });
  D.querySelectorAll(".tickets li").forEach(function (li, i) { li.style.setProperty("--dl2", (i % 3) * 0.12 + "s"); li.style.setProperty("--sc", ".9"); });
  D.querySelectorAll(".chips").forEach(function (box) { Array.from(box.children).forEach(function (c, i) { c.style.setProperty("--i", i); }); });
  var targets = D.querySelectorAll(".rv,.item,[data-split],.chips");
  if (!("IntersectionObserver" in window)) { targets.forEach(function (e) { e.classList.add("in"); }); }
  else {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    targets.forEach(function (e) { io.observe(e); });
  }

  /* nav pill + scroll spy */
  var nav = D.querySelector(".nav"), pill = nav.querySelector(".pill"), links = Array.from(nav.querySelectorAll("a[data-s]")), cur = links[0];
  function movePill(a) { if (!a) return; pill.style.left = a.offsetLeft + "px"; pill.style.width = a.offsetWidth + "px"; }
  links.forEach(function (a) { a.addEventListener("mouseenter", function () { movePill(a); }); });
  nav.addEventListener("mouseleave", function () { movePill(cur); });
  var secs = links.map(function (a) { return D.getElementById(a.getAttribute("data-s")); });
  function spy() {
    var y = innerHeight * 0.4, best = 0;
    secs.forEach(function (s, i) { if (s && s.getBoundingClientRect().top <= y) best = i; });
    if (links[best] !== cur) { cur = links[best]; movePill(cur); links.forEach(function (l) { l.classList.toggle("act", l === cur); }); }
  }
  setTimeout(function () { movePill(cur); }, 300); cur.classList.add("act");

  /* scroll effects */
  var fls = Array.from(D.querySelectorAll(".fl")), mx = 0, my = 0, tx = 0, ty = 0, lastY = scrollY, sk = 0, list = D.getElementById("list");
  var bar = D.querySelector(".bar"), marqs = Array.from(D.querySelectorAll(".marq"));
  function frame() {
    var sy = scrollY, v = sy - lastY; lastY = sy;
    sk += (Math.max(-9, Math.min(9, v * 0.35)) - sk) * 0.12;
    marqs.forEach(function (m) { m.style.setProperty("--sk", (-sk).toFixed(2) + "deg"); });
    bar.style.setProperty("--sp", (sy / Math.max(1, D.body.scrollHeight - innerHeight)).toFixed(4));
    tx += (mx - tx) * 0.08; ty += (my - ty) * 0.08;
    fls.forEach(function (f) {
      var k = parseFloat(f.getAttribute("data-k")), r = f.parentNode.getBoundingClientRect(), mid = r.top + r.height / 2 - innerHeight / 2;
      f.style.transform = "translate3d(" + (tx * k).toFixed(1) + "px," + (ty * k + mid * k * -0.007).toFixed(1) + "px,0)";
    });
    if (list) { var lr = list.getBoundingClientRect(); list.style.setProperty("--tp", Math.max(0, Math.min(1, (innerHeight * 0.65 - lr.top) / lr.height)).toFixed(3)); }
    spy();
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  /* pointer effects: parallax, tilt, magnetic buttons, cursor */
  var fine = matchMedia("(pointer: fine)").matches;
  if (!fine) return;
  var polar = D.querySelector(".polaroid"), col = D.getElementById("collage"), cursor = D.querySelector(".cur"), cl = cursor.querySelector("span");
  var cx = 0, cy = 0, px = 0, py = 0, shown = false;
  addEventListener("mousemove", function (e) {
    mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5;
    cx = e.clientX; cy = e.clientY;
    if (!shown) { shown = true; cursor.classList.add("on"); px = cx; py = cy; }
    var m = e.target.closest(".mag");
    D.querySelectorAll(".mag").forEach(function (b) {
      var r = b.getBoundingClientRect(), dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      if (Math.hypot(dx, dy) < 120) { b.style.setProperty("--mx", (dx * 0.22).toFixed(1) + "px"); b.style.setProperty("--my", (dy * 0.3).toFixed(1) + "px"); }
      else { b.style.setProperty("--mx", "0px"); b.style.setProperty("--my", "0px"); }
    });
    var cr = col.getBoundingClientRect();
    if (e.clientX > cr.left && e.clientX < cr.right && e.clientY > cr.top && e.clientY < cr.bottom) {
      polar.style.setProperty("--ry", (((e.clientX - cr.left) / cr.width - 0.5) * 14).toFixed(1) + "deg");
      polar.style.setProperty("--rx", ((0.5 - (e.clientY - cr.top) / cr.height) * 12).toFixed(1) + "deg");
    } else { polar.style.setProperty("--ry", "0deg"); polar.style.setProperty("--rx", "0deg"); }
    var t = e.target.closest("[data-cur]");
    if (t) { cl.textContent = t.getAttribute("data-cur"); cursor.classList.add("big"); } else { cursor.classList.remove("big"); }
  });
  D.addEventListener("mouseleave", function () { cursor.classList.remove("on"); shown = false; });
  (function follow() { px += (cx - px) * 0.2; py += (cy - py) * 0.2; cursor.style.transform = "translate3d(" + px.toFixed(1) + "px," + py.toFixed(1) + "px,0)"; requestAnimationFrame(follow); })();
})();
