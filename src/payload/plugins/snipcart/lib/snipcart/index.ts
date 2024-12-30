import * as deployment from './deployment'
import * as domain from './domain'
import * as project from './project'
import * as proxy from './proxy'
import * as service from './service'
import * as template from './template'
import * as usage from './usage'
import * as variable from './variable'
import * as volume from './volume'
import * as webhook from './webhook'

// Defining the railwayClient type by inferring types from the imported modules
export type RailwayClientType = {
  project: typeof project
  webhook: typeof webhook
  service: typeof service
  variable: typeof variable
  template: typeof template
  domain: typeof domain
  deployment: typeof deployment
  usage: typeof usage
  volume: typeof volume
  proxy: typeof proxy
}

// Creating the railwayClient instance with the defined type
export const railwayClient: RailwayClientType = {
  project,
  webhook,
  service,
  variable,
  template,
  domain,
  deployment,
  usage,
  volume,
  proxy,
}
