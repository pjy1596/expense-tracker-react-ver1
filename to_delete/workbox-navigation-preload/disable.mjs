/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

import {logger} from 'workbox-core/_private/logger.mjs';

import {isSupported} from './isSupported.mjs';

import './_version.mjs';

/**
 * If the browser supports Navigation Preload, then this will disable it.
 *
 * @memberof workbox.navigationPreload
 */
function disable() {
  if (isSupported()) {
    self.addEventListener('activate', (event) => {
      event.waitUntil(
          self.registration.navigationPreload.disable().then(() => {
            if (process.env.NODE_ENV !== 'production') {
              logger.log(`Navigation preload is disabled.`);
            }
          })
      );
    });
  } else {
    if (process.env.NODE_ENV !== 'production') {
      logger.log(`Navigation preload is not supported in this browser.`);
    }
  }
}

export {disable};
