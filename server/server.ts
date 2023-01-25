import {Application} from './deps.ts';
import router from './routes.ts';
const port = Deno.env.get('PORT') || 4000;

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server running on port ${port}`);

await app.listen({port: +port});
