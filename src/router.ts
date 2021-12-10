function Router() {
  const listeners: object[] = [];
  let currentPath = location.pathname;
  let previousPath: any = null;

  const isMatch = (match: any, path: any) =>
    (match instanceof RegExp && match.test(path)) ||
    (typeof match === "function" && match(path)) ||
    (typeof match === "string" && match === path);

  const handleListener = ({ match, onEnter, onLeave }) => {
    const args = { currentPath, previousPath, state: history.state };
    isMatch(match, currentPath) && onEnter(args);
    onLeave && isMatch(match, previousPath) && onLeave();
  };

  const handleAllListeners = () => listeners.forEach(handleListener);

  const on = (match, onEnter, onLeave) => {
    const listener = { match, onEnter, onLeave };
    listeners.push(listener);
    handleListener(listener);
  };

  const go = (url, state) => {
    previousPath = currentPath;
    history.pushState(state, url, url);
    currentPath = location.pathname;
    handleAllListeners();
  };

  window.addEventListener("popstate", handleAllListeners);

  return { on, go };
}

const createRender =
  (content) =>
  (...args) => {
    console.info(`${content} args=${JSON.stringify(args)}`);
    document.getElementById("root").innerHTML = `<h2>${content}</h2>`;
  };

const router = Router();

router.on(/.*/, createRender("/.*"));
router.on(
  (path) => path === "/contacts",
  createRender("/contacts"),
  createRender("[leaving] /contacts")
);
router.on("/about", createRender("/about"));
router.on("/about/us", createRender("/about/us"));

document.body.addEventListener("click", (event) => {
  if (!event.target.matches("a")) {
    return;
  }
  event.preventDefault();
  const url = event.target.getAttribute("href");
  router.go(url);
});
