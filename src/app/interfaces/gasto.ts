export interface Gasto {
    tipo        : string;
    fecha       : string;
    motivo      : string;
    monto       : number;
    factura     : string;
    observacion : string;
    latitud     : string;
    longitud    : string;
    rutProveedor: string;
    proveedor   : string;
}

export interface GastoTemp {
    tipo        : string;
    fecha       : string;
    motivo      : string;
    monto       : number;
    factura     : string;
    observacion : string;
    latitud     : string;
    longitud    : string;
    rutProveedor: string;
    proveedor   : string;
    photo       : string; 
}
