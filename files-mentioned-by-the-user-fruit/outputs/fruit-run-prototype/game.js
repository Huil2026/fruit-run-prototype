(() => {
  "use strict";

  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;
  const WORLD_W = 3800;
  const GROUND_Y = 474;
  const WIN_MANGOES = 10;

  const playerSprite = {
    image: new Image(),
    preparedFrames: null,
    ready: false,
    maxFrameSize: 280,
    frames: {
      idle: [
        { x: 190, y: 36, w: 178, h: 346 },
        { x: 500, y: 48, w: 168, h: 332 },
        { x: 815, y: 36, w: 178, h: 346 },
        { x: 1110, y: 48, w: 170, h: 332 }
      ],
      run: [
        { x: 150, y: 416, w: 232, h: 306 },
        { x: 454, y: 428, w: 238, h: 294 },
        { x: 778, y: 418, w: 230, h: 306 },
        { x: 1098, y: 418, w: 236, h: 304 }
      ],
      air: [
        { x: 438, y: 752, w: 228, h: 284 },
        { x: 746, y: 786, w: 238, h: 250 }
      ]
    }
  };

  playerSprite.image.onload = () => {
    prepareSpriteFrames(playerSprite);
  };
  playerSprite.image.src = "assets/player-sprites.png";

  const goatSprite = {
    image: new Image(),
    preparedFrames: null,
    ready: false,
    maxFrameSize: 260,
    frames: {
      idle: [
        { x: 104, y: 52, w: 288, h: 292 },
        { x: 520, y: 52, w: 292, h: 292 },
        { x: 962, y: 60, w: 300, h: 284 }
      ],
      walk: [
        { x: 32, y: 404, w: 322, h: 276 },
        { x: 400, y: 404, w: 326, h: 276 },
        { x: 736, y: 404, w: 326, h: 276 },
        { x: 1084, y: 410, w: 320, h: 270 }
      ],
      run: [
        { x: 76, y: 768, w: 354, h: 232 },
        { x: 520, y: 768, w: 352, h: 232 },
        { x: 962, y: 768, w: 356, h: 232 }
      ]
    }
  };

  goatSprite.image.onload = () => {
    prepareSpriteFrames(goatSprite);
  };
  goatSprite.image.src = "assets/goat-sprites.png";

  const dogSprite = {
    image: new Image(),
    preparedFrames: null,
    ready: false,
    maxFrameSize: 260,
    frames: {
      walk: [
        { x: 50, y: 88, w: 292, h: 222 },
        { x: 410, y: 96, w: 288, h: 214 },
        { x: 760, y: 88, w: 302, h: 222 },
        { x: 1068, y: 96, w: 314, h: 214 }
      ],
      run: [
        { x: 48, y: 430, w: 392, h: 238 },
        { x: 526, y: 430, w: 392, h: 238 },
        { x: 990, y: 430, w: 394, h: 238 }
      ],
      bark: [
        { x: 296, y: 744, w: 410, h: 250 },
        { x: 802, y: 744, w: 434, h: 250 }
      ]
    }
  };

  dogSprite.image.onload = () => {
    prepareSpriteFrames(dogSprite);
  };
  dogSprite.image.src = "assets/dog-sprites.png";

  const environmentSprite = {
    image: new Image(),
    preparedFrames: null,
    ready: false,
    maxFrameSize: 620,
    frames: {
      grassStrip: [{ x: 38, y: 106, w: 690, h: 118 }],
      dirtBlock: [{ x: 54, y: 296, w: 668, h: 232 }],
      trunk: [{ x: 790, y: 94, w: 196, h: 392 }],
      branch: [{ x: 1042, y: 252, w: 352, h: 106 }],
      fence: [{ x: 34, y: 626, w: 504, h: 340 }],
      house: [{ x: 582, y: 572, w: 590, h: 386 }],
      sign: [{ x: 1190, y: 574, w: 208, h: 390 }]
    }
  };

  environmentSprite.image.onload = () => {
    prepareSpriteFrames(environmentSprite);
  };
  environmentSprite.image.src = "assets/environment-tiles.png";

  const collectibleSprite = {
    image: new Image(),
    preparedFrames: null,
    ready: false,
    maxFrameSize: 220,
    frames: {
      mango: [{ x: 48, y: 326, w: 322, h: 394 }],
      guinep: [{ x: 418, y: 276, w: 300, h: 438 }],
      stick: [{ x: 782, y: 282, w: 242, h: 456 }],
      stones: [{ x: 1092, y: 398, w: 316, h: 320 }]
    }
  };

  collectibleSprite.image.onload = () => {
    prepareSpriteFrames(collectibleSprite);
  };
  collectibleSprite.image.src = "assets/collectibles.png";

  const uiSprite = {
    image: new Image(),
    preparedFrames: null,
    ready: false,
    maxFrameSize: 0,
    frames: {
      heart: [{ x: 132, y: 96, w: 194, h: 164 }],
      mangoPanel: [{ x: 86, y: 332, w: 694, h: 236 }],
      timerPanel: [{ x: 876, y: 344, w: 486, h: 210 }],
      jumpButton: [{ x: 110, y: 622, w: 370, h: 370 }],
      swingButton: [{ x: 542, y: 622, w: 374, h: 370 }],
      throwButton: [{ x: 976, y: 622, w: 372, h: 370 }]
    }
  };

  uiSprite.image.onload = () => {
    prepareSpriteFrames(uiSprite, applyUiSprites);
  };
  uiSprite.image.src = "assets/ui-sprites.png";

  const buildingSprite = {
    image: new Image(),
    preparedFrames: null,
    ready: false,
    maxFrameSize: 640,
    frames: {
      tealHouse: [{ x: 74, y: 68, w: 410, h: 288 }],
      pinkHouse: [{ x: 516, y: 78, w: 410, h: 278 }],
      yellowHouse: [{ x: 946, y: 62, w: 410, h: 300 }],
      riddimBar: [{ x: 142, y: 400, w: 560, h: 270 }],
      cornerShop: [{ x: 760, y: 406, w: 520, h: 250 }],
      market: [{ x: 160, y: 724, w: 560, h: 306 }],
      church: [{ x: 812, y: 674, w: 520, h: 360 }]
    }
  };

  buildingSprite.image.onload = () => {
    prepareSpriteFrames(buildingSprite);
  };
  buildingSprite.image.src = "assets/buildings.png";

  const parallaxSprite = {
    image: new Image(),
    preparedFrames: null,
    ready: false,
    maxFrameSize: 960,
    frames: {
      sky: [{ x: 30, y: 26, w: 1390, h: 178 }],
      mountains: [{ x: 28, y: 286, w: 1392, h: 132 }],
      community: [{ x: 20, y: 494, w: 1406, h: 126 }],
      foliage: [{ x: 28, y: 904, w: 1392, h: 124 }]
    }
  };

  parallaxSprite.image.onload = () => {
    prepareSpriteFrames(parallaxSprite);
  };
  parallaxSprite.image.src = "assets/parallax-background.png";

  const mangoTreeSprite = {
    image: new Image(),
    preparedFrames: null,
    ready: false,
    maxFrameSize: 420,
    frames: {
      tree: [{ x: 62, y: 28, w: 1322, h: 1012 }]
    }
  };

  mangoTreeSprite.image.onload = () => {
    prepareSpriteFrames(mangoTreeSprite);
  };
  mangoTreeSprite.image.src = "assets/mango-tree.png";

  const treePiecesSprite = {
    image: new Image(),
    preparedFrames: null,
    ready: false,
    maxFrameSize: 220,
    frames: {
      closeLeafA: [{ x: 738, y: 686, w: 126, h: 104 }],
      closeLeafB: [{ x: 850, y: 674, w: 126, h: 122 }],
      closeLeafC: [{ x: 1048, y: 678, w: 148, h: 120 }],
      closeLeafD: [{ x: 1196, y: 678, w: 104, h: 116 }],
      closeVineA: [{ x: 1298, y: 664, w: 60, h: 142 }],
      closeVineB: [{ x: 1390, y: 678, w: 98, h: 130 }]
    }
  };

  treePiecesSprite.image.onload = () => {
    prepareSpriteFrames(treePiecesSprite);
  };
  treePiecesSprite.image.src = "assets/tree-pieces.png";

  const hud = {
    mangoes: document.getElementById("mangoCounter"),
    timer: document.getElementById("timerCounter"),
    stick: document.getElementById("stickState"),
    stones: document.getElementById("stoneState"),
    hearts: document.getElementById("heartRow"),
    winSubtext: document.getElementById("winSubtext"),
    nextLevelButton: document.getElementById("nextLevelButton"),
    gameOverReason: document.getElementById("gameOverReason")
  };

  const hudCache = {
    mangoes: "",
    timer: "",
    stick: "",
    stones: "",
    health: -1
  };

  const screens = {
    menu: document.getElementById("menuScreen"),
    how: document.getElementById("howScreen"),
    win: document.getElementById("winScreen"),
    over: document.getElementById("gameOverScreen")
  };

  const input = {
    left: false,
    right: false,
    jump: false,
    swing: false,
    throw: false,
    jumpPressed: false,
    swingPressed: false,
    throwPressed: false
  };

  const keyMap = new Map([
    ["ArrowLeft", "left"],
    ["a", "left"],
    ["A", "left"],
    ["ArrowRight", "right"],
    ["d", "right"],
    ["D", "right"],
    [" ", "jump"],
    ["Spacebar", "jump"],
    ["j", "swing"],
    ["J", "swing"],
    ["k", "throw"],
    ["K", "throw"]
  ]);

  const LEVELS = [
    {
      name: "Level 1 - Countryside Yard",
      timeLimit: 120,
      width: 3800,
      endX: 3638,
      startX: 70,
      platforms: [
        rect(0, GROUND_Y, 900, 66, "grass"),
        rect(1000, GROUND_Y, 520, 66, "dirt"),
        rect(1650, GROUND_Y, 780, 66, "grass"),
        rect(2560, GROUND_Y, 1240, 66, "dirt"),
        rect(475, 385, 230, 26, "branch"),
        rect(760, 320, 220, 26, "branch"),
        rect(1400, 372, 260, 26, "branch"),
        rect(1780, 300, 220, 26, "branch"),
        rect(2175, 372, 250, 26, "branch"),
        rect(2840, 330, 250, 26, "branch"),
        rect(3160, 385, 250, 26, "branch")
      ],
      signs: [
        { x: 128, y: GROUND_Y - 88, text: "Collect 10 mangoes and reach the end!" },
        { x: 1128, y: GROUND_Y - 88, text: "Press J to swing stick" },
        { x: 1880, y: GROUND_Y - 88, text: "Press K to throw stone" },
        { x: 2245, y: GROUND_Y - 88, text: "Careful! Yard dog ahead" },
        { x: 2920, y: GROUND_Y - 88, text: "Goat will charge if yuh get too close" },
        { x: 3600, y: GROUND_Y - 88, text: "Bring di mangoes home!" }
      ],
      mangoes: [
        [270, GROUND_Y - 70],
        [560, 345],
        [650, 345],
        [810, 280],
        [910, 280],
        [1240, GROUND_Y - 72],
        [1470, 332],
        [1835, 260],
        [1925, 260],
        [2220, 332],
        [2670, GROUND_Y - 72],
        [2920, 290],
        [3250, 345],
        [3345, 345],
        [3520, GROUND_Y - 72]
      ],
      guineps: [
        [1515, 332],
        [3050, GROUND_Y - 70]
      ],
      pickups: [
        [1110, GROUND_Y - 44, "stick"],
        [1850, GROUND_Y - 40, "stones"],
        [3120, GROUND_Y - 40, "stones"]
      ],
      enemies: [
        ["dog", 720, 520, 920],
        ["dog", 2300, 2180, 2460],
        ["goat", 2830, 2700, 3090],
        ["goat", 3345, 3240, 3520]
      ]
    },
    {
      name: "Level 2 - Market Ridge",
      timeLimit: 135,
      width: 4300,
      endX: 4145,
      startX: 70,
      platforms: [
        rect(0, GROUND_Y, 680, 66, "grass"),
        rect(820, GROUND_Y, 560, 66, "dirt"),
        rect(1580, GROUND_Y, 500, 66, "grass"),
        rect(2260, GROUND_Y, 620, 66, "dirt"),
        rect(3120, GROUND_Y, 1180, 66, "grass"),
        rect(520, 385, 220, 26, "branch"),
        rect(900, 330, 230, 26, "branch"),
        rect(1225, 372, 225, 26, "branch"),
        rect(1710, 315, 230, 26, "branch"),
        rect(2020, 360, 210, 26, "branch"),
        rect(2550, 320, 240, 26, "branch"),
        rect(2870, 380, 230, 26, "branch"),
        rect(3420, 330, 260, 26, "branch"),
        rect(3720, 386, 220, 26, "branch")
      ],
      signs: [
        { x: 128, y: GROUND_Y - 88, text: "Level 2: Market Ridge!" },
        { x: 545, y: 300, text: "Watch di gap!" },
        { x: 1440, y: GROUND_Y - 88, text: "Stones help with fast enemies" },
        { x: 2315, y: GROUND_Y - 88, text: "Goats guard the market lane" },
        { x: 3885, y: GROUND_Y - 88, text: "Final stretch. Bring dem home!" }
      ],
      mangoes: [
        [265, GROUND_Y - 72],
        [570, 345],
        [930, 290],
        [1040, 290],
        [1265, 332],
        [1650, GROUND_Y - 72],
        [1778, 275],
        [2070, 320],
        [2350, GROUND_Y - 72],
        [2605, 280],
        [2895, 340],
        [3210, GROUND_Y - 72],
        [3480, 290],
        [3775, 346],
        [4030, GROUND_Y - 72]
      ],
      guineps: [
        [950, 290],
        [2710, 280],
        [3605, GROUND_Y - 70]
      ],
      pickups: [
        [430, GROUND_Y - 44, "stick"],
        [1450, GROUND_Y - 40, "stones"],
        [3050, GROUND_Y - 40, "stones"]
      ],
      enemies: [
        ["dog", 1040, 880, 1320],
        ["goat", 1810, 1660, 2050],
        ["dog", 2460, 2320, 2820],
        ["goat", 3360, 3200, 3660],
        ["dog", 3920, 3740, 4120]
      ]
    }
  ];

  let state;
  let lastTime = 0;
  let mode = "menu";

  function rect(x, y, w, h, type = "solid") {
    return { x, y, w, h, type };
  }

  function createState(levelIndex = 0) {
    const level = LEVELS[clamp(levelIndex, 0, LEVELS.length - 1)];
    return {
      levelIndex: clamp(levelIndex, 0, LEVELS.length - 1),
      level,
      cameraX: 0,
      timeLeft: level.timeLimit,
      toast: { text: "", time: 0 },
      shake: 0,
      player: {
        x: level.startX,
        y: GROUND_Y - 82,
        w: 42,
        h: 82,
        vx: 0,
        vy: 0,
        facing: 1,
        health: 3,
        mangoes: 0,
        guineps: 0,
        hasStick: false,
        stones: 0,
        invincible: 0,
        onGround: false,
        swingTime: 0,
        swingCooldown: 0,
        throwCooldown: 0,
        coyote: 0
      },
      mangoes: level.mangoes.map(([x, y]) => item(x, y, "mango")),
      guineps: level.guineps.map(([x, y]) => item(x, y, "guinep")),
      pickups: level.pickups.map(([x, y, type]) => item(x, y, type)),
      enemies: level.enemies.map(createEnemy),
      projectiles: [],
      particles: []
    };
  }

  function createEnemy(config) {
    const [type, x, minX, maxX] = config;
    return type === "goat" ? goat(x, minX, maxX) : dog(x, minX, maxX);
  }

  function item(x, y, type) {
    return { x, y, w: 32, h: 32, type, taken: false, bob: Math.random() * 6.28 };
  }

  function dog(x, minX, maxX) {
    return {
      kind: "dog",
      x,
      y: GROUND_Y - 48,
      w: 62,
      h: 44,
      minX,
      maxX,
      vx: 80,
      state: "patrol",
      facing: 1,
      stun: 0,
      attackCooldown: 0
    };
  }

  function goat(x, minX, maxX) {
    return {
      kind: "goat",
      x,
      y: GROUND_Y - 54,
      w: 70,
      h: 50,
      minX,
      maxX,
      vx: -60,
      state: "walk",
      facing: -1,
      stun: 0,
      chargeTime: 0,
      wait: 0,
      attackCooldown: 0
    };
  }

  function showScreen(name) {
    Object.values(screens).forEach((screen) => screen.classList.remove("active"));
    if (name && screens[name]) screens[name].classList.add("active");
  }

  function setMode(nextMode, reason = "") {
    mode = nextMode;
    if (mode === "menu") showScreen("menu");
    if (mode === "how") showScreen("how");
    if (mode === "playing") showScreen(null);
    if (mode === "win") {
      updateWinScreen();
      showScreen("win");
    }
    if (mode === "over") {
      hud.gameOverReason.textContent = reason || "Di fruit dem get away!";
      showScreen("over");
    }
  }

  function restart(levelIndex = state?.levelIndex || 0) {
    state = createState(levelIndex);
    updateHud();
    setMode("playing");
    toast(state.level.name, 1.4);
  }

  function updateWinScreen() {
    const isFinalLevel = state.levelIndex >= LEVELS.length - 1;
    hud.winSubtext.textContent = isFinalLevel
      ? "You finished the prototype run!"
      : "You collected enough mangoes.";
    hud.nextLevelButton.hidden = isFinalLevel;
  }

  function toast(text, time = 1.1) {
    state.toast.text = text;
    state.toast.time = time;
  }

  document.getElementById("startButton").addEventListener("click", () => restart(0));
  document.getElementById("level2Button").addEventListener("click", () => restart(1));
  document.getElementById("howButton").addEventListener("click", () => setMode("how"));
  document.getElementById("fullscreenButton").addEventListener("click", toggleFullscreen);
  document.getElementById("backButton").addEventListener("click", () => setMode("menu"));
  document.getElementById("nextLevelButton").addEventListener("click", () => restart(state.levelIndex + 1));
  document.getElementById("winRestartButton").addEventListener("click", () => restart(state?.levelIndex || 0));
  document.getElementById("winMenuButton").addEventListener("click", () => setMode("menu"));
  document.getElementById("retryButton").addEventListener("click", () => restart(state?.levelIndex || 0));
  document.getElementById("gameOverMenuButton").addEventListener("click", () => setMode("menu"));

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen({ navigationUI: "hide" });
      }
    } catch {
      toast("Fullscreen is blocked by this browser.", 1.4);
    }
    updateFullscreenButton();
  }

  function updateFullscreenButton() {
    const label = document.getElementById("fullscreenButtonText");
    if (label) label.textContent = document.fullscreenElement ? "Exit Fullscreen" : "Fullscreen";
  }

  document.addEventListener("fullscreenchange", updateFullscreenButton);

  window.addEventListener("keydown", (event) => {
    const action = keyMap.get(event.key);
    if (!action) return;
    event.preventDefault();
    if (!input[action]) {
      if (action === "jump") input.jumpPressed = true;
      if (action === "swing") input.swingPressed = true;
      if (action === "throw") input.throwPressed = true;
    }
    input[action] = true;
    if (mode === "menu" && action === "jump") restart(0);
  });

  window.addEventListener("keyup", (event) => {
    const action = keyMap.get(event.key);
    if (!action) return;
    event.preventDefault();
    input[action] = false;
  });

  document.querySelectorAll(".control").forEach((button) => {
    const action = button.dataset.action;
    const press = (event) => {
      event.preventDefault();
      if (!input[action]) {
        if (action === "jump") input.jumpPressed = true;
        if (action === "swing") input.swingPressed = true;
        if (action === "throw") input.throwPressed = true;
      }
      input[action] = true;
      button.classList.add("pressed");
    };
    const release = (event) => {
      event.preventDefault();
      input[action] = false;
      button.classList.remove("pressed");
    };
    button.addEventListener("pointerdown", press);
    button.addEventListener("pointerup", release);
    button.addEventListener("pointercancel", release);
    button.addEventListener("pointerleave", release);
  });

  function update(dt) {
    if (mode !== "playing") return;

    state.timeLeft -= dt;
    if (state.timeLeft <= 0) {
      state.timeLeft = 0;
      setMode("over", "Time run out. Di fruit dem get away!");
      updateHud();
      return;
    }

    const p = state.player;
    const move = (input.right ? 1 : 0) - (input.left ? 1 : 0);
    const maxSpeed = 260;
    const accel = 1400;
    const decel = 1800;
    const gravity = 1500;

    if (move !== 0) {
      p.vx += move * accel * dt;
      p.vx = clamp(p.vx, -maxSpeed, maxSpeed);
      p.facing = move;
    } else {
      p.vx = approach(p.vx, 0, decel * dt);
    }

    p.coyote = p.onGround ? 0.12 : Math.max(0, p.coyote - dt);
    if (input.jumpPressed && (p.onGround || p.coyote > 0)) {
      p.vy = -600;
      p.onGround = false;
      p.coyote = 0;
      burst(p.x + p.w / 2, p.y + p.h, "#f2c46d", 8);
    }

    if (input.swingPressed) swingStick();
    if (input.throwPressed) throwStone();
    input.jumpPressed = false;
    input.swingPressed = false;
    input.throwPressed = false;

    p.vy = clamp(p.vy + gravity * dt, -700, 900);
    movePlayer(dt);

    p.invincible = Math.max(0, p.invincible - dt);
    p.swingTime = Math.max(0, p.swingTime - dt);
    p.swingCooldown = Math.max(0, p.swingCooldown - dt);
    p.throwCooldown = Math.max(0, p.throwCooldown - dt);
    state.toast.time = Math.max(0, state.toast.time - dt);
    state.shake = Math.max(0, state.shake - dt);

    updateItems(dt);
    updateEnemies(dt);
    updateProjectiles(dt);
    updateParticles(dt);
    checkEndSign();

    state.cameraX = clamp(p.x + p.w / 2 - W * 0.42, 0, state.level.width - W);
    updateHud();
  }

  function movePlayer(dt) {
    const p = state.player;
    p.x += p.vx * dt;
    p.x = clamp(p.x, 0, state.level.width - p.w);

    p.y += p.vy * dt;
    p.onGround = false;

    for (const platform of state.level.platforms) {
      if (!aabb(p, platform)) continue;
      const wasAbove = p.y + p.h - p.vy * dt <= platform.y + 5;
      const wasBelow = p.y - p.vy * dt >= platform.y + platform.h - 4;
      if (p.vy >= 0 && wasAbove) {
        p.y = platform.y - p.h;
        p.vy = 0;
        p.onGround = true;
      } else if (p.vy < 0 && wasBelow) {
        p.y = platform.y + platform.h;
        p.vy = 40;
      }
    }

    if (p.y > H + 80) {
      damagePlayer(1, -p.facing, true);
      p.x = Math.max(40, p.x - 180);
      p.y = GROUND_Y - p.h - 30;
      p.vy = 0;
    }
  }

  function swingStick() {
    const p = state.player;
    if (p.swingCooldown > 0) return;
    if (!p.hasStick) {
      toast("Need Stick");
      p.swingCooldown = 0.35;
      return;
    }
    p.swingTime = 0.15;
    p.swingCooldown = 0.34;
    const hit = swingBox();
    burst(hit.x + hit.w / 2, hit.y + hit.h / 2, "#ffe27c", 10);
    for (const enemy of state.enemies) {
      if (enemy.stun <= 0 && aabb(hit, enemy)) stunEnemy(enemy);
    }
  }

  function throwStone() {
    const p = state.player;
    if (p.throwCooldown > 0) return;
    if (p.stones <= 0) {
      toast("Need stones");
      p.throwCooldown = 0.35;
      return;
    }
    p.stones -= 1;
    p.throwCooldown = 0.28;
    state.projectiles.push({
      x: p.x + p.w / 2 + p.facing * 30,
      y: p.y + 34,
      w: 16,
      h: 16,
      vx: p.facing * 500,
      ttl: 1.5,
      spin: 0
    });
  }

  function updateItems(dt) {
    for (const item of [...state.mangoes, ...state.guineps, ...state.pickups]) {
      item.bob += dt * 3.5;
      if (item.taken || !aabb(state.player, item)) continue;
      if (item.type === "mango") {
        item.taken = true;
        state.player.mangoes += 1;
        toast("Mango +" + state.player.mangoes);
        burst(item.x + 16, item.y + 16, "#ffb333", 12);
      }
      if (item.type === "guinep") {
        item.taken = true;
        state.player.guineps += 1;
        toast("Guinep bonus");
        burst(item.x + 16, item.y + 16, "#8cc63f", 12);
      }
      if (item.type === "stick") {
        item.taken = true;
        state.player.hasStick = true;
        toast("Stick Ready");
      }
      if (item.type === "stones") {
        state.player.stones += 3;
        item.taken = true;
        toast("+3 stones");
      }
    }
  }

  function updateEnemies(dt) {
    for (const enemy of state.enemies) {
      enemy.attackCooldown = Math.max(0, enemy.attackCooldown - dt);
      if (enemy.stun > 0) {
        enemy.stun -= dt;
        enemy.state = "stunned";
        continue;
      }

      if (enemy.kind === "dog") updateDog(enemy, dt);
      if (enemy.kind === "goat") updateGoat(enemy, dt);

      if (aabb(state.player, enemy)) {
        const dir = state.player.x < enemy.x ? -1 : 1;
        if (enemy.attackCooldown <= 0) {
          enemy.state = enemy.kind === "dog" ? "bark" : "charge";
          damagePlayer(1, dir);
          enemy.attackCooldown = 0.8;
        }
      }
    }
  }

  function updateDog(dog, dt) {
    const p = state.player;
    const dx = p.x - dog.x;
    const dist = Math.abs(dx);
    if (dist < 50 && Math.abs(p.y - dog.y) < 80) {
      dog.state = "bark";
      dog.vx = 0;
    } else if (dist < 250 && Math.abs(p.y - dog.y) < 110) {
      dog.state = "chase";
      dog.facing = Math.sign(dx) || dog.facing;
      dog.vx = dog.facing * 150;
    } else {
      dog.state = "patrol";
      if (dog.vx === 0) dog.vx = dog.facing * 80;
      if (dog.x <= dog.minX) dog.vx = 80;
      if (dog.x >= dog.maxX) dog.vx = -80;
      dog.facing = Math.sign(dog.vx) || dog.facing;
    }
    dog.x += dog.vx * dt;
    dog.x = clamp(dog.x, dog.minX, dog.maxX);
  }

  function updateGoat(goat, dt) {
    const p = state.player;
    const dx = p.x - goat.x;
    const near = Math.abs(dx) < 220 && Math.abs(p.y - goat.y) < 80;

    if (goat.wait > 0) {
      goat.wait -= dt;
      goat.state = "idle";
      return;
    }

    if (near && goat.state !== "charge") {
      goat.state = "charge";
      goat.facing = Math.sign(dx) || goat.facing;
      goat.vx = goat.facing * 220;
      goat.chargeTime = 0.95;
    }

    if (goat.state === "charge") {
      goat.chargeTime -= dt;
      goat.x += goat.vx * dt;
      if (goat.x <= goat.minX || goat.x >= goat.maxX || goat.chargeTime <= 0) {
        goat.x = clamp(goat.x, goat.minX, goat.maxX);
        goat.wait = 1;
        goat.state = "idle";
        goat.vx = 0;
      }
      return;
    }

    goat.state = "walk";
    if (goat.vx === 0) goat.vx = goat.facing * 60;
    goat.x += goat.vx * dt;
    if (goat.x <= goat.minX || goat.x >= goat.maxX) {
      goat.x = clamp(goat.x, goat.minX, goat.maxX);
      goat.vx *= -1;
      goat.facing = Math.sign(goat.vx);
    }
  }

  function updateProjectiles(dt) {
    for (const projectile of state.projectiles) {
      projectile.x += projectile.vx * dt;
      projectile.ttl -= dt;
      projectile.spin += dt * 14;
      for (const enemy of state.enemies) {
        if (enemy.stun <= 0 && aabb(projectile, enemy)) {
          stunEnemy(enemy);
          projectile.ttl = 0;
          burst(projectile.x + 8, projectile.y + 8, "#d9d0be", 10);
        }
      }
    }
    state.projectiles = state.projectiles.filter((projectile) => projectile.ttl > 0);
  }

  function updateParticles(dt) {
    for (const particle of state.particles) {
      particle.x += particle.vx * dt;
      particle.y += particle.vy * dt;
      particle.vy += 500 * dt;
      particle.life -= dt;
    }
    state.particles = state.particles.filter((particle) => particle.life > 0);
  }

  function stunEnemy(enemy) {
    enemy.stun = 1.25;
    enemy.state = "stunned";
    enemy.vx = 0;
    toast(enemy.kind === "dog" ? "Dog stunned" : "Goat stunned");
    burst(enemy.x + enemy.w / 2, enemy.y + 12, "#fff27a", 12);
  }

  function damagePlayer(amount, dir, force = false) {
    const p = state.player;
    if (p.invincible > 0 && !force) return;
    p.health -= amount;
    p.invincible = 1.5;
    p.vx = dir * 340;
    p.vy = -330;
    state.shake = 0.18;
    burst(p.x + p.w / 2, p.y + p.h / 2, "#d94b3d", 18);
    if (p.health <= 0) {
      p.health = 0;
      updateHud();
      setMode("over", "Health reach zero. Di fruit dem get away!");
    }
  }

  function checkEndSign() {
    const p = state.player;
    const end = rect(state.level.endX, GROUND_Y - 110, 54, 110);
    if (!aabb(p, end)) return;
    if (p.mangoes >= WIN_MANGOES) {
      setMode("win");
    } else {
      toast(`Need ${WIN_MANGOES - p.mangoes} more mangoes`);
    }
  }

  function swingBox() {
    const p = state.player;
    return {
      x: p.facing > 0 ? p.x + p.w - 6 : p.x - 58,
      y: p.y + 18,
      w: 64,
      h: 42
    };
  }

  function burst(x, y, color, count) {
    for (let i = 0; i < count; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 55 + Math.random() * 180;
      state.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 60,
        r: 2 + Math.random() * 4,
        color,
        life: 0.35 + Math.random() * 0.45
      });
    }
  }

  function draw() {
    const shakeX = state && state.shake > 0 ? (Math.random() - 0.5) * 8 : 0;
    const shakeY = state && state.shake > 0 ? (Math.random() - 0.5) * 5 : 0;
    ctx.save();
    ctx.translate(shakeX, shakeY);
    drawBackground();

    if (state) {
      ctx.save();
      ctx.translate(-state.cameraX, 0);
      drawWorld();
      ctx.restore();
      drawToast();
    } else {
      drawBackground();
    }
    ctx.restore();
  }

  function drawBackground() {
    const cam = state ? state.cameraX : 0;
    if (parallaxSprite.ready) {
      const sky = ctx.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0, "#4eb7ff");
      sky.addColorStop(0.58, "#bdeeff");
      sky.addColorStop(1, "#b9e58b");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H);

      drawParallaxStrip(parallaxSprite.preparedFrames.sky[0], cam, 0.035, -8, 178);
      drawParallaxStrip(parallaxSprite.preparedFrames.mountains[0], cam, 0.13, 212, 116);
      drawParallaxStrip(parallaxSprite.preparedFrames.community[0], cam, 0.27, 314, 116);
      drawParallaxStrip(parallaxSprite.preparedFrames.foliage[0], cam, 0.42, 420, 74);
      drawYardLayer(cam * 0.55);
      return;
    }

    const sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, "#81dcff");
    sky.addColorStop(0.58, "#d7f5ff");
    sky.addColorStop(1, "#b7df83");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = "#ffd86b";
    ctx.beginPath();
    ctx.arc(820 - cam * 0.05, 78, 42, 0, Math.PI * 2);
    ctx.fill();

    drawCloud(130 - cam * 0.1, 82, 1);
    drawCloud(480 - cam * 0.1, 52, 0.75);
    drawCloud(910 - cam * 0.1, 105, 0.85);

    drawHills(cam, 0.2, 275, "#69a85c", "#4f8a48");
    drawHills(cam, 0.32, 325, "#4d8e56", "#32734d");
    drawCommunity(cam * 0.35);
    drawYardLayer(cam * 0.55);
  }

  function drawCloud(x, y, scale) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.88)";
    ctx.beginPath();
    ctx.arc(x, y, 23 * scale, 0, Math.PI * 2);
    ctx.arc(x + 28 * scale, y - 12 * scale, 30 * scale, 0, Math.PI * 2);
    ctx.arc(x + 62 * scale, y, 23 * scale, 0, Math.PI * 2);
    ctx.rect(x - 3 * scale, y, 70 * scale, 20 * scale);
    ctx.fill();
  }

  function drawHills(cam, speed, baseY, colorA, colorB) {
    const offset = -(cam * speed) % 520;
    ctx.fillStyle = colorA;
    ctx.beginPath();
    ctx.moveTo(offset - 80, H);
    for (let x = offset - 80; x < W + 620; x += 260) {
      ctx.quadraticCurveTo(x + 120, baseY - 80, x + 260, baseY);
    }
    ctx.lineTo(W, H);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = colorB;
    ctx.beginPath();
    ctx.moveTo(offset - 180, H);
    for (let x = offset - 180; x < W + 620; x += 340) {
      ctx.quadraticCurveTo(x + 160, baseY - 55, x + 340, baseY + 18);
    }
    ctx.lineTo(W, H);
    ctx.closePath();
    ctx.fill();
  }

  function drawCommunity(offset) {
    if (buildingSprite.ready) {
      const frameNames = ["tealHouse", "pinkHouse", "yellowHouse", "cornerShop"];
      let index = 0;
      for (let x = -150 - (offset % 620); x < W + 700; x += 310) {
        const frame = buildingSprite.preparedFrames[frameNames[index % frameNames.length]][0];
        const targetW = index % 2 === 0 ? 190 : 215;
        const targetH = targetW * (frame.h / frame.w);
        drawEnvSprite(frame, x, 420 - targetH, targetW, targetH);
        index += 1;
      }
      return;
    }

    for (let x = -120 - (offset % 420); x < W + 420; x += 420) {
      drawHouse(x, 328, 86, "#fff1ac", "#b44d3d");
      drawHouse(x + 180, 344, 92, "#d9f2c2", "#a2a8a2");
      drawPalm(x + 326, 354, 0.72);
    }
  }

  function drawYardLayer(offset) {
    if (environmentSprite.ready) {
      const fence = environmentSprite.preparedFrames.fence[0];
      for (let x = -80 - (offset % 470); x < W + 560; x += 470) {
        drawEnvSprite(fence, x, 336, 470, 170);
      }
      for (let x = -80 - (offset % 640); x < W + 700; x += 640) {
        drawClothes(x + 100, 384);
        drawClothes(x + 180, 384);
        drawBananaPlant(x + 420, 418, 0.9);
      }
      return;
    }

    ctx.fillStyle = "#b8c0b0";
    for (let x = -60 - (offset % 160); x < W + 220; x += 80) {
      ctx.fillRect(x, 404, 58, 50);
      ctx.strokeStyle = "#8a9185";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x + 10, 406);
      ctx.lineTo(x + 48, 452);
      ctx.stroke();
    }
    ctx.strokeStyle = "#71472b";
    ctx.lineWidth = 4;
    for (let x = -80 - (offset % 640); x < W + 700; x += 640) {
      ctx.beginPath();
      ctx.moveTo(x + 60, 384);
      ctx.lineTo(x + 310, 384);
      ctx.stroke();
      drawClothes(x + 100, 384);
      drawClothes(x + 180, 384);
      drawBananaPlant(x + 420, 418, 0.9);
    }
  }

  function drawWorld() {
    drawTreesAndProps();
    for (const platform of state.level.platforms) drawPlatform(platform);
    for (const sign of state.level.signs) drawSign(sign);
    drawEndSign();

    for (const item of state.mangoes) if (!item.taken) drawItem(item);
    for (const item of state.guineps) if (!item.taken) drawItem(item);
    for (const item of state.pickups) if (!item.taken) drawItem(item);
    for (const projectile of state.projectiles) drawProjectile(projectile);
    for (const enemy of state.enemies) drawEnemy(enemy);
    drawPlayer(state.player);
    for (const particle of state.particles) drawParticle(particle);
  }

  function drawTreesAndProps() {
    drawMangoTree(340, GROUND_Y, 1.05);
    drawMangoTree(1720, GROUND_Y, 0.96);
    drawMangoTree(3040, GROUND_Y, 1.05);
    drawLevelBuilding(2460, GROUND_Y - 4, "market", 305);
    drawLevelBuilding(760, GROUND_Y - 8, "riddimBar", 260);
    drawBananaPlant(1340, GROUND_Y - 8, 1.1);
    drawBananaPlant(2550, GROUND_Y - 8, 1);
    drawBarrel(2070, GROUND_Y - 35);
    drawBarrel(2108, GROUND_Y - 35);
  }

  function drawLevelBuilding(x, baseY, name, targetW) {
    if (!buildingSprite.ready) {
      drawHouse(x, baseY - 138, 132, "#ffe6a1", "#b44d3d");
      return;
    }

    const frame = buildingSprite.preparedFrames[name][0];
    const targetH = targetW * (frame.h / frame.w);
    drawEnvSprite(frame, x, baseY - targetH, targetW, targetH);
  }

  function drawPlatform(platform) {
    if (environmentSprite.ready) {
      if (platform.type === "branch") {
        const branch = environmentSprite.preparedFrames.branch[0];
        const branchH = Math.max(48, platform.h + 28);
        drawEnvSprite(branch, platform.x - 14, platform.y - 16, platform.w + 28, branchH);
        return;
      }

      const frame = platform.type === "grass"
        ? environmentSprite.preparedFrames.grassStrip[0]
        : environmentSprite.preparedFrames.dirtBlock[0];
      drawEnvTiled(frame, platform.x, platform.y - 12, platform.w, platform.h + 18);
      return;
    }

    if (platform.type === "branch") {
      ctx.fillStyle = "#6b4328";
      roundRect(platform.x, platform.y, platform.w, platform.h, 13);
      ctx.fill();
      ctx.fillStyle = "#2f8c4a";
      for (let x = platform.x + 14; x < platform.x + platform.w; x += 45) {
        ctx.beginPath();
        ctx.ellipse(x, platform.y - 5, 17, 9, -0.3, 0, Math.PI * 2);
        ctx.fill();
      }
      return;
    }

    ctx.fillStyle = platform.type === "grass" ? "#2e9b4d" : "#9a6842";
    ctx.fillRect(platform.x, platform.y, platform.w, 18);
    ctx.fillStyle = platform.type === "grass" ? "#7b4e2d" : "#6b442c";
    ctx.fillRect(platform.x, platform.y + 18, platform.w, platform.h - 18);
    ctx.fillStyle = "rgba(0,0,0,0.12)";
    for (let x = platform.x + 16; x < platform.x + platform.w; x += 44) {
      ctx.fillRect(x, platform.y + 26, 20, 6);
    }
  }

  function drawItem(item) {
    const y = item.y + Math.sin(item.bob) * 5;
    if (collectibleSprite.ready) {
      drawCollectibleSprite(item, y);
      return;
    }
    drawItemFallback(item, y);
  }

  function drawCollectibleSprite(item, y) {
    const frame = collectibleSprite.preparedFrames[item.type]?.[0];
    if (!frame) return;

    const sizes = {
      mango: { w: 34, h: 42, anchorY: 18 },
      guinep: { w: 36, h: 48, anchorY: 19 },
      stick: { w: 30, h: 60, anchorY: 27 },
      stones: { w: 46, h: 40, anchorY: 23 }
    };
    const size = sizes[item.type] || { w: 34, h: 34, anchorY: 17 };
    const drawX = item.x + item.w / 2 - size.w / 2;
    const drawY = y + size.anchorY - size.h;

    ctx.drawImage(frame.canvas, drawX, drawY, size.w, size.h);
  }

  function drawItemFallback(item, y) {
    if (item.type === "mango") {
      ctx.fillStyle = "#ffad24";
      ctx.beginPath();
      ctx.ellipse(item.x + 16, y + 16, 13, 17, -0.34, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffdd4d";
      ctx.beginPath();
      ctx.ellipse(item.x + 12, y + 12, 5, 8, -0.34, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#257541";
      ctx.beginPath();
      ctx.ellipse(item.x + 22, y + 3, 9, 4, 0.35, 0, Math.PI * 2);
      ctx.fill();
    } else if (item.type === "guinep") {
      ctx.fillStyle = "#87bf3f";
      for (let i = 0; i < 4; i += 1) {
        ctx.beginPath();
        ctx.arc(item.x + 10 + i * 7, y + 17 + (i % 2) * 4, 6, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (item.type === "stick") {
      ctx.save();
      ctx.translate(item.x + 16, y + 17);
      ctx.rotate(-0.65);
      ctx.fillStyle = "#8a552f";
      roundRect(-3, -22, 6, 44, 3);
      ctx.fill();
      ctx.restore();
    } else if (item.type === "stones") {
      ctx.fillStyle = "#85837a";
      ctx.beginPath();
      ctx.arc(item.x + 11, y + 22, 9, 0, Math.PI * 2);
      ctx.arc(item.x + 21, y + 18, 10, 0, Math.PI * 2);
      ctx.arc(item.x + 26, y + 26, 7, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawEnemy(enemy) {
    if (enemy.kind === "dog") drawDog(enemy);
    if (enemy.kind === "goat") drawGoat(enemy);
    if (enemy.stun > 0) {
      ctx.fillStyle = "#fff27a";
      ctx.font = "900 18px system-ui, sans-serif";
      ctx.fillText("STUN", enemy.x + 8, enemy.y - 10);
    }
  }

  function drawDog(dog) {
    if (dogSprite.ready) {
      drawDogSprite(dog);
      return;
    }
    drawDogFallback(dog);
  }

  function drawDogSprite(dog) {
    const frame = currentDogFrame(dog);
    const footX = dog.x + dog.w / 2;
    const footY = dog.y + dog.h + 5;
    const targetH = dog.state === "bark" ? 72 : dog.state === "chase" ? 66 : 60;
    const targetW = frame.w * (targetH / frame.h);

    ctx.save();
    ctx.translate(footX, footY);
    ctx.scale(dog.facing, 1);
    ctx.drawImage(
      frame.canvas,
      -targetW / 2,
      -targetH,
      targetW,
      targetH
    );
    ctx.restore();

    if (dog.state === "bark") {
      ctx.fillStyle = "#fff6d2";
      ctx.font = "900 13px system-ui, sans-serif";
      ctx.fillText("BARK", dog.x + dog.w - 4, dog.y - 7);
    }
  }

  function currentDogFrame(dog) {
    if (dog.state === "bark") {
      return dogSprite.preparedFrames.bark[Math.floor(performance.now() / 125) % 2];
    }
    if (dog.state === "chase") {
      return dogSprite.preparedFrames.run[Math.floor(performance.now() / 95) % 3];
    }
    return dogSprite.preparedFrames.walk[Math.floor(performance.now() / 135) % 4];
  }

  function drawDogFallback(dog) {
    const frame = Math.floor(performance.now() / 140) % 2;
    ctx.save();
    ctx.translate(dog.x + dog.w / 2, dog.y + dog.h / 2);
    ctx.scale(dog.facing, 1);
    ctx.translate(-dog.w / 2, -dog.h / 2);
    ctx.fillStyle = dog.state === "chase" ? "#8a4a24" : "#a66132";
    roundRect(5, 14, 44, 24, 11);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(47, 15, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#5a2e1c";
    ctx.beginPath();
    ctx.moveTo(38, 4);
    ctx.lineTo(44, -9);
    ctx.lineTo(50, 5);
    ctx.fill();
    ctx.fillStyle = "#1d1510";
    ctx.beginPath();
    ctx.arc(53, 13, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#5a2e1c";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(9, 20);
    ctx.quadraticCurveTo(-8, 4, -14, 15);
    ctx.stroke();
    ctx.strokeStyle = "#4a2516";
    ctx.lineWidth = 6;
    const leg = frame ? 3 : -3;
    ctx.beginPath();
    ctx.moveTo(17, 35);
    ctx.lineTo(17 + leg, 45);
    ctx.moveTo(39, 35);
    ctx.lineTo(39 - leg, 45);
    ctx.stroke();
    if (dog.state === "bark") {
      ctx.fillStyle = "#fff6d2";
      ctx.font = "900 13px system-ui, sans-serif";
      ctx.fillText("BARK", 56, 8);
    }
    ctx.restore();
  }

  function drawGoat(goat) {
    if (goatSprite.ready) {
      drawGoatSprite(goat);
      return;
    }
    drawGoatFallback(goat);
  }

  function drawGoatSprite(goat) {
    const frame = currentGoatFrame(goat);
    const footX = goat.x + goat.w / 2;
    const footY = goat.y + goat.h + 4;
    const targetH = goat.state === "charge" ? 78 : 82;
    const targetW = frame.w * (targetH / frame.h);

    ctx.save();
    ctx.translate(footX, footY);
    ctx.scale(goat.facing, 1);
    ctx.drawImage(
      frame.canvas,
      -targetW / 2,
      -targetH,
      targetW,
      targetH
    );
    ctx.restore();

    if (goat.state === "charge") {
      ctx.fillStyle = "#fff6d2";
      ctx.font = "900 13px system-ui, sans-serif";
      ctx.fillText("CHARGE", goat.x + 34, goat.y - 7);
    }
  }

  function currentGoatFrame(goat) {
    if (goat.state === "charge") {
      return goatSprite.preparedFrames.run[Math.floor(performance.now() / 95) % 3];
    }
    if (goat.state === "walk") {
      return goatSprite.preparedFrames.walk[Math.floor(performance.now() / 140) % 4];
    }
    return goatSprite.preparedFrames.idle[Math.floor(performance.now() / 300) % 3];
  }

  function drawGoatFallback(goat) {
    const frame = Math.floor(performance.now() / 130) % 2;
    ctx.save();
    ctx.translate(goat.x + goat.w / 2, goat.y + goat.h / 2);
    ctx.scale(goat.facing, 1);
    ctx.translate(-goat.w / 2, -goat.h / 2);
    ctx.fillStyle = goat.state === "charge" ? "#e3e0d0" : "#f2eedc";
    roundRect(7, 16, 45, 25, 12);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(53, 15, 17, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#7b5b39";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(50, 3);
    ctx.quadraticCurveTo(45, -10, 39, 2);
    ctx.moveTo(58, 3);
    ctx.quadraticCurveTo(65, -10, 69, 2);
    ctx.stroke();
    ctx.fillStyle = "#1c1814";
    ctx.beginPath();
    ctx.arc(59, 14, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#5b4632";
    ctx.lineWidth = 6;
    const leg = frame ? 3 : -3;
    ctx.beginPath();
    ctx.moveTo(18, 38);
    ctx.lineTo(18 + leg, 50);
    ctx.moveTo(42, 38);
    ctx.lineTo(42 - leg, 50);
    ctx.stroke();
    if (goat.state === "charge") {
      ctx.fillStyle = "#fff6d2";
      ctx.font = "900 13px system-ui, sans-serif";
      ctx.fillText("CHARGE", 38, -3);
    }
    ctx.restore();
  }

  function drawPlayer(p) {
    const blink = p.invincible > 0 && Math.floor(performance.now() / 85) % 2 === 0;
    if (blink) return;

    if (!playerSprite.ready) {
      drawPlayerFallback(p);
      return;
    }

    const frame = currentPlayerFrame(p);
    const footX = p.x + p.w / 2;
    const footY = p.y + p.h + 5;
    const targetH = p.onGround ? 132 : 124;
    const targetW = frame.w * (targetH / frame.h);

    ctx.save();
    ctx.translate(footX, footY);
    ctx.scale(p.facing, 1);
    ctx.drawImage(
      frame.canvas,
      -targetW / 2,
      -targetH,
      targetW,
      targetH
    );

    if (p.swingTime > 0) {
      ctx.strokeStyle = "#8a552f";
      ctx.lineWidth = 6;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(16, -58);
      ctx.lineTo(74, -80);
      ctx.stroke();
    }
    ctx.restore();

    if (p.swingTime > 0) {
      const hit = swingBox();
      ctx.fillStyle = "rgba(255, 230, 92, 0.22)";
      roundRect(hit.x, hit.y, hit.w, hit.h, 12);
      ctx.fill();
    }
  }

  function currentPlayerFrame(p) {
    if (!p.onGround) {
      return p.vy < 0 ? playerSprite.preparedFrames.air[0] : playerSprite.preparedFrames.air[1];
    }
    if (Math.abs(p.vx) > 30) {
      return playerSprite.preparedFrames.run[Math.floor(performance.now() / 90) % 4];
    }
    return playerSprite.preparedFrames.idle[Math.floor(performance.now() / 240) % 4];
  }

  function drawPlayerFallback(p) {
    ctx.fillStyle = "#ee7d2a";
    roundRect(p.x, p.y + 22, p.w, p.h - 22, 8);
    ctx.fill();
    ctx.fillStyle = "#7a422a";
    ctx.beginPath();
    ctx.arc(p.x + p.w / 2, p.y + 18, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#f6bb2f";
    ctx.beginPath();
    ctx.moveTo(p.x + 4, p.y + 6);
    ctx.lineTo(p.x + 12, p.y - 8);
    ctx.lineTo(p.x + 21, p.y + 4);
    ctx.lineTo(p.x + 30, p.y - 8);
    ctx.lineTo(p.x + 39, p.y + 6);
    ctx.closePath();
    ctx.fill();
  }

  function drawProjectile(projectile) {
    if (collectibleSprite.ready) {
      const frame = collectibleSprite.preparedFrames.stones[0];
      ctx.save();
      ctx.translate(projectile.x + 8, projectile.y + 8);
      ctx.rotate(projectile.spin);
      ctx.drawImage(frame.canvas, -9, -9, 18, 18);
      ctx.restore();
      return;
    }

    ctx.save();
    ctx.translate(projectile.x + 8, projectile.y + 8);
    ctx.rotate(projectile.spin);
    ctx.fillStyle = "#8d8a80";
    roundRect(-8, -6, 16, 12, 5);
    ctx.fill();
    ctx.restore();
  }

  function drawParticle(particle) {
    ctx.globalAlpha = clamp(particle.life / 0.7, 0, 1);
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  function makeTransparentSheet(image) {
    const sheet = document.createElement("canvas");
    sheet.width = image.naturalWidth;
    sheet.height = image.naturalHeight;
    const sheetCtx = sheet.getContext("2d", { willReadFrequently: true });
    sheetCtx.drawImage(image, 0, 0);

    const imageData = sheetCtx.getImageData(0, 0, sheet.width, sheet.height);
    const data = imageData.data;
    const width = sheet.width;
    const height = sheet.height;
    const total = width * height;
    const visited = new Uint8Array(total);
    const queue = new Int32Array(total);
    let head = 0;
    let tail = 0;

    const enqueue = (index) => {
      if (visited[index]) return;
      const offset = index * 4;
      if (!isSheetBackground(data[offset], data[offset + 1], data[offset + 2], data[offset + 3])) return;
      visited[index] = 1;
      queue[tail] = index;
      tail += 1;
    };

    for (let x = 0; x < width; x += 1) {
      enqueue(x);
      enqueue((height - 1) * width + x);
    }
    for (let y = 0; y < height; y += 1) {
      enqueue(y * width);
      enqueue(y * width + width - 1);
    }

    while (head < tail) {
      const index = queue[head];
      head += 1;
      const x = index % width;
      const y = Math.floor(index / width);
      data[index * 4 + 3] = 0;
      if (x > 0) enqueue(index - 1);
      if (x < width - 1) enqueue(index + 1);
      if (y > 0) enqueue(index - width);
      if (y < height - 1) enqueue(index + width);
    }

    sheetCtx.putImageData(imageData, 0, 0);
    return sheet;
  }

  function prepareSpriteFrames(sprite, onReady = null) {
    const prepared = {};
    const jobs = [];
    for (const [stateName, frames] of Object.entries(sprite.frames)) {
      prepared[stateName] = new Array(frames.length);
      frames.forEach((frame, index) => {
        jobs.push(() => {
          prepared[stateName][index] = makeTransparentFrame(sprite.image, frame, sprite.maxFrameSize || 0);
        });
      });
    }

    let jobIndex = 0;
    const runNextJob = () => {
      if (jobIndex >= jobs.length) {
        sprite.preparedFrames = prepared;
        sprite.ready = true;
        if (onReady) onReady();
        return;
      }
      jobs[jobIndex]();
      jobIndex += 1;
      setTimeout(runNextJob, 0);
    };
    runNextJob();
  }

  function makeTransparentFrame(image, frame, maxFrameSize = 0) {
    const longestSide = Math.max(frame.w, frame.h);
    const scale = maxFrameSize && longestSide > maxFrameSize ? maxFrameSize / longestSide : 1;
    const targetW = Math.max(1, Math.round(frame.w * scale));
    const targetH = Math.max(1, Math.round(frame.h * scale));
    const frameCanvas = document.createElement("canvas");
    frameCanvas.width = targetW;
    frameCanvas.height = targetH;
    const frameCtx = frameCanvas.getContext("2d", { willReadFrequently: true });
    frameCtx.drawImage(image, frame.x, frame.y, frame.w, frame.h, 0, 0, targetW, targetH);

    const imageData = frameCtx.getImageData(0, 0, targetW, targetH);
    clearEdgeBackground(imageData, targetW, targetH);
    frameCtx.putImageData(imageData, 0, 0);
    return { canvas: frameCanvas, w: targetW, h: targetH };
  }

  function applyUiSprites() {
    const root = document.documentElement;
    root.style.setProperty("--ui-heart", `url("${frameToUrl(uiSprite.preparedFrames.heart[0])}")`);
    root.style.setProperty("--ui-jump", `url("${frameToUrl(uiSprite.preparedFrames.jumpButton[0])}")`);
    root.style.setProperty("--ui-swing", `url("${frameToUrl(uiSprite.preparedFrames.swingButton[0])}")`);
    root.style.setProperty("--ui-throw", `url("${frameToUrl(uiSprite.preparedFrames.throwButton[0])}")`);
    root.style.setProperty("--ui-mango-panel", `url("${frameToUrl(makeHudPanel(uiSprite.preparedFrames.mangoPanel[0], "mango"))}")`);
    root.style.setProperty("--ui-timer-panel", `url("${frameToUrl(makeHudPanel(uiSprite.preparedFrames.timerPanel[0], "timer"))}")`);
    document.body.classList.add("ui-sprites-ready");
  }

  function frameToUrl(frame) {
    return frame.canvas.toDataURL("image/png");
  }

  function makeHudPanel(frame, type) {
    const panel = document.createElement("canvas");
    panel.width = frame.w;
    panel.height = frame.h;
    const panelCtx = panel.getContext("2d");
    panelCtx.drawImage(frame.canvas, 0, 0);

    if (type === "mango") {
      coverPanelText(panelCtx, 228, 32, 420, 166);
    } else {
      coverPanelText(panelCtx, 176, 34, 268, 146);
    }

    return { canvas: panel, w: frame.w, h: frame.h };
  }

  function coverPanelText(panelCtx, x, y, w, h) {
    const texture = panelCtx.createLinearGradient(0, y, 0, y + h);
    texture.addColorStop(0, "#6c3715");
    texture.addColorStop(0.5, "#351707");
    texture.addColorStop(1, "#5c2c10");
    panelCtx.fillStyle = texture;
    roundRectPath(panelCtx, x, y, w, h, 20);
    panelCtx.fill();
    panelCtx.strokeStyle = "rgba(255, 188, 72, 0.22)";
    panelCtx.lineWidth = 4;
    panelCtx.stroke();
  }

  function clearEdgeBackground(imageData, width, height) {
    const data = imageData.data;
    const total = width * height;
    const visited = new Uint8Array(total);
    const queue = new Int32Array(total);
    let head = 0;
    let tail = 0;

    const enqueue = (index) => {
      if (visited[index]) return;
      const offset = index * 4;
      if (!isSheetBackground(data[offset], data[offset + 1], data[offset + 2], data[offset + 3])) return;
      visited[index] = 1;
      queue[tail] = index;
      tail += 1;
    };

    for (let x = 0; x < width; x += 1) {
      enqueue(x);
      enqueue((height - 1) * width + x);
    }
    for (let y = 0; y < height; y += 1) {
      enqueue(y * width);
      enqueue(y * width + width - 1);
    }

    while (head < tail) {
      const index = queue[head];
      head += 1;
      const x = index % width;
      const y = Math.floor(index / width);
      data[index * 4 + 3] = 0;
      if (x > 0) enqueue(index - 1);
      if (x < width - 1) enqueue(index + 1);
      if (y > 0) enqueue(index - width);
      if (y < height - 1) enqueue(index + width);
    }
  }

  function drawEnvSprite(frame, x, y, w, h) {
    ctx.drawImage(frame.canvas, x, y, w, h);
  }

  function drawEnvTiled(frame, x, y, w, h) {
    const tileW = Math.max(80, frame.w * (h / frame.h));
    for (let drawX = x; drawX < x + w; drawX += tileW) {
      const drawW = Math.min(tileW, x + w - drawX);
      ctx.drawImage(
        frame.canvas,
        0,
        0,
        frame.w * (drawW / tileW),
        frame.h,
        drawX,
        y,
        drawW,
        h
      );
    }
  }

  function drawParallaxStrip(frame, cam, speed, y, h) {
    const tileW = frame.w * (h / frame.h);
    const offset = -((cam * speed) % tileW);
    for (let x = offset - tileW; x < W + tileW; x += tileW) {
      ctx.drawImage(frame.canvas, x, y, tileW, h);
    }
  }

  function isSheetBackground(r, g, b, a) {
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    return a > 0 && r > 238 && g > 238 && b > 238 && max - min < 18;
  }

  function drawSign(sign) {
    if (environmentSprite.ready) {
      const frame = environmentSprite.preparedFrames.sign[0];
      drawEnvSprite(frame, sign.x - 14, sign.y - 4, 118, 134);
    } else {
      ctx.fillStyle = "#6b4328";
      ctx.fillRect(sign.x + 28, sign.y + 38, 8, 50);
      ctx.fillStyle = "#ffd77b";
      roundRect(sign.x, sign.y, 112, 44, 6);
      ctx.fill();
      ctx.strokeStyle = "#7b4e2d";
      ctx.lineWidth = 3;
      ctx.stroke();
    }

    if (Math.abs(state.player.x - sign.x) < 150) {
      const bubbleX = sign.x - 28;
      const bubbleY = sign.y - 86;
      const bubbleW = 280;
      const bubbleH = 56;
      ctx.fillStyle = "rgba(255, 250, 224, 0.96)";
      roundRect(bubbleX, bubbleY, bubbleW, bubbleH, 8);
      ctx.fill();
      ctx.strokeStyle = "rgba(77, 56, 27, 0.26)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = "#2c2417";
      ctx.font = "900 14px system-ui, sans-serif";
      wrapText(sign.text, bubbleX + 14, bubbleY + 23, bubbleW - 28, 16);
    }
  }

  function drawEndSign() {
    const signX = state.level.endX;
    ctx.fillStyle = "#614228";
    ctx.fillRect(signX + 24, GROUND_Y - 100, 12, 100);
    ctx.fillStyle = "#f9d052";
    roundRect(signX - 30, GROUND_Y - 122, 118, 46, 7);
    ctx.fill();
    ctx.strokeStyle = "#51412a";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = "#171512";
    ctx.font = "950 19px system-ui, sans-serif";
    ctx.fillText("END", signX + 9, GROUND_Y - 92);
  }

  function drawToast() {
    if (!state.toast.time) return;
    ctx.save();
    ctx.globalAlpha = clamp(state.toast.time, 0, 1);
    ctx.fillStyle = "rgba(23, 21, 18, 0.78)";
    roundRect(W / 2 - 120, 92, 240, 38, 8);
    ctx.fill();
    ctx.fillStyle = "#fff8d8";
    ctx.font = "900 18px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(state.toast.text, W / 2, 117);
    ctx.restore();
    ctx.textAlign = "left";
  }

  function drawMangoTree(x, y, scale) {
    if (mangoTreeSprite.ready) {
      drawMangoTreeSprite(x, y, scale);
      return;
    }

    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    if (environmentSprite.ready) {
      const trunk = environmentSprite.preparedFrames.trunk[0];
      drawEnvSprite(trunk, -42, -178, 84, 180);
    } else {
      ctx.fillStyle = "#6b4328";
        roundRect(-22, -168, 44, 168, 18);
      ctx.fill();
    }
    drawMangoCanopy(Math.abs(Math.round(x / 340)) % 3);
    ctx.restore();
  }

  function drawMangoTreeSprite(x, y, scale) {
    const frame = mangoTreeSprite.preparedFrames.tree[0];
    const targetW = 310 * scale;
    const targetH = targetW * (frame.h / frame.w);
    const baseOffset = 6 * scale;

    ctx.save();
    ctx.drawImage(
      frame.canvas,
      x - targetW / 2,
      y - targetH + baseOffset,
      targetW,
      targetH
    );
    ctx.restore();
  }

  function drawMangoCanopy(variant) {
    const blobs = [
      [-72, -188, 66, 48, "#1c6f3d"],
      [-38, -226, 68, 58, "#207f44"],
      [18, -225, 70, 55, "#238a4a"],
      [62, -188, 58, 49, "#1e7a42"],
      [-35, -165, 72, 58, "#1c743f"],
      [28, -156, 66, 52, "#1f7f45"],
      [-4, -198, 86, 62, "#248e4c"]
    ];

    ctx.save();
    ctx.shadowColor = "rgba(12, 42, 20, 0.26)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 8;
    for (const [x, y, rx, ry, color] of blobs) {
      drawCanopyBlob(x, y, rx, ry, color);
    }
    ctx.restore();

    const shadowBlobs = [
      [-72, -176, 52, 24],
      [-8, -152, 78, 28],
      [50, -178, 44, 24],
      [-24, -204, 72, 24]
    ];
    ctx.fillStyle = "rgba(7, 55, 28, 0.28)";
    for (const [x, y, rx, ry] of shadowBlobs) {
      ctx.beginPath();
      ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    const leaves = [
      [-90, -205, 1.05, -0.7, "#55b84c"],
      [-66, -236, 0.9, -0.15, "#8acb36"],
      [-28, -255, 0.95, 0.18, "#78bf36"],
      [22, -254, 1, -0.18, "#6fbf3b"],
      [66, -226, 0.95, 0.38, "#96d43d"],
      [87, -185, 0.9, 0.72, "#58ad43"],
      [42, -144, 0.82, -0.5, "#75bd35"],
      [-24, -136, 0.8, 0.46, "#86ca38"],
      [-78, -158, 0.84, -0.18, "#4fa444"],
      [8, -201, 0.86, 0.64, "#9edb40"],
      [-44, -190, 0.78, -0.56, "#62b23b"],
      [48, -202, 0.78, 0.22, "#55a845"]
    ];
    for (const leaf of leaves) drawCanopyLeaf(...leaf);

    const fruitSets = [
      [
        [-49, -208, 0.75, false, -0.22],
        [-2, -232, 0.78, true, 0.16],
        [48, -205, 0.7, false, 0.32],
        [-24, -166, 0.82, true, -0.34],
        [66, -166, 0.74, true, 0.12],
        [14, -184, 0.58, false, -0.1]
      ],
      [
        [-58, -216, 0.7, true, -0.26],
        [2, -238, 0.72, false, 0.08],
        [52, -210, 0.76, true, 0.28],
        [-38, -164, 0.65, false, 0.2],
        [26, -158, 0.82, true, -0.24],
        [76, -183, 0.56, false, 0.1]
      ],
      [
        [-64, -194, 0.66, false, -0.18],
        [-18, -230, 0.84, true, 0.2],
        [34, -226, 0.66, false, 0.34],
        [68, -174, 0.8, true, -0.16],
        [-6, -158, 0.72, true, 0.28],
        [-44, -176, 0.54, false, 0.04]
      ]
    ];
    for (const mango of fruitSets[variant]) drawTreeMango(...mango);

    const foregroundLeaves = [
      [-80, -174, 0.78, 0.34, "#2d8f42"],
      [-52, -148, 0.72, -0.34, "#58ad35"],
      [16, -143, 0.82, 0.14, "#67bb37"],
      [70, -184, 0.74, -0.52, "#3f9c40"],
      [22, -214, 0.7, -0.18, "#7bc63a"]
    ];
    for (const leaf of foregroundLeaves) drawCanopyLeaf(...leaf);
  }

  function drawCanopyBlob(x, y, rx, ry, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawCanopyLeaf(x, y, scale, rotation, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.scale(scale, scale);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(0, 0, 20, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(234, 255, 133, 0.5)";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(-14, 0);
    ctx.lineTo(14, 0);
    ctx.stroke();
    ctx.restore();
  }

  function drawTreeMango(x, y, scale, ripe, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.scale(scale, scale);

    const gradient = ctx.createLinearGradient(-8, -12, 11, 16);
    if (ripe) {
      gradient.addColorStop(0, "#ffe65b");
      gradient.addColorStop(0.48, "#ffb12b");
      gradient.addColorStop(1, "#e75b1a");
    } else {
      gradient.addColorStop(0, "#d6ef58");
      gradient.addColorStop(0.55, "#8fca32");
      gradient.addColorStop(1, "#3f8d2f");
    }
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(0, 0, 9, 14, -0.22, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = ripe ? "#7e4b16" : "#2d6423";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = "rgba(255, 255, 210, 0.55)";
    ctx.beginPath();
    ctx.ellipse(-3.5, -5, 2.7, 5.2, 0.35, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#226b31";
    ctx.beginPath();
    ctx.ellipse(4, -14, 7, 3.5, 0.38, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawHouse(x, y, size, wall, roof) {
    if (environmentSprite.ready && size >= 120) {
      const house = environmentSprite.preparedFrames.house[0];
      const targetW = size * 2.85;
      const targetH = targetW * (house.h / house.w);
      drawEnvSprite(house, x - 18, y + size * 0.78 - targetH, targetW, targetH);
      return;
    }

    ctx.fillStyle = wall;
    ctx.fillRect(x, y, size * 1.25, size * 0.75);
    ctx.fillStyle = roof;
    ctx.beginPath();
    ctx.moveTo(x - 10, y);
    ctx.lineTo(x + size * 0.62, y - size * 0.45);
    ctx.lineTo(x + size * 1.35, y);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#4f6e78";
    ctx.fillRect(x + size * 0.18, y + size * 0.22, size * 0.26, size * 0.25);
    ctx.fillStyle = "#6b4328";
    ctx.fillRect(x + size * 0.78, y + size * 0.2, size * 0.25, size * 0.55);
  }

  function drawPalm(x, y, scale) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.strokeStyle = "#7a552e";
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.moveTo(0, 60);
    ctx.quadraticCurveTo(-10, 10, 6, -70);
    ctx.stroke();
    ctx.fillStyle = "#2f8c4a";
    for (let i = 0; i < 7; i += 1) {
      ctx.save();
      ctx.translate(5, -72);
      ctx.rotate(-1.35 + i * 0.45);
      ctx.beginPath();
      ctx.ellipse(32, 0, 38, 9, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    ctx.restore();
  }

  function drawBananaPlant(x, y, scale) {
    if (treePiecesSprite.ready) {
      drawCloseForegroundLeaves(x, y, scale);
      return;
    }

    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.strokeStyle = "#3c7a36";
    ctx.lineWidth = 6;
    for (let i = 0; i < 6; i += 1) {
      ctx.save();
      ctx.rotate(-0.8 + i * 0.32);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -58);
      ctx.stroke();
      ctx.fillStyle = "#399b48";
      ctx.beginPath();
      ctx.ellipse(0, -62, 17, 42, 0.25, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    ctx.restore();
  }

  function drawCloseForegroundLeaves(x, y, scale) {
    const frames = [
      treePiecesSprite.preparedFrames.closeLeafA[0],
      treePiecesSprite.preparedFrames.closeLeafB[0],
      treePiecesSprite.preparedFrames.closeLeafC[0],
      treePiecesSprite.preparedFrames.closeLeafD[0],
      treePiecesSprite.preparedFrames.closeVineA[0],
      treePiecesSprite.preparedFrames.closeVineB[0]
    ];
    const index = Math.abs(Math.floor(x / 97)) % frames.length;
    const frame = frames[index];
    const targetH = 92 * scale;
    const targetW = frame.w * (targetH / frame.h);

    ctx.save();
    ctx.translate(x, y);
    if (index % 2 === 1) ctx.scale(-1, 1);
    ctx.drawImage(frame.canvas, -targetW / 2, -targetH, targetW, targetH);
    ctx.restore();
  }

  function drawBarrel(x, y) {
    ctx.fillStyle = "#9a6842";
    roundRect(x, y, 32, 36, 6);
    ctx.fill();
    ctx.strokeStyle = "#5f3b24";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x + 3, y + 10);
    ctx.lineTo(x + 29, y + 10);
    ctx.moveTo(x + 3, y + 27);
    ctx.lineTo(x + 29, y + 27);
    ctx.stroke();
  }

  function drawClothes(x, y) {
    ctx.fillStyle = "#f3d44d";
    ctx.fillRect(x, y + 4, 28, 22);
    ctx.fillStyle = "#d94b3d";
    ctx.fillRect(x + 36, y + 1, 24, 25);
  }

  function wrapText(text, x, y, maxWidth, lineHeight) {
    const words = text.split(" ");
    let line = "";
    for (const word of words) {
      const testLine = line + word + " ";
      if (ctx.measureText(testLine).width > maxWidth && line) {
        ctx.fillText(line, x, y);
        line = word + " ";
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, y);
  }

  function updateHud() {
    if (!state) return;
    const p = state.player;
    const mangoText = `${p.mangoes} / ${WIN_MANGOES}`;
    const timerText = formatTime(state.timeLeft);
    const stickText = `Stick: ${p.hasStick ? "Yes" : "No"}`;
    const stoneText = `Stones: ${p.stones}`;

    if (hudCache.mangoes !== mangoText) {
      hud.mangoes.textContent = mangoText;
      hudCache.mangoes = mangoText;
    }
    if (hudCache.timer !== timerText) {
      hud.timer.textContent = timerText;
      hudCache.timer = timerText;
    }
    if (hudCache.stick !== stickText) {
      hud.stick.textContent = stickText;
      hudCache.stick = stickText;
    }
    if (hudCache.stones !== stoneText) {
      hud.stones.textContent = stoneText;
      hudCache.stones = stoneText;
    }
    if (hudCache.health !== p.health) {
      hud.hearts.replaceChildren();
      for (let i = 0; i < 3; i += 1) {
        const heart = document.createElement("span");
        heart.className = `heart${i < p.health ? " full" : ""}`;
        hud.hearts.appendChild(heart);
      }
      hudCache.health = p.health;
    }
  }

  function formatTime(value) {
    const total = Math.max(0, Math.ceil(value));
    const minutes = Math.floor(total / 60).toString().padStart(2, "0");
    const seconds = (total % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  function aabb(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  }

  function approach(value, target, step) {
    if (value < target) return Math.min(value + step, target);
    if (value > target) return Math.max(value - step, target);
    return target;
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function roundRect(x, y, w, h, r) {
    roundRectPath(ctx, x, y, w, h, r);
  }

  function roundRectPath(targetCtx, x, y, w, h, r) {
    targetCtx.beginPath();
    targetCtx.moveTo(x + r, y);
    targetCtx.lineTo(x + w - r, y);
    targetCtx.quadraticCurveTo(x + w, y, x + w, y + r);
    targetCtx.lineTo(x + w, y + h - r);
    targetCtx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    targetCtx.lineTo(x + r, y + h);
    targetCtx.quadraticCurveTo(x, y + h, x, y + h - r);
    targetCtx.lineTo(x, y + r);
    targetCtx.quadraticCurveTo(x, y, x + r, y);
  }

  function loop(time) {
    const dt = Math.min(0.033, (time - lastTime) / 1000 || 0);
    lastTime = time;
    update(dt);
    draw();
    requestAnimationFrame(loop);
  }

  state = createState();
  updateHud();
  setMode("menu");
  requestAnimationFrame(loop);
})();
