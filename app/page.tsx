"use client";
import React from "react";

import { ModalRegister } from "@/components/ModalRegister/ModalRegister";

export default function Home() {
  return (
    <section className="flex flex-col items-center w-full mx-auto max-w-[40rem] gap-4 py-8 md:py-10">
      <h1 className=" text-[32px] font-semibold text-gray-800 dark:text-gray-200">
        Teste Front-End - Nitronews
      </h1>
      <h2 className=" text-[18px] ">
        O desafio proposto se resume em uma funcionalidade de cadastro de
        usuários com validação de campos, integração com backend para validação
        e consistência de dados, e um layout agradável ao usuário
      </h2>
      <span className="italic">
        Para subir o app na Vercel e expor como portfólio, eu apenas simulei a
        integração com o back-end e manipulei os dados utilizando context.
      </span>
      <span className="pb-2">{`Espero que gostem! :)`} </span>
      <ModalRegister />
    </section>
  );
}
