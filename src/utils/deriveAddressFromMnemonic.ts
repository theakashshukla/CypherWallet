import * as bip39 from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';
import { BIP32Factory } from 'bip32';
import * as bitcoin from 'bitcoinjs-lib';
import * as secp from 'tiny-secp256k1'; // Required for BIP32 operations

const bip32 = BIP32Factory(secp); // Create a BIP32 instance

// Function to validate BIP39 mnemonic
const isValidMnemonic = (mnemonic: string): boolean => {
  try {
    // Validate BIP39 mnemonic
    return bip39.validateMnemonic(mnemonic, wordlist);
  } catch (error) {
    console.error('Error validating mnemonic:', error);
    return false; // Return false if validation fails
  }
};

// Function to check if mnemonic contains unique words
const hasUniqueWords = (mnemonic: string): boolean => {
  const words = mnemonic.trim().split(/\s+/g);
  const uniqueWords = new Set(words);
  return uniqueWords.size === words.length; // Check if all words are unique
};

// Function to derive an address from the BIP39 mnemonic
export const deriveAddressFromMnemonic = (mnemonic: string): string | null => {
  try {
    // Log original mnemonic for debugging
    console.log('Original mnemonic:', mnemonic);

    // Validate the mnemonic first
    const isValid = isValidMnemonic(mnemonic);
    const hasUnique = hasUniqueWords(mnemonic);
    
    // Log validation results
    console.log('Is valid mnemonic (bip39):', isValid);
    console.log('Has unique words:', hasUnique);

    if (!isValid || !hasUnique) {
      console.error('Invalid mnemonic:', mnemonic);
      return null; // Return null if invalid
    }

    // Convert mnemonic to seed
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    // console.log('Seed:', seed.toString('hex')); // Log seed for debugging as hex

    // Create root key using BIP32 from seed, ensure using testnet
    const root = bip32.fromSeed(seed, bitcoin.networks.testnet);
    console.log('BIP32 Root:', root.toBase58()); // Log root for debugging

    // Derive the first testnet address from the BIP44 path
    const child = root.derivePath("m/44'/1'/0'/0/0");
    console.log('Derived child key:', child.toBase58()); // Log child key for debugging

    // Generate the address using p2pkh
    const { address } = bitcoin.payments.p2pkh({
      pubkey: child.publicKey,
      network: bitcoin.networks.testnet, // Use the testnet network
    });

    console.log('Derived address:', address);
    return address || null; // Return derived address or null if undefined
  } catch (error) {
    console.error('Error deriving address:', error); // Log the error for debugging
    return null;
  }
};

// Example usage
const mnemonic1 = "keen bean nation extend dynamic submit rebuild van ice language grit love"; // Invalid example mnemonic
const mnemonic2 = "kiss tray obscure table dutch select penalty aisle nest cake good normal fury resist tongue"; // Valid example mnemonic

const address1 = deriveAddressFromMnemonic(mnemonic1);
console.log('Derived Address 1:', address1);

const address2 = deriveAddressFromMnemonic(mnemonic2);
console.log('Derived Address 2:', address2);
