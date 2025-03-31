export function getBackendUrl(){
  const url = import.meta.env.VITE_SOCKET_URL;
  const port = import.meta.env.VITE_SOCKET_PORT || '';
  return url == 'localhost' ? `http://${window.location.hostname}:${port}` : url;
}
