window.GSM={
  calculate(weight,length,width,unit){
    const l=UnitConverter.lengthToMeters(length,unit);
    const w=UnitConverter.lengthToMeters(width,unit);
    const area=l*w;
    return {lengthM:l,widthM:w,area,gsm:weight/area};
  }
};