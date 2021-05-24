import { observable, action, makeObservable, computed, autorun } from "mobx";

class SearchStore {
  matches = [];
  active = {};
  constructor() {
    makeObservable(this, {
      matches: observable,
      active: observable,
      setMatches: action,
      setActive: action,
      updateIndicators: action,
      hasActive: computed,
    });
    autorun(this.logStoreDetails);
  }

  logStoreDetails = () => {
    console.log("store logger");
  };
  setActive(active) {
    this.active = active;
  }
  setMatches(matches) {
    this.matches = matches;
  }
  updateIndicators({name, value}) {
    const newActive = {};
    // Update the dl_selectors object for the given indicator
    Object.keys(this.active.dl_selections).map((indicator) => {
      newActive[indicator] = indicator === name ? value : this.active.dl_selections.hasOwnProperty(indicator) ? this.active.dl_selections[indicator] : false;
    });
    this.active.dl_selections = newActive;
  }
  get hasActive() {
    return Object.keys(this.active).length > 0 ? true : false
  }
}

export default SearchStore