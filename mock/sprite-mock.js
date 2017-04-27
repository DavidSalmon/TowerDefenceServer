/**
 * Created by David Salmon on 26/04/2017.
 */
const Monster = require('../Entities/monster')
const Character = require('../Entities/character')
const Texture = require('../Entities/texture')
 module.exports = {
    characters : [
        new Character(1,'character character-medium-1'),
        new Character(1,'character character-medium-2'),
        new Character(1,'character character-medium-3'),
        new Character(1,'character character-medium-4')
    ],
    monsters : [
        new Monster(1,'monster-1'),
        new Monster(1,'monster-2'),
        new Monster(1,'monster-3'),
        new Monster(1,'monster-4'),
        new Monster(1,'monster-5')
    ],

     textures : [
         new Texture('texture grass-1',false),
         new Texture('texture grass-2',false),
         new Texture('texture path-1',true),
         new Texture('texture path-2',true)
     ]



}