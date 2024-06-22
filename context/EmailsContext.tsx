"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type Email = string;

type EmailsContextType = {
  emails: Email[];
  addEmail: (email: Email) => string | null;
  removeEmail: (email: Email) => void;
};

const EmailsContext = createContext<EmailsContextType | undefined>(undefined);

// Hook para acessar o contexto
export const useEmailsContext = () => {
  const context = useContext(EmailsContext);

  if (!context) {
    throw new Error(
      "useEmailsContext deve ser usado dentro de um EmailsProvider",
    );
  }

  return context;
};

interface EmailsProviderProps {
  children: ReactNode;
}

export const EmailsProvider: React.FC<EmailsProviderProps> = ({ children }) => {
  const [emails, setEmails] = useState<Email[]>([
    "teste@exemplo.com",
    "joao@exemplo.com",
    "maria@acme.net",
  ]);

  const addEmail = (email: Email): string | null => {
    if (emails.includes(email)) {
      return "Email já cadastrado";
    }
    setEmails((prevEmails) => [...prevEmails, email]);

    return null;
  };

  const removeEmail = (email: Email) => {
    setEmails((prevEmails) => prevEmails.filter((e) => e !== email));
  };

  return (
    <EmailsContext.Provider value={{ emails, addEmail, removeEmail }}>
      {children}
    </EmailsContext.Provider>
  );
};
