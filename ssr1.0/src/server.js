/* server.js */
// const renderer = require('vue-server-renderer').createRenderer()
const server =  require('express')
const app = server()
const path = require('path');
const fs = require('fs');
const serverBundle = path.resolve(process.cwd(), 'serverDist', 'vue-ssr-server-bundle.json');
const {createBundleRenderer} = require('vue-server-renderer');

const clientManifestPath = path.resolve(process.cwd(), 'dist', 'vue-ssr-client-manifest.json');
const clientManifest = require(clientManifestPath);


const template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
const renderer = createBundleRenderer(serverBundle, {
    runInNewContext:false,
    template,  // 使用HTML模板
    clientManifest, // 将客户端的构建结果清单传入
});


app.use(server.static(path.resolve(process.cwd(), 'dist')));

// 服务端渲染
app.get('*', function(req, res) {
    const context = {
        url: req.url
    };
    console.log(req.url,2222)
    renderer.renderToString(context, (err, html) => {
        if (err) {
            console.log(err);
            res.send('500 server error');
            return;
        }
        res.send(html);
    })
});
app.listen(8080, () => {
    console.log('listen:8080');
});
