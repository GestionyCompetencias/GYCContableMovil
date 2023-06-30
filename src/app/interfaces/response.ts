export interface ApiResponse {
    info: Info
}

interface Info{
    result: number;
    mensaje: string;
    data: any;
}
