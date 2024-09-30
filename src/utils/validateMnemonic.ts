import * as bip39 from 'bip39';

export const isValidMnemonic = (mnemonic: string): boolean => {
  try {
    return bip39.validateMnemonic(mnemonic);
  } catch (error) {
    console.error('Error validating mnemonic:', error);
    return false; // Return false if validation fails
  }
};
