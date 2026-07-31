import { defineConfig } from "wxt";

export default defineConfig({
  manifestVersion: 3,
  targetBrowsers: ["chrome", "edge", "firefox", "safari"],
  manifest: ({ browser }) => ({
    name: "WindowDiffer",
    description: "Find globals a page adds to or changes on the window object.",
    version: "1.0.0",
    homepage_url: "https://github.com/jonluca/Window-Differ",
    permissions: ["activeTab", "scripting"],
    action: {
      default_title: "Inspect page globals",
      default_icon: {
        32: "images/icon32.png",
        64: "images/icon64.png",
        128: "images/icon128.png"
      }
    },
    icons: {
      32: "images/icon32.png",
      64: "images/icon64.png",
      128: "images/icon128.png"
    },
    ...(browser === "firefox"
      ? {
          browser_specific_settings: {
            gecko: {
              id: "window-differ@jonlu.ca",
              strict_min_version: "140.0",
              data_collection_permissions: { required: ["none"] }
            },
            gecko_android: {
              strict_min_version: "142.0"
            }
          }
        }
      : {})
  })
});
