import * as bip39 from 'bip39';
import { BIP32Factory } from 'bip32'; // Correct import
import * as bitcoin from 'bitcoinjs-lib';
import * as secp from 'tiny-secp256k1';
 // Import TinySecp256k1

const bip32 = BIP32Factory(secp); // Create BIP32 instance with TinySecp256k1
export const generateAddressFromMnemonic = (mnemonic: string): string | null => {
    if (!bip39.validateMnemonic(mnemonic)) {
      return null; // Return null if the mnemonic is invalid
    }
  
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const root = bip32.fromSeed(seed); // Ensure root is of type BIP32
    const child = root.derivePath("m/44'/1'/0'/0/0"); // Testnet derivation path
    
    // Ensure pubkey is a string or assert its type
    const pubkeyAddress = bitcoin.payments.p2pkh({ pubkey: child.publicKey }).address;
    
    return pubkeyAddress || null; // Return address or null
  };
  