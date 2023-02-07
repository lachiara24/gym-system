export class Cliente{
    key?: string | null
    id?: number;
    nombre: string;
    apellido: string;
    dni: string;
    dire?: string;
    obra?: string;
    isSelected?: boolean;
    pago?: Date;
    venc?: Date;

    constructor(){}
}