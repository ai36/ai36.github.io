/* My flair on StackOverflow */
const myFlairSOLink = document.createElement("a");
myFlairSOLink.href = "https://stackexchange.com/users/8266093";
myFlairSOLink.target = "_blank";
myFlairSOLink.innerHTML =
    '<style>a[href^="https://stackexchange.com"]{position:fixed;z-index:99999z-index:infinity;bottom:12px;right:20px;opacity:.5;-webkit-transition:.2s;-o-transition:.2s;transition:.2s;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}a[href^="https://stackexchange.com"]:hover{opacity:1}</style><img src="https://stackexchange.com/users/flair/8266093.png" width="208" height="58" alt="profile for Andrei Fedorov on Stack Exchange, a network of free, community-driven Q&amp;A sites" title="profile for Andrei Fedorov on Stack Exchange, a network of free, community-driven Q&amp;A sites">';
document.body.appendChild(myFlairSOLink);
