// Demo-only access gate. Credentials are visible in client source, so this is not security.
(() => {
  const storageKey = "icc-nespresso-auth";
  const credentials = { username: "nespresso", password: "coffee" };
  const root = document.documentElement;
  const read = () => { try { return sessionStorage.getItem(storageKey) === "1"; } catch { return false; } };
  const write = (value) => { try { value ? sessionStorage.setItem(storageKey, "1") : sessionStorage.removeItem(storageKey); } catch { /* storage unavailable: gate re-shows on reload */ } };
  root.dataset.auth = read() ? "ok" : "locked";

  document.addEventListener("DOMContentLoaded", () => {
    const gate = document.querySelector("#auth-gate");
    const form = document.querySelector("#auth-form");
    const error = document.querySelector("#auth-error");
    const username = document.querySelector("#auth-username");
    if (!gate || !form) return;
    if (root.dataset.auth === "locked") username.focus();

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const values = new FormData(form);
      const valid = String(values.get("username")).trim().toLowerCase() === credentials.username && values.get("password") === credentials.password;
      if (!valid) {
        error.textContent = "Incorrect username or password.";
        form.password.value = "";
        form.password.focus();
        return;
      }
      error.textContent = "";
      form.reset();
      write(true);
      root.dataset.auth = "ok";
      document.querySelector("#icc-app")?.focus();
    });

    document.querySelector("#sign-out")?.addEventListener("click", () => {
      write(false);
      root.dataset.auth = "locked";
      username.focus();
    });
  });
})();
