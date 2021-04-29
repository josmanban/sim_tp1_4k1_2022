class CongruencialMixto {
    
    constructor(x0,k,g,c){
        this.a = this.calcularA(k);
        this.m = this.calcularM(g);
        this.c = c;
        this.x0 = x0;
    }

    calcularA = k => {
        return 4*k+1;
    }

    calcularM = g => {
        return Math.pow(2,g);
    }

    calcularNextXi = (xi) => {
        console.log(xi);
        return (this.a*xi+this.c)%this.m;
    }

    calcularRandom = (xi) => {
        return xi/(this.m-1);
    }
    
    toString = ()=>{
        return this.a+' '+this.m+' '+this.c;
    }
}

export {CongruencialMixto};

class CongruencialMultiplicativo {
    
    constructor(x0,k,g){
        this.a = this.calcularA(k);
        this.m = this.calcularM(g);
        this.x0 = x0;
    }

    calcularA = k => {
        return 8*k+3;
    }

    calcularM = g => {
        return Math.pow(2,g);
    }

    calcularNextXi = (xi) => {
        return (this.a*xi)%this.m;
    }

    calcularRandom = (xi) => {
        return xi/(this.m-1);
    }

    toString = ()=>{
        return this.a+' '+this.m;
    }
    
}

export {CongruencialMultiplicativo};

