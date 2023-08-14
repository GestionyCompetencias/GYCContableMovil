export interface Gasto {
    tipo        : string;
    fecha       : string;
    motivo      : string;
    monto       : number;
    factura     : string;
    observacion : string;
    latitud     : string;
    longitud    : string;
    rut         : string;
    proveedor   : string;
}

export interface GastoTemp {
    tipo        : number;
    tipoDoc     : number;
    fecha       : string;
    motivo      : string;
    monto       : number;
    factura     : string;
    observacion : string;
    latitud     : number;
    longitud    : number;
    rut         : string;
    proveedor   : string;
    photo       : string; 
}

export interface GastoApi{
    id          : number;
    tipogasto   : number;
    fecha       : string;
    rutprov     : string;
    razonsocial : string;
    motivogasto : string;
    tipodoc     : number;
    docnro      : string;
    monto       : number;
    observ      : string;
    habilitado  : number;
    aprobado    : number;
    motivo      : string;
    origen      : number;
    usuario     : string;
    fregistro   : string;
    hregistro   : string,
    longitud    : number;
    latitud     : number;
    dispositivo : string;
    photo?      : string;
  }

  interface Hrehistro {
    ticks: string;
  }
