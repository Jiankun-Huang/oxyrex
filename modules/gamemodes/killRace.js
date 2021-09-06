/*jslint node: true */
/*jshint -W061 */
/*global goog, Map, let */
"use strict";
// General requires
require('google-closure-library');
goog.require('goog.structs.PriorityQueue');
goog.require('goog.structs.QuadTree');

const killRace = (function() {
    const teamNames = ["BLUE", "RED", "GREEN", "PURPLE"];
    const data = [0, 0, 0, 0];
    let gameWon = false;
    function getKillData(instance) {
        let killers = [];
        for (let i = 0; i < instance.collisionArray.length; i ++) {
            const killer = instance.collisionArray[i];
            if (killer.team < 0 && killer.team >= -c.TEAMS && killer.team !== instance.team) {
                killers.push(killer);
            }
        }
        if (killers.length) {
            registerKill(-killers[killers.length - 1].team - 1);
        }
    }
    function registerKill(teamID) {
        if (gameWon) return;
        sockets.broadcast(teamNames[teamID] + " scored!");
        data[teamID] ++;
        if (data[teamID] >= 25) {
            gameWon = true;
            sockets.broadcast(teamNames[teamID] + " has won!");
            setTimeout(closeArena, 2500);
        }
    }
    return {
        registerKill,
        getKillData,
        data
    };
})();

module.exports = {
    killRace
};