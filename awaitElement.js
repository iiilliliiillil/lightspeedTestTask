const WaitElement = function (selector, options = {}) {
  const { targetNode = document.body, timeout = 10000 } = options;

  return new Promise((resolve, reject) => {
    const element = targetNode.querySelector(selector);

    if (element) {
      resolve(element);
      return;
    }

    const observer = new MutationObserver((_, observer) => {
      const element = targetNode.querySelector(selector);

      if (element) {
        resolve(element);
        clearTimeout(timerId);
        observer.disconnect();
      }
    });

    const timerId = setTimeout(() => {
      const err = new Error(`Element '${selector}' not found`);
      reject(err);
      observer.disconnect();
    }, timeout);

    observer.observe(targetNode, {
      childList: true,
      subtree: true,
    });
  });
};

WaitElement("#tea", {
  targetNode: document.querySelector("#beverages"),
  timeout: 5000,
})
  .then(console.log)
  .catch(console.error);
