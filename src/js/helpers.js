// Rejecta request nakon TIMEOUT_SECONDS sekundi
export const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error("Request timed out."));
    }, sec * 1000);
  });
};
