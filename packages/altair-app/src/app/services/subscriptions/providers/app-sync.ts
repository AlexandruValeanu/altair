import { SubscriptionProvider, SubscriptionProviderExecuteOptions } from '../subscription-provider';
import { Observable, of } from 'rxjs';
import { createAuthLink } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink } from '@apollo/client/core';
import { parse } from 'graphql';

export class AppSyncSubscriptionProvider extends SubscriptionProvider {
  subscription?: any;

  /**
  {
    "aws_project_region": "us-west-2",
    "aws_appsync_graphqlEndpoint": "https://....appsync-api.us-west-2.amazonaws.com/graphql",
    "aws_appsync_region": "us-west-2",
    "aws_appsync_authenticationType": "API_KEY",
    "aws_appsync_apiKey": "..."
  }
   */

  execute(options: SubscriptionProviderExecuteOptions) {
    const url = this.connectionParams.aws_appsync_graphqlEndpoint;
    const region = this.connectionParams.aws_appsync_region;
    const auth = {
      type: this.connectionParams.aws_appsync_authenticationType,
      apiKey: this.connectionParams.aws_appsync_apiKey,
    };

    const httpLink = createHttpLink({ uri: url });

    const link = ApolloLink.from([
      createAuthLink({ url, region, auth }),
      createSubscriptionHandshakeLink(url, httpLink),
    ]);

    const client = new ApolloClient({
      link,
      cache: new InMemoryCache()
    });

    const subscription = client.subscribe({
      query: parse(options.query),
      variables: options.variables
    })
    return new Observable((subscriber) => {
      this.subscription = subscription.subscribe({
        next: (...args: any[]) =>  subscriber.next(...args),
        error: (...args: any[]) => subscriber.error(...args),
        complete: () => subscriber.complete(),
      });
    });
  }

  close() {
    this.subscription?.unsubscribe();
  }
}
