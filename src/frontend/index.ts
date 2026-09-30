// like privatebin, this stores the encryption key in the url as a hash
// so the client gets to deal with it
export function getKeyFromUrl() {
  const url = new URL(document.URL);
  return url.hash;
}
