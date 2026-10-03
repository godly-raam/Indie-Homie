import { useEffect } from "react";

export default function OnekoCat() {
  useEffect(() => {
    // Guard against multiple injections or multiple cats
    if (document.getElementById("oneko") || document.getElementById("oneko-script")) {
      return;
    }

    const script = document.createElement("script");
    script.id = "oneko-script";
    script.src = "/oneko/oneko.js";
    script.dataset.cat = "/oneko/oneko.gif";
    document.body.appendChild(script);
  }, []);

  return null;
}
