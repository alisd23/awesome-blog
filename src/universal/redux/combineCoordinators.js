import { Subject } from 'rxjs/Subject';
// Weird issue, needed to use observable operators on a subject
import { Observable } from 'rxjs/Rx';

/**
 * merges all delegators into a single delegator.
 */
export default (...coordinators) => {
  const dynamicCoordinators$ = new Subject();

  const coordinator = (actions, store) =>
    dynamicCoordinators$
      .mergeMap(dynamicC => dynamicC(actions, store))
      .merge(...(coordinators.map((coordinator) => coordinator(actions, store))));

  coordinator.addCoordinator = (newCoordinator) =>
    dynamicCoordinators$.next(newCoordinator);

  return coordinator;
};
