/*
    You can put here global functions/variables which can be called by all cloud functions

    WARNINGS:
    -   NOT SURE IF GLOBAL VARIABLES SAVES UPON CHANGING -> POSSIBLE ERROR IN cosmetic.js "SetDefaultCosmetic" function

    Example to put variable:
    exports.foo = 5;

    For functions:
    exports.func = function(x){
        return x+1;
    }

    To access them:
    var Global = require('./global');
    console.log(Global.foo); //logs 5
    console.log(Global.func(10)); //logs 11
*/

exports.defaultAvatarID = "1";
exports.defaultFrameID = "2";
exports.defaultCoverPhotoID = "3";
exports.defaultBannerID = "4";

exports.getDefaultCosmeticID = function(CosmeticType){
    if(CosmeticType === "Avatar"){
        return this.defaultAvatarID;
    }
    else if(CosmeticType === "Frame"){
        return this.defaultFrameID;
    }
    else if(CosmeticType === "CoverPhoto"){
        return this.defaultCoverPhotoID;
    }
    else if(CosmeticType === "Banner"){
        return this.defaultBannerID;
    }
    return "";
}