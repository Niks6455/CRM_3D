export function asyncRoute(route) {
  return (req, res, next = console.error) => {
    return Promise.resolve(route(req, res, next)).catch((e) => {console.log(e); next(e)});
  };
}