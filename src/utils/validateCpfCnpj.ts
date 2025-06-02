import { showLog } from './showLog';

function validateCpf(cpf: string): boolean {
  if (!cpf || cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false; // Invalid CPF format or all digits are the same
  }
  const digits = cpf.split('').map(Number);
  const sum = (digits, factor) =>
    digits
      .slice(0, factor - 1)
      .reduce((acc, digit, index) => acc + digit * (factor - index), 0);
  const firstCheck = (sum(digits, 10) * 10) % 11;
  const secondCheck = (sum(digits, 11) * 10) % 11;
  return firstCheck === digits[9] && secondCheck === digits[10];
}
function validateCnpj(cnpj: string): boolean {
  if (!cnpj || cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) {
    return false; // Invalid CNPJ format or all digits are the same
  }
  const digits = cnpj.split('').map(Number);
  const sum = (digits, factor) =>
    digits
      .slice(0, factor - 1)
      .reduce((acc, digit, index) => acc + digit * (factor - index), 0);
  const firstCheck = (sum(digits, 5) * 10) % 11;
  const secondCheck = (sum(digits, 6) * 10) % 11;
  return firstCheck === digits[12] && secondCheck === digits[13];
}

export function validateCpfCnpj(value: string): boolean {
  if (!value) return false;

  showLog('Validating CPF/CNPJ:', value);

  // Remove non-numeric characters
  const cleanedValue = value.replace(/\D/g, '');

  // Check length for CPF (11 digits) and CNPJ (14 digits)
  if (cleanedValue.length === 11) {
    return validateCpf(cleanedValue);
  } else if (cleanedValue.length === 14) {
    return validateCnpj(cleanedValue);
  }

  return false;
}
