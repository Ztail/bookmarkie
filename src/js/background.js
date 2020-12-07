const setIcon = (isDark = false) => {
    chrome.storage.sync.get({
        iconType: 'star',
        iconStyle: 'dark',
        iconStyleAuto: true
    }, props => {
        if (props.iconStyleAuto) {
            if (isDark) {
                // set light-colored icon in dark UI
                chrome.browserAction.setIcon({ path: `/images/${props.iconType}-light-128.png`});
            } else {
                chrome.browserAction.setIcon({ path: `/images/${props.iconType}-dark-128.png`});
            }
        } else {
            chrome.browserAction.setIcon({ path: `/images/${props.iconType}-${props.iconStyle}-128.png`});
        }
    });   
};

// OS in dark mode or browser in incognito context
const isBrowserDark = window.matchMedia("(prefers-color-scheme: dark)").matches || chrome.extension.inIncognitoContext;
setIcon(isBrowserDark);

// Change the icon if the browser becomes dark
chrome.runtime.onMessage.addListener(message => {
    const isBrowserDark = message.isBrowserDark;
    setIcon(isBrowserDark);
});

// add link to Chrome bookmark manager to context menu
chrome.contextMenus.create({
    "title": chrome.i18n.getMessage('viewBookmarksOnChrome'),
    "contexts": ["browser_action"],
    "onclick": () => {
      chrome.tabs.create({ url: "chrome://bookmarks" });
    }
});