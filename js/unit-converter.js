window.UnitConverter={
  lengthToYards(value,unit){
    if(unit==="yd") return value;
    if(unit==="in") return value/36;
    if(unit==="cm") return value/91.44;
    throw new Error("Unsupported length unit");
  },
  lengthToMeters(value,unit){
    if(unit==="m") return value;
    if(unit==="cm") return value/100;
    if(unit==="in") return value*0.0254;
    throw new Error("Unsupported length unit");
  }
};