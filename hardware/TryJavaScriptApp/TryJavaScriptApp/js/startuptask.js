// The Background Application template is documented at http://go.microsoft.com/fwlink/?LinkID=533884&clcid=0x409
(function () {
    "use strict";

    var i = 0;
    // TODO: Insert code here for the startup task
    setInterval(() => {
        console.log("Test message " + i++);
    }, 500);
})();
