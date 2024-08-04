import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dotenv from 'dotenv';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';

dotenv.config();

export class CartServiceLizaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const { PG_PORT = '', PG_HOST = '', PG_DB = '', PG_USER = '', PG_PASS='' } = process.env;

    const cartServiceLambda = new lambda.Function(this,
      'CartServiceLambdaLiza', {
        handler: 'main.handler',
        runtime: lambda.Runtime.NODEJS_20_X,
        code: lambda.Code.fromAsset(path.join(__dirname + '/../../dist')),
        environment: {
          PG_PORT,
          PG_HOST,
          PG_DB,
          PG_USER,
          PG_PASS,
        },
        timeout: cdk.Duration.seconds(10),
      }
    )

    const api = new apigateway.RestApi(this, 'CartServiceApiLiza', {
      restApiName: 'CartServiceApiLiza',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
      },
    });

    api.root.addProxy({
      defaultIntegration: new apigateway.LambdaIntegration(cartServiceLambda),
    });

    new cdk.CfnOutput(this, 'CartServiceUrlLiza', {
      value: api.url,
    });
  }
}
