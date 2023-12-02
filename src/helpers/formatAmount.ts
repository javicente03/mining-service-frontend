export const formatAmount = (amount: number = 0): string => {
    // Retornar en formato: $ 1.000.000
    return `$ ${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
}

export const formatTpoReal = (tpo: number) => {
    // Debe quedar algo como: 
    // Tpo Real: ${tpo}hrs
    // Tpo Real: 4hrs
    // Si es 0, Tpo Real:
    return tpo === 0 ? 'Tpo Real:' : 'Tpo Real: ' + tpo + 'hrs';
}