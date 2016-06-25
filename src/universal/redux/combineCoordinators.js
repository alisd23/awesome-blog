import { Subject } from 'rxjs/Subject';

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
