export function formatCurrency(val) {
  return Intl.NumberFormat('pt-BR', {
    val,
    style: 'currency',
    currency: 'BRL'
  }).format(val)
}
