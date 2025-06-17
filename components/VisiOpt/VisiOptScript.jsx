"use client";

import { useEffect } from "react";
import { VisiOptConfig } from "./config";

/**
 * Base VisiOpt Script component that handles the core functionality
 * @param {Object} props - Component props
 * @param {number} props.pid - VisiOpt product ID
 * @param {number} [props.wid] - VisiOpt website ID
 * @param {number} [props.flickerTime] - Time in ms for flicker effect
 * @param {string} [props.flickerElement] - Element to apply flicker effect
 * @param {boolean} [props.debug] - Whether to show debug logs
 */
export default function VisiOptScript({
  pid,
  wid = VisiOptConfig.defaultWid,
  flickerTime = VisiOptConfig.defaultFlickerTime,
  flickerElement = VisiOptConfig.defaultFlickerElement,
  debug = VisiOptConfig.debug,
}) {
  useEffect(() => {
    // Skip execution during server-side rendering
    if (typeof window === "undefined") return;

    // Log when script is being loaded
    if (debug) {
      console.log(`VisiOpt script loading - PID: ${pid}, WID: ${wid}`);
      console.log(
        `VisiOpt script on page: ${window.location.pathname}${window.location.search}`
      );
    }

    // Define and execute the VisiOpt script
    window.visiopt_code =
      window.visiopt_code ||
      (function () {
        var visi_wid = wid,
          visi_pid = pid,
          visi_flicker_time = flickerTime,
          visi_flicker_element = flickerElement,
          c = false,
          d = document,
          visi_fn = {
            begin: function () {
              var a = d.getElementById("visi_flicker");
              if (!a) {
                var a = d.createElement("style"),
                  b =
                    visi_flicker_element +
                    "{opacity:0!important;background:none!important;}",
                  h = d.getElementsByTagName("head")[0];
                a.setAttribute("id", "visi_flicker");
                a.setAttribute("type", "text/css");
                if (a.styleSheet) {
                  a.styleSheet.cssText = b;
                } else {
                  a.appendChild(d.createTextNode(b));
                }
                h.appendChild(a);
              }
            },
            complete: function () {
              c = true;
              var a = d.getElementById("visi_flicker");
              if (a) {
                a.parentNode.removeChild(a);
              }
            },
            completed: function () {
              return c;
            },
            pack: function (a) {
              if (debug) console.log(`VisiOpt loading script from: ${a}`);
              var b = d.createElement("script");
              b.src = a;
              b.type = "text/javascript";
              b.onerror = function () {
                console.error("VisiOpt script failed to load");
                visi_fn.complete();
              };
              b.onload = function () {
                if (debug)
                  console.log(
                    `VisiOpt script successfully loaded - PID: ${visi_pid}`
                  );
              };
              d.getElementsByTagName("head")[0].appendChild(b);
            },
            init: function () {
              if (debug)
                console.log(
                  `VisiOpt init called - PID: ${visi_pid}, WID: ${visi_wid}`
                );
              visi_fn.begin();
              setTimeout(function () {
                if (debug) console.log("VisiOpt flicker timeout completed");
                visi_fn.complete();
              }, visi_flicker_time);
              this.pack(
                "https://visiopt.com/client/js_test/test." +
                  visi_wid +
                  "." +
                  visi_pid +
                  ".js"
              );
              return true;
            },
          };
        window.visiopt_code_status = visi_fn.init();
        return visi_fn;
      })();

    // Cleanup function (optional)
    return () => {
      // No cleanup needed as the script manages its own lifecycle
    };
  }, [pid, wid, flickerTime, flickerElement]); // Dependencies ensure script re-runs if props change

  return null; // This component doesn't render anything visible
}
