import IRoutingState from './RoutingState';
import IGlobalState from './GlobalState';

interface IAppState {
  // Core reducers
  global: IGlobalState;
  routing: IRoutingState;

  // Additional
}

export default IAppState;
