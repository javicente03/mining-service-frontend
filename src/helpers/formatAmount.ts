export const formatAmount = (amount: number = 0): string => {
    // Retornar en formato: $ 1.000.000
    return `$ ${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
}