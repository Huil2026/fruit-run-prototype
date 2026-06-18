# Fruit Run Prototype

Playable browser prototype based on the Fruit Run PRD.

## Run

Open `index.html` in a browser, or use the localhost server started for this session:

`http://127.0.0.1:4173/`

## Controls

- Move: `A` / `D` or Arrow Keys
- Jump: `Space`
- Swing stick: `J`
- Throw stone: `K`

The on-screen buttons also support mobile-style input.

## Implemented MVP Scope

- Single Jamaican countryside side-scrolling level
- Chibi Huliganverse-inspired player using `assets/player-sprites.png`
- Player animation states: 4 idle frames, 4 run frames, 1 jump frame, 1 land/fall frame
- Goat enemy using `assets/goat-sprites.png`
- Goat animation states: 3 idle frames, 4 walk frames, 3 run/charge frames
- Dog enemy using `assets/dog-sprites.png`
- Dog animation states: 4 walk frames, 3 run/chase frames, 2 bark frames
- Environment tile sheet using `assets/environment-tiles.png`
- Environment pieces: grass/dirt platform tiles, branch logs, tree trunks, zinc fence, house, and signboard
- Collectible item sheet using `assets/collectibles.png`
- Collectible pieces: mango, guinep bunch, stick pickup, stone pile, and thrown stone art
- UI sprite sheet using `assets/ui-sprites.png`
- UI pieces: glossy hearts, wood stat panels, outlined arcade stat fonts, and round Jump/Swing/Throw buttons
- Building sprite sheet using `assets/buildings.png`
- Building pieces: resized Jamaican houses, bar/shop/market facades, and background community buildings
- Parallax background sheet using `assets/parallax-background.png`
- Parallax pieces: sky, mountain range, distant community, and foliage; existing zinc fence layer remains unchanged
- Code-rendered mango tree canopy with layered leaves plus green and ripe mangoes fitted into the tree
- Mango tree sprite using `assets/mango-tree.png`, scaled behind the platform layer with white background removed at runtime
- Tree pieces sheet using `assets/tree-pieces.png`; #8 close foreground leaves/vines replace procedural grass-like plant props
- Mobile/tablet optimizations: cropped/downscaled runtime frames, cached HUD updates, responsive HUD grid, expanded portrait playfield, touch-safe controls, and compact landscape layout
- Main menu uses compressed responsive poster art with large DOM buttons for keyboard, mouse, touch, and fullscreen play.
- Level 2: Market Ridge, with a new platform layout, higher branch paths, more gaps, new signs, refreshed mango/item placement, and extra dog/goat pressure
- Mango collection with `10 / 10` win target
- Stick pickup and short-range swing
- Stone piles and thrown projectiles
- Dog patrol/chase/bark behavior
- Goat walk/charge behavior
- Health, invincibility flash, timer, HUD, menus, win screen, and game over screen
- Parallax yard background with houses, zinc fences, clotheslines, hills, trees, and foliage
