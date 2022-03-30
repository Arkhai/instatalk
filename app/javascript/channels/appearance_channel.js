import consumer from "./consumer"

consumer.subscriptions.create("AppearanceChannel", {
  initialized() {
    this.update = this.update.bind(this)
  },

  connected() {
    this.install()
    this.update()
  },

  disconnected() {
    this.uninstall()
  },

  rejected() {
    this.uninstall()
  },

  update() {
    this.documentIsActive ? this.appear() : this.away()
  },

  appear: function() {
    this.perform("appear", { appearing_on: this.appearingOn })
  },

  install() {
    window.addEventListener("focus", this.update)
    window.addEventListener("blur", this.update)
    document.addEventListener("turbolinks:load", this.update)
    document.addEventListener("visibilitychange", this.update)
  },

  uninstall() {
    window.removeEventListener("focus", this.update)
    window.removeEventListener("blur", this.update)
    document.removeEventListener("turbolinks:load", this.update)
    document.removeEventListener("visibilitychange", this.update)
  },

  get documentIsActive() {
    return document.visibilityState == "visible" && document.hasFocus()
  },

  get appearingOn() {
    const element = document.querySelector("[data-appearing-on]")
    return element ? element.getAttribute("data-appearing-on") : null
  }
});
