// Based on https://github.com/rackt/redux/issues/37#issue-85098222
import { combineReducers } from 'redux';

class ReducerRegistry {
  static _reducers;
  static _emitChange;

  register(newReducers) {
    this._reducers = {
      ...this._reducers,
      ...newReducers
    };
    if (this._emitChange != null) {
      this._emitChange(this.getReducers());
    }
  }

  setChangeListener(listener) {
    this._emitChange = listener
  }


  //----------------------//
  //        GETTERS       //
  //----------------------//
  getReducers() {
    return this._reducers;
  }


  /**
   * Replace the given reducers and update the store
   * @param  {object} store           Redux Store
   * @param  {object} updatedReducers Key value map of reducers to update
   */
  updateReducers(store, updatedReducers) {
    const currentReducers = this.getReducers();
    Object.keys(updatedReducers).forEach((reducer) => {
      if (!currentReducers[reducer])
        delete updatedReducers[reducer];
    });

    console.debug("UPDATE REDUCERS: ", updatedReducers);

    store.replaceReducer(combineReducers({
      ...currentReducers,
      ...updatedReducers
    }));
  }
}

export default new ReducerRegistry();
