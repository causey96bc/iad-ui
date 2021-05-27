import { observable, action, makeObservable, computed, autorun } from "mobx";

class SearchStore {
  matches = [];
  active = {};
  fetching =  false;
  hasSearched = false
  constructor() {
    makeObservable(this, {
      matches: observable,
      active: observable,
      fetching: observable,
      hasSearched: observable,
      setHasSearched: action,
      setFetching: action,
      setMatches: action,
      setActive: action,
      updateIndicators: action,
      hasActive: computed,
      getMatches: computed,
      selectAll: action,
    });
    autorun(this.logStoreDetails);
  }

  logStoreDetails = () => {
    console.log("store logger");
  };
  
  setHasSearched(isSearching){
    this.hasSearched = isSearching
  }

  setFetching(isFetching){
    this.fetching = isFetching
  }

  setActive(active) {
    this.active = active;
  }
  setMatches(matches) {
    this.matches = matches;
  }
  get getMatches(){
    return this.matches.length
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
  selectAll(names, checked){
    const newName = {}
      Object.keys(this.active.dl_selections).forEach((name) => {
        console.log("name", name);
        if (names.includes(name)){
      newName[name] = checked
      }else{
        newName[name] = this.active.dl_selections[name]
      }})
    this.active.dl_selections  = newName
  }
}


export default SearchStore