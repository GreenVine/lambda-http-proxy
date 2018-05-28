# Lambda HTTP Proxy

An [AWS Lambda](https://aws.amazon.com/lambda/) function with Serverless integration that enables you proxy your HTTP/S requests through [API Gateway](https://aws.amazon.com/api-gateway/).

## Usage

(TBC)

## Environment Variables

```bash
export API_DOMAIN=proxy.example.com # API Gateway Endpoint Domain

export AWS_REGION=us-west-2 # Deployment Region

export API_CERT_NAME=*.example.com # API Certificate Name (Best match)

# Stage name
export API_STAGE=v1
```

## Deployment

### SSL Certificate

The environment variable `API_CERT_NAME` specifies the certificate name for API Gateway custom domain. The Serverless plugin will do the best-match over this name. Refer to [serverless-domain-manager plugin documentation](https://github.com/amplify-education/serverless-domain-manager) for detailed guidance.

### Custom Domain

#### Set up

To set up the custom domain for API Gateway, simply run `yarn run sls create_domain` once.

In addition, please note that this command cannot modify the existing custom domain that created by other means, through e.g. AWS Console, API.

Sample Output:
`
Serverless: 'proxy.example.com' was created/updated. New domains may take up to 40 minutes to be initialized.
`

#### Tear Down

To remove the custom domain, run `yarn run sls delete_domain` once.

### Deploy Project

To deploy or update the project, run `yarn run sls deploy`.

### Destroy Project

:warning: To destroy all resources, run `yarn run sls remove`. **Be careful when running this command towards a production stage name**.

## References

### AWS as the Provider

- [Quick Start Guide](https://serverless.com/framework/docs/providers/aws/guide/quick-start/)

- Serverless Config: [serverless.yml](https://serverless.com/framework/docs/providers/aws/guide/serverless.yml)

- [API Gateway Events](https://serverless.com/framework/docs/providers/aws/events/apigateway)