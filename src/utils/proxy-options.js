// Proxy middleware untuk development di localhost
// Dan mencegah API yang dari pihak ketiga terkena CORS.
// Ketika dipakai ntuk mode development
// https://davidwalsh.name/simple-node-js-proxy
// https://create-react-app.dev/docs/proxying-api-requests-in-development/
// https://github.com/chimurai/http-proxy-middleware
import { createProxyMiddleware } from 'http-proxy-middleware';

// proxy middleware options
const options = {
    target: 'http://www.example.org', // target host
    changeOrigin: true, // needed for virtual hosted sites
    ws: true, // proxy websockets
    pathRewrite: {
        '^/api/old-path': '/api/new-path', // rewrite path
        '^/api/remove/path': '/path', // remove base path
    },
    router: {
        // when request.headers.host == 'dev.localhost:3000',
        // override target 'http://www.example.org' to 'http://localhost:8000'
        'dev.localhost:3200': 'http://localhost:8200',
    },
};

const proxyMiddleware = createProxyMiddleware(options);
export { proxyMiddleware };
