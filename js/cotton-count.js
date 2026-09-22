window.CottonCount={
  standard:[6,8,10,12,16,20,24,26,28,30,32,34,36,40,44,50,60,70,80],
  calculate(length,unit,weight){
    const yards=UnitConverter.lengthToYards(length,unit);
    const ne=(yards*453.59)/(840*weight);
    const nearest=this.standard.reduce((a,b)=>Math.abs(b-ne)<Math.abs(a-ne)?b:a);
    return {yards,ne,nearest};
  }
};