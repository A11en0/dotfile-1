/**
 * @description all the DOM elements in popup (index.html)
 */
var toggleSwitch = document.getElementById('myonoffswitch'),
  filterUrlInput = document.getElementById('filterRequest'),
  filterUrlConfirm = document.getElementById('apply-filter'),
  tickIcon = document.getElementById('tick-icon'),
  filteredRequests = document.getElementById('filtered-requests'),
  isPostmanOpenMessage = document.getElementById('postman-not-open'),
  isPostmanEnabledMessage = document.getElementById('postman-not-enabled'),

  /**
   * @description this port is available as soon as popup is opened
   */
  popupPort = chrome.runtime.connect({name: 'POPUPCHANNEL'}),

  /**
   * @description DOM element for appending log messages
   */
  loggerList = document.getElementById('logger'),

  /**
   * @description Options which are shared with Background Page.
   */
  appOptions = {
    toggleSwitchState: false,
    filterRequestUrl: '.*'
  },

  isPostmanOpen = true;
isPostmanOpenMessage.style.display = 'none';

/**
 * @description get the value of toggleSwitch from localStorage and sets it.
 * It's basically defines the request capture mode.
 */
toggleSwitch.checked = localStorage.getItem('toggleSwitchState') === 'true';

/**
 *
 * @param {Deque} items array of log messages(captured requests)
 * @param {object} container div where log is displayed as ordered list.
 * @description takes an array of log messages and appends in the container
 */
function showLogs (items, container) {
  container.innerHTML = ''; // clear it first
  var i, entry, node;
  for (i = 0; i < items.length; i++) {
    entry = document.createElement('li');
    node = document.createElement('div');
    node.innerHTML = items[i];
    entry.appendChild(node);
    container.appendChild(entry);
  }
}

function setOptions (options) {
  if (options.isCaptureStateEnabled) {
    filteredRequests.className = 'show';
  }
  else {
    filteredRequests.className = 'hide';
  }

  toggleSwitch.checked = appOptions.toggleSwitchState = options.isCaptureStateEnabled;
  filterUrlInput.value = options.filterRequestUrl;

  localStorage.setItem('toggleSwitchState', toggleSwitch.checked);
}

function setPostmanMessage () {
  if (isPostmanOpen) {
    isPostmanOpenMessage.style.display = 'none';
  }
  else {
    isPostmanOpenMessage.style.display = 'block';
  }
}

function setTickIconVisibility () {
  tickIcon.className = 'show';
  setInterval(function () {
    tickIcon.className = 'hide';
  }, 2000);
}

/**
 * @description used to create long-lived connection to the background channel
 * with port name 'BACKGROUNDCHANNEL'
 * The channel name allows you to distinguish
 * between different types of connections say 'POPUPCHANNEL' and 'BACKGROUNDCHANNEL'
 */

chrome.runtime.onConnect.addListener(function (port) {
  console.assert(port.name === 'BACKGROUNDCHANNEL');
  console.log('Connected to background');

  port.onMessage.addListener(function (msg) {
    if (msg.logcache) {
      showLogs(msg.logcache.items, loggerList); // msg is a array of log messages
    }
    else if (msg.options) {
      setOptions(msg.options);

      console.log('Received message options', msg.options);
    }
    if (msg.type === 'secretKey') {
      if (msg.key) {
        console.log('Retrieved Encryption Key : ', msg.key);
      }
    }
    if (msg.type === 'backgroundLog') {
      console.log(msg.backgroundMessage);
    }
    if (msg.isPostmanOpen === true) {
      isPostmanOpen = true;
    }
    else if (msg.isPostmanOpen === false) {
      isPostmanOpen = false;
    }

    if (msg.isPostmanEnabledWarning === true) {
      isPostmanEnabledMessage.style.display = 'block';
    }
    else if (msg.isPostmanEnabledWarning === false) {
      isPostmanEnabledMessage.style.display = 'none';
    }
    setPostmanMessage();
  });

});

toggleSwitch.addEventListener('click', function () {
  appOptions.toggleSwitchState = !appOptions.toggleSwitchState;
  popupPort.postMessage({options: appOptions});

  if (appOptions.toggleSwitchState) {
    filteredRequests.className = 'show';
  }
  else {
    filteredRequests.className = 'hide';
  }

  localStorage.setItem('toggleSwitchState', appOptions.toggleSwitchState);
}, false);

filterUrlConfirm.addEventListener('click', function () {
  appOptions.filterRequestUrl = filterUrlInput.value;
  setTickIconVisibility();
  popupPort.postMessage({options: appOptions});
});

/**
 * @description methods to set/retrieve the key which is used for
 * encryption/decryption in Native App <> Interceptor Communication
 */
// disabling this rule as this API is used via console
// eslint-disable-next-line no-unused-vars
const pm = {
  interceptorBridge: {
    // updates the encryption key
    // sends the secret key to BACKGROUND CHANNEL where the key is set in chrome's local storage
    setKey: function (key) {

      if (typeof key !== 'string') {
        return 'Expected a string as argument, please provide the key enclosed in quotes as an argument';
      }
      // trimming the whitespaces
      key = key.trim();
      if (!key) {
        return 'Expected an argument, please provide key as argument';
      }
      popupPort.postMessage({ type: 'setKey', secretKey: key });
      return 'setting encryption key ...';
    },
    // sends message to BACKGROUND CHANNEL to retrieve the current encryption key from chrome's local storage
    getKey: function () {
      if (arguments.length !== 0) {
        return 'No arguments should be passed';
      }
      popupPort.postMessage({ type: 'getKey' });
      return 'fetching encryption key ...';
    }
  }
};
