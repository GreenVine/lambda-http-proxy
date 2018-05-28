import fetch from 'node-fetch';
import { Handler } from 'aws-lambda';

export const proxyHandler: Handler = async (ev, _, cb) => {
  const { httpMethod, headers, body } = ev;
  
  if (!httpMethod || !headers) {
    return cb(null, {
      statusCode: 400,
      body: JSON.stringify({
        error: true,
        message: 'Invalid Request'
      })
    });
  } else {
    delete headers.Host;
  }

  const originUrl = headers['x-origin-url'];

  if (!originUrl) {
    return cb(null, {
      statusCode: 417,
      body: JSON.stringify({
        error: true,
        message: 'Invalid Origin URL'
      })
    });
  }

  const proxy = await fetch(originUrl, {
    headers,
    method: httpMethod,
    body: body || undefined
  });

  const buffer = await proxy.buffer();
  const respHeaders: {[key: string]: string | number | boolean} = {};
  proxy.headers.forEach((val, name) => {
    respHeaders[name] = val;
  });

  const response = {
    statusCode: proxy.status,
    body: buffer.toString('base64'),
    headers: respHeaders,
    isBase64Encoded: true
  };

  return cb(null, response);
};

export default proxyHandler;