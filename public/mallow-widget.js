/* Mallow: character-only widget, bottom-left.
   Click her -> "Hii!" | click Home -> "Hii!" | click Contact -> "Reach out to us"
   Hides after 5s without interaction with her. Needs no framework.
   <script src="/mallow-widget.js" data-contact="/contact" defer></script> */
(function () {
  if (window.__mallow) return;
  window.__mallow = 1;
  var CS = document.currentScript,
    IDLE = 5000;
  var CONTACT =
    window.MALLOW_CONTACT || (CS && CS.dataset.contact) || "/contact";

  function boot() {
    var T = window.THREE,
      rm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    var host = document.createElement("div");
    host.style.cssText =
      "position:fixed;left:max(16px,env(safe-area-inset-left,0px));bottom:max(16px,env(safe-area-inset-bottom,0px));z-index:2147483000";
    var sr = host.attachShadow({ mode: "open" });
    sr.innerHTML =
      "<style>:host{display:block}" +
      ".w{--s:150px;position:relative;width:var(--s);transform:translateX(-160%);opacity:0;visibility:hidden;transition:transform .45s cubic-bezier(.3,.7,.3,1),opacity .3s,visibility 0s .45s}" +
      ".w.on{transform:none;opacity:1;visibility:visible;transition:transform .45s cubic-bezier(.3,.7,.3,1),opacity .3s}" +
      ".c{display:block;width:var(--s);height:var(--s);padding:0;margin:0;border:0;background:none;cursor:pointer}" +
      "canvas{display:block;width:100%;height:100%}" +
      ".b{position:absolute;left:8px;bottom:calc(100% - 4px);font-family:inherit;font-weight:500;font-size:14px;line-height:1.2;letter-spacing:-.01em;background:var(--ink);color:var(--on);padding:9px 16px;border-radius:999px;text-decoration:none;white-space:nowrap;opacity:0;transform:translateY(6px);transition:opacity .2s,transform .2s;pointer-events:none}" +
      ".b.s{opacity:1;transform:none}.b.s[href]{pointer-events:auto}" +
      '.b:after{content:"";position:absolute;left:22px;top:100%;border:6px solid transparent;border-top-color:var(--ink);border-bottom:0}' +
      ".c:focus-visible,.b:focus-visible{outline:2px solid var(--ink);outline-offset:3px}" +
      "@media (max-width:600px){.w{--s:120px}}" +
      "@media (prefers-reduced-motion:reduce){.w,.w.on,.b{transition:none}}</style>" +
      '<div class="w"><a class="b" aria-live="polite"></a>' +
      '<button class="c" aria-label="Mallow. Press to say hi."><canvas></canvas></button></div>';
    document.body.appendChild(host);
    /* bubble takes the site's own look: text colour as fill, page colour as text, site font, pill shape */
    function clear(c) {
      return !c || c === "transparent" || /^rgba\(.*,\s*0\)$/.test(c);
    }
    var cs = getComputedStyle(document.body),
      pbg = cs.backgroundColor;
    if (clear(pbg))
      pbg = getComputedStyle(document.documentElement).backgroundColor;
    if (clear(pbg)) pbg = "#fff";
    host.style.setProperty("--ink", (CS && CS.dataset.bubbleBg) || cs.color);
    host.style.setProperty("--on", (CS && CS.dataset.bubbleText) || pbg);
    host.style.fontFamily = cs.fontFamily;
    var w = sr.querySelector(".w"),
      bub = sr.querySelector(".b"),
      btn = sr.querySelector(".c"),
      cv = sr.querySelector("canvas");

    var R = new T.WebGLRenderer({ canvas: cv, antialias: true, alpha: true });
    R.setPixelRatio(Math.min(devicePixelRatio, 2));
    R.setClearColor(0, 0);
    var S = new T.Scene(),
      cam = new T.PerspectiveCamera(32, 1, 0.1, 60);
    cam.position.set(0, 1.9, 6.4);
    cam.lookAt(0, 0.85, 0);
    S.add(new T.HemisphereLight(0xffffff, 0xf3c6cf, 0.95));
    var dl = new T.DirectionalLight(0xffffff, 0.7);
    dl.position.set(3, 6, 5);
    S.add(dl);
    function M(c) {
      return new T.MeshStandardMaterial({ color: c, roughness: 0.7 });
    }
    var BR = new T.MeshBasicMaterial({ color: 0x3b1a1a, side: T.BackSide });
    function ol(m, s) {
      var o = new T.Mesh(m.geometry, BR);
      o.scale.setScalar(s);
      m.add(o);
      return m;
    }
    function rbox(w, h, d, r, n) {
      var g = new T.BoxGeometry(w, h, d, n, n, n),
        p = g.attributes.position,
        v = new T.Vector3(),
        c = new T.Vector3(),
        hx = w / 2 - r,
        hy = h / 2 - r,
        hz = d / 2 - r,
        k = function (a, b) {
          return Math.max(-b, Math.min(b, a));
        };
      for (var i = 0; i < p.count; i++) {
        v.fromBufferAttribute(p, i);
        c.set(k(v.x, hx), k(v.y, hy), k(v.z, hz));
        v.sub(c).normalize().multiplyScalar(r).add(c);
        p.setXYZ(i, v.x, v.y, v.z);
      }
      g.computeVertexNormals();
      return g;
    }

    var ch = new T.Group();
    S.add(ch);
    var sc = document.createElement("canvas");
    sc.width = sc.height = 64;
    var sg = sc.getContext("2d"),
      gr = sg.createRadialGradient(32, 32, 2, 32, 32, 32);
    gr.addColorStop(0, "rgba(227,154,169,.7)");
    gr.addColorStop(1, "rgba(227,154,169,0)");
    sg.fillStyle = gr;
    sg.fillRect(0, 0, 64, 64);
    var sh = new T.Mesh(
      new T.PlaneGeometry(2.8, 2.8),
      new T.MeshBasicMaterial({
        map: new T.CanvasTexture(sc),
        transparent: true,
        depthWrite: false,
      }),
    );
    sh.rotation.x = -Math.PI / 2;
    sh.position.y = 0.01;
    S.add(sh);
    var body = new T.Group();
    body.position.y = 0.85;
    ch.add(body);
    body.add(ol(new T.Mesh(rbox(2.1, 1.7, 1.9, 0.5, 16), M(0xfff1ea)), 1.035));
    var dk = M(0x3b1a1a);
    function eye(x) {
      var e = new T.Group(),
        a = new T.Mesh(new T.SphereGeometry(0.16, 20, 16), dk);
      a.scale.z = 0.5;
      e.add(a);
      var h = new T.Mesh(
        new T.SphereGeometry(0.055, 12, 10),
        new T.MeshBasicMaterial({ color: 0xffffff }),
      );
      h.position.set(0.04, 0.06, 0.07);
      e.add(h);
      e.position.set(x, -0.02, 0.95);
      body.add(e);
      return e;
    }
    var eL = eye(-0.45),
      eR = eye(0.45);
    [-0.64, 0.64].forEach(function (x) {
      var b = new T.Mesh(
        new T.CircleGeometry(0.17, 20),
        new T.MeshBasicMaterial({
          color: 0xf79aa6,
          transparent: true,
          opacity: 0.55,
        }),
      );
      b.position.set(x, -0.24, 0.935);
      b.rotation.y = x * 0.15;
      body.add(b);
    });
    var mo = new T.Mesh(new T.TorusGeometry(0.1, 0.022, 8, 16, Math.PI), dk);
    mo.rotation.z = Math.PI;
    mo.position.set(0, -0.12, 0.955);
    body.add(mo);
    var bow = new T.Group(),
      pk = M(0xf58fa3);
    [-1, 1].forEach(function (s) {
      var m = ol(new T.Mesh(new T.SphereGeometry(0.22, 16, 12), pk), 1.12);
      m.scale.set(1.2, 0.8, 0.5);
      m.position.x = s * 0.22;
      m.rotation.z = s * 0.35;
      bow.add(m);
    });
    bow.add(ol(new T.Mesh(new T.SphereGeometry(0.1, 12, 10), pk), 1.2));
    bow.position.set(0.62, 0.8, 0.35);
    bow.rotation.set(-0.3, 0, -0.4);
    body.add(bow);
    var armP = new T.Group(),
      arm = ol(
        new T.Mesh(new T.SphereGeometry(0.2, 16, 12), M(0xfff1ea)),
        1.12,
      );
    arm.scale.set(1, 1.8, 1);
    arm.position.y = -0.3;
    armP.add(arm);
    armP.position.set(1.0, 0, 0.1);
    armP.rotation.z = 0.12;
    body.add(armP);

    /* state: mode 0 = idle, 1 = hi, 2 = reach out */
    var mode = 0,
      on = false,
      timer,
      hop = 0,
      mx = 0,
      running = false,
      raf,
      t = 0,
      clk = new T.Clock();
    function say(m) {
      mode = m;
      hop = 1;
      if (!m) {
        bub.classList.remove("s");
        return;
      }
      bub.textContent = m === 1 ? "Hii!" : "Reach out to us →";
      if (m === 2) bub.setAttribute("href", CONTACT);
      else bub.removeAttribute("href");
      bub.classList.add("s");
    }
    function arm_() {
      clearTimeout(timer);
      timer = setTimeout(hide, IDLE);
    }
    function show(m) {
      on = true;
      w.classList.add("on");
      say(m);
      arm_();
      start();
    }
    function hide() {
      on = false;
      clearTimeout(timer);
      w.classList.remove("on");
      bub.classList.remove("s");
      mode = 0;
      setTimeout(function () {
        if (!on) stop();
      }, 700);
    }
    btn.addEventListener("click", function () {
      show(1);
    });
    ["pointermove", "focusin"].forEach(function (ev) {
      w.addEventListener(ev, function () {
        if (on) arm_();
      });
    });
    addEventListener("pointermove", function (e) {
      mx = (e.clientX / innerWidth) * 2 - 1;
    });

    /* site triggers: Home and Contact links (clicks and route changes) */
    function kind(el) {
      var a = el.closest && el.closest("a,[data-mallow]");
      if (!a) return 0;
      var d = a.getAttribute("data-mallow");
      if (d === "home") return 1;
      if (d === "contact") return 2;
      var tx = (a.textContent || "").trim().toLowerCase();
      var same = a.origin === location.origin,
        p = same ? a.pathname.replace(/\/+$/, "") : "";
      if (
        tx === "contact" ||
        tx === "contact us" ||
        (same && (/contact/i.test(p) || /^#contact/i.test(a.hash)))
      )
        return 2;
      if (
        tx === "home" ||
        (same && ((p === "" && !a.hash) || p === "/home" || a.hash === "#home"))
      )
        return 1;
      return 0;
    }
    document.addEventListener(
      "click",
      function (e) {
        var k = kind(e.target);
        if (k) show(k);
      },
      true,
    );
    function route() {
      var p = location.pathname.replace(/\/+$/, "") || "/";
      if (/contact/i.test(p) || /^#contact/i.test(location.hash)) show(2);
      else if (p === "/" || p === "/home") show(1);
    }
    var last = location.href;
    function nav() {
      if (location.href !== last) {
        last = location.href;
        route();
      }
    }
    ["pushState", "replaceState"].forEach(function (k) {
      var o = history[k];
      history[k] = function () {
        var r = o.apply(this, arguments);
        setTimeout(nav, 0);
        return r;
      };
    });
    addEventListener("popstate", nav);
    addEventListener("hashchange", nav);
    window.Mallow = {
      show: function (m) {
        show(m === "reach" || m === 2 ? 2 : 1);
      },
      hide: hide,
    };

    function size() {
      var s = btn.clientWidth;
      R.setSize(s, s, false);
    }
    addEventListener("resize", size);
    size();

    function frame() {
      var dt = Math.min(clk.getDelta(), 0.05),
        q = rm ? 0 : 1;
      t += dt;
      var hi = mode === 1,
        re = mode === 2;
      hop = Math.max(0, hop - dt * 0.8);
      var y =
        (Math.abs(Math.sin(t * 7)) * 0.45 * hop +
          Math.abs(Math.sin(t * 2.2)) * 0.03) *
        q;
      ch.position.y = y;
      sh.scale.setScalar(1 - y * 0.4);
      var sq = 1 + Math.sin(t * 6) * 0.03 * q * (hi || re ? 1 : 0.3);
      body.scale.set(1 / Math.sqrt(sq), sq, 1 / Math.sqrt(sq));
      ch.rotation.y = mx * 0.35;
      ch.rotation.x = re ? -0.12 : 0;
      var at = hi
        ? 2.3 + Math.sin(t * 9) * 0.45 * q
        : re
          ? 1.55 + Math.sin(t * 3) * 0.08 * q
          : 0.12;
      armP.rotation.z += (at - armP.rotation.z) * Math.min(1, dt * 10);
      var bl = t % 3.2 < 0.12 ? 0.1 : 1;
      eL.scale.y = bl;
      eR.scale.y +=
        (Math.min(bl, re ? 0.1 : 1) - eR.scale.y) * Math.min(1, dt * 20);
      mo.scale.x = 1 + (re ? 0.5 : hi ? 0.3 : 0);
      bow.rotation.z = -0.4 + Math.sin(t * 5) * 0.08 * q;
      R.render(S, cam);
    }
    function start() {
      if (running) return;
      running = true;
      clk.getDelta();
      (function loop() {
        if (!running) return;
        raf = requestAnimationFrame(loop);
        frame();
      })();
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    var p0 = location.pathname;
    show(/contact/i.test(p0) ? 2 : 0);
  }

  if (window.THREE) boot();
  else {
    var s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    s.onload = boot;
    document.head.appendChild(s);
  }
})();
