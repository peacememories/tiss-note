var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");

pageMod.PageMod({
  include: "https://tiss.tuwien.ac.at/education/favorites.xhtml*",
  contentScriptFile: [
    data.url("content-script.js")
  ],
  contentScriptWhen: "ready",
  attachTo: ["existing", "top"],
  contentScriptOptions: {
      notes: {
          '111034': 'test'
      }
  }
});
