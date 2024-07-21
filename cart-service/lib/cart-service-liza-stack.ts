import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';

export class CartServiceLizaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const cartServiceLambda = new lambda.Function(this,
      'CartServiceLambdaLiza', {
        handler: 'main.handler',
        runtime: lambda.Runtime.NODEJS_20_X,
        code: lambda.Code.fromAsset(path.join(__dirname + '/../../dist')),
        environment: {},
      }
    )

    const api = new apigateway.RestApi(this, 'CartServiceApiLiza', {
      restApiName: 'CartServiceApiLiza',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
      },
    });

    const apiResource = api.root.addProxy({
      defaultIntegration: new apigateway.LambdaIntegration(cartServiceLambda),
    });
  }
}
