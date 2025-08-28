export default function listRoutes(app: any, prefix = "") {
  const routes: string[] = [];

  app._router.stack.forEach((middleware: any) => {
    if (middleware.route) {
      // Direct route
      const methods = Object.keys(middleware.route.methods)
        .map((m) => m.toUpperCase())
        .join(", ");
      routes.push(`${methods} ${prefix}${middleware.route.path}`);
    } else if (middleware.name === "router") {
      // Mounted router
      const newPrefix = middleware.regexp.source
        .replace("^\\", "")
        .replace("\\/?(?=\\/|$)", "")
        .replace(/\\\//g, "/");
      middleware.handle.stack.forEach((handler: any) => {
        if (handler.route) {
          const methods = Object.keys(handler.route.methods)
            .map((m) => m.toUpperCase())
            .join(", ");
          routes.push(`${methods} ${prefix}${newPrefix}${handler.route.path}`);
        }
      });
    }
  });

  console.log("Registered routes:");
  routes.forEach((r) => console.log(r));
}
