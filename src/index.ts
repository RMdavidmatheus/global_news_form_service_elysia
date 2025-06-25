import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { formRoutes } from "./routes/form_data/form_data_route";

const app = new Elysia()

  //* Middleware to log the request
  .onRequest(({ request }) => {
    const { method, url } = request;
    const start = performance.now();
    Reflect.set(request, "__startTime", start);
    console.log(`📥 ${method} ${url}`);
  })

  //* Middleware to log the response
  .onAfterHandle(({ request, response }) => {
    const start = Reflect.get(request, "__startTime" || performance.now());
    const duration = performance.now() - start;
    const time =
      duration > 1000
        ? `${(duration / 1000).toFixed(2)}s`
        : `${duration.toFixed(2)}ms`;
    console.log(
      `✅ ${request.method} ${request.url} - ${
        (response as any)?.status ?? 200
      } - ⏱️ ${time}`
    );
  })

  //* Middleware to log the error
  .onError(({ code, error, request }) => {
    console.error(`❌ Error en ${request.method} ${request.url} - ${code}`);
    console.error(error);
    return {
      status: "error",
      message: "message" in error ? error.message : "Unknown error occurred",
    };
  })

  //* Swagger documentation
  .use(
    swagger({
      path: "/swagger",
      documentation: {
        info: {
          title: "Global News Form Service",
          version: "0.0.1",
          description: "This API is used to send emails to the clients and save data in the database",
          contact: {
            name: "Alejandro Mateus Martinez",
            url: "https://github.com/RMdavidmatheus/",
            email: "david.5.12@hotmail.com",
          },
          license: {
            name: "MIT",
            url: "https://opensource.org/licenses/MIT",
          },
        },
        servers: [
          {
            url: "http://localhost:3000",
            description: "Local server",
          },
        ],
        tags: [
          {
            name: "App",
            description: "This contains the application routes",
          },
        ],
      },
    })
  )

  //* Cors middleware
  .use(
    cors({
      origin: ["*"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
      maxAge: 86400,
    })
  )

  //* Form data routes
  .use(formRoutes)
  .get("/", () => "Service running ok 🚀🚀🚀")
  .head("/", () => new Response(null, { status: 200 }))
  //* Listen to port 10000
  .listen(process.env.PORT_APP || 10000);
//* Log the service running and the available endpoints
console.log(
  `Service running at ${app.server?.url} 🚀🚀🚀`
);

//* Log the available endpoints
console.log(`📡 Available endpoints:`)
app.routes.forEach((route) => {
  console.log(`🟢 [${route.method}] ${route.path}`);
});
