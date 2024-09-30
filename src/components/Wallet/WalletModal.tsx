import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addWallet } from "../../state/slices/walletSlice";
import { deriveAddressFromMnemonic } from "../../utils/deriveAddressFromMnemonic";
import { Icon } from "../Icon";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: #1c1c1c;
  border-radius: 8px;
  padding: 20px;
  width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  position: relative; /* Allow positioning of the close icon */
`;

const ModalTitle = styled.h2`
  color: #ffffff;
  text-align: center;
  margin-bottom: 20px;
`;

const InputField = styled.input`
  width: 95%;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  margin-bottom: 16px;
  background-color: #2e2e2e;
  color: #ffffff;

  &::placeholder {
    color: #aaaaaa;
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.border}; /* Highlight color */
  }
`;

const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.colors.activeText || "#ffffff"};
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  width: 100%;
  &:hover {
    background-color: #ff8c00;
    border-color: #ff8c00;
    border: none;
  }
`;

const CloseIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: #ffffff;
  font-size: 24px;

  &:hover {
    color: ${({ theme }) => theme.colors.text}; /* Change color on hover */
  }
`;

const ImportWalletModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [mnemonic, setMnemonic] = useState("");
  const [walletName, setWalletName] = useState("");
  const dispatch = useDispatch();

  const handleImport = () => {
    const trimmedMnemonic = mnemonic.trim();
    const address = deriveAddressFromMnemonic(trimmedMnemonic);
    if (address) {
      dispatch(
        addWallet({
          id: address,
          name: walletName,
          address,
          balance: 0,
        })
      );

      setMnemonic("");
      setWalletName("");
      onClose();
    }
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <CloseIcon onClick={onClose}>
          <Icon.close size={24} />
        </CloseIcon>
        <ModalTitle>Import Wallet</ModalTitle>
        <span>Enter your wallet name:</span>
        <InputField
          type="text"
          value={walletName}
          onChange={(e) => setWalletName(e.target.value)}
        />
        <span>Enter your BIP39 Mnemonic:</span>
        <InputField
          type="text"
          value={mnemonic}
          onChange={(e) => setMnemonic(e.target.value)}
        />

        <SubmitButton
          onClick={handleImport}
          disabled={!mnemonic || !walletName}
        >
          Import Wallet
        </SubmitButton>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ImportWalletModal;
