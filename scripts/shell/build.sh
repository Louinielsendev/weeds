#!/bin/bash

npx google-closure-compiler \
--language_in ECMASCRIPT5_STRICT \
--language_out ECMASCRIPT5_STRICT \
--warning_level DEFAULT \
--compilation_level WHITESPACE_ONLY \
--isolation_mode IIFE \
--js "./../../lib/rune.js" \
--js "./../../src/scope/Manifest.js" \
--js "./../../src/data/resource/Requests.js" \
--js "./../../src/scene/game/Game.js" \
--js "./../../src/scene/gameOver/GameOver.js" \
--js "./../../src/player/Player.js" \
--js "./../../src/bullet/Bullet.js" \
--js "./../../src/boost/Boost.js" \
--js "./../../src/stats/Score.js" \
--js "./../../src/stats/Boostmeter.js" \
--js "./../../src/enemy/Enemy.js" \
--js "./../../src/spawner/Spawner.js" \
--js "./../../src/system/Main.js" \
--js "./../../src/scope/Alias.js" \
--js_output_file "./../../dist/weeds.js";