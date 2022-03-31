import 'module-alias/register';
import { getServer } from './server';

const PORT = process.env.PORT || 4000;

getServer().then((server) => {
  server.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
  });
});
