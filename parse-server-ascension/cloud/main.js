// It is best practise to organize your cloud functions group into their own file. You can then import them in your main.js.
require('./functions.js');
require('./student.js');
require('./unit.js');
require('./degree.js');
require('./course.js');
require('./teacher.js');
require('./nt_distributor.js');
require('./ascensionTitle.js');
require('./badge.js');
require('./trophy.js');
require('./cosmetic.js');
require('./house.js');
require('./request.js');
require('./global.js');

//Run this code to initialize global
Parse.Cloud.run("AddGlobal");
//Initialization
//Parse.initialize("myAppId", "jspass", "master");
//Parse.serverURL = 'http://localhost:1337/api';
