#!/bin/bash

npx google-closure-compiler \
--language_in ECMASCRIPT6_STRICT \
--language_out ECMASCRIPT5_STRICT \
--warning_level DEFAULT \
--compilation_level WHITESPACE_ONLY \
--isolation_mode IIFE \
--js "./../../lib/rune.js" \
--js "./../../src/scope/Manifest.js" \
--js "./../../src/data/resource/Requests.js" \
--js "./../../src/scene/game/Game.js" \
--js "./../../src/scene/menu/Menu.js" \
--js "./../../src/scene/highscore/Highscore.js" \
--js "./../../src/scene/setHighscore/setHighscore.js" \
--js "./../../src/scene/tutorial/Turorial.js" \
--js "./../../src/scene/gameOver/GameOver.js" \
--js "./../../src/player/Player.js" \
--js "./../../src/projectile/bullet/Bullet.js" \
--js "./../../src/projectile/thorn/Thorn.js" \
--js "./../../src/boost/Boost.js" \
--js "./../../src/stats/Score.js" \
--js "./../../src/stats/Lives.js" \
--js "./../../src/stats/Boostmeter.js" \
--js "./../../src/stats/KillScore.js" \
--js "./../../src/enemy/Enemy.js" \
--js "./../../src/enemy/bigplant/Bigplant.js" \
--js "./../../src/enemy/smallplant/Smallplant.js" \
--js "./../../src/enemy/smallplant/Thornbush.js" \
--js "./../../src/spawner/Spawner.js" \
--js "./../../src/system/Main.js" \
--js "./../../src/scope/Alias.js" \
--js_output_file "./../../dist/weeds.js";