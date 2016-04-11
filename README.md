# damson-server-http

Inherits [damson-server-core](https://github.com/damsonjs/damson-server-core)

## Information

<table>
<tr> 
<td>Package</td><td>damson-server-http</td>
</tr>
<tr>
<td>Description</td>
<td>Sample damson HTTP server</td>
</tr>
</table>

```javascript
var damsonServer = require('damson-server-http');
damsonServer.start(8080);
```

## start(port = 8080)

Starts HTTP server

### Routes
- /push?client=home-pc&task=send-message&driver=cli&message=Hello!
    ```javascript
    damsonServer.pushTask('home-pc', {
      task_name: 'send-message',
      options: {
        message: 'Hello!'
      },
      driver_name: 'cli'
    });
    response.end();
    ```

- /pop?client=home-pc
    ```javascript
    var task = damsonServer.popTask('home-pc');
    response.end(task);
    ```

- /ping
    ```javascript
    response.end('pong')
    ```