window.AppDB={
  key:"textileEngineeringHistoryV1",
  get(){try{return JSON.parse(localStorage.getItem(this.key)||"[]")}catch(e){return[]}},
  add(item){const data=this.get();data.unshift({...item,time:new Date().toISOString()});localStorage.setItem(this.key,JSON.stringify(data.slice(0,50)))},
  clear(){localStorage.removeItem(this.key)}
};