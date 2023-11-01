class PicoSPA {
  constructor() {
    this.routes = [];
  }

  set(path, handler) {
    this.routes.push({
      p: new URLPattern({ pathname: path }),
      h: handler,
    });
    return this;
  }

  get(url) {
    return {
      with: (args) => {
        const result = this.routes.find((route) => {
          const params = route.p.match(url);
          if (params) {
            return { handler: route.h, params, args };
          }
        });
        if (result) {
          result.handler({ context: result.params, args });
        }
      },
    };
  }
}
