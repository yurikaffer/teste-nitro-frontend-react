"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import confetti from "canvas-confetti";

import { ModalSuccessful } from "../modalSucessful/modalSucessful";

import { useEmailsContext } from "@/context/EmailsContext";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/icons/icons";

export const formSchema = z
  .object({
    nome: z.string().min(1, "Digite seu nome"),
    email: z
      .string()
      .min(1, "Digite seu melhor E-mail")
      .email("E-mail inválido"),
    senha: z
      .string()
      .min(1, "Digite uma senha forte")
      .min(8, "Senha deve ter no mínimo 8 caracteres")
      .regex(/[a-z]/, "Senha deve conter pelo menos um caractere minúsculo")
      .regex(/[A-Z]/, "Senha deve conter pelo menos um caractere maiúsculo")
      .regex(/\d/, "Senha deve conter pelo menos um numeral"),
    confirmacaoSenha: z.string().min(1, "Confirmação de senha é obrigatória"),
  })
  .refine((data) => data.senha === data.confirmacaoSenha, {
    message: "As senhas não coincidem",
    path: ["confirmacaoSenha"],
  });

export type formSchema = z.infer<typeof formSchema>;

export function Form() {
  const { addEmail } = useEmailsContext();
  const [isVisiblePassword, setIsVisiblePassword] = React.useState(false);
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] =
    React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [renderSuccessfulMessage, setRenderSuccessfulMessage] =
    React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useForm<formSchema>({
    resolver: zodResolver(formSchema),
  });

  const randonTime = Math.floor(Math.random() * (7 - 2 + 1)) + 2;

  const handleConfetti = (x: number, y: number) => {
    confetti({
      particleCount: 140,
      startVelocity: 90,
      spread: 100,
      origin: { x, y },
    });
  };

  const handleSucessfulMessage = () => {
    setIsLoading(false);
    setRenderSuccessfulMessage(true);
    setTimeout(() => {
      handleConfetti(1, 0.8);
      handleConfetti(0, 0.8);
    }, 300);
  };

  const handleValidateForm = async (data: formSchema) => {
    setIsLoading(true);
    clearErrors();

    setTimeout(() => {
      const response = addEmail(data.email);

      if (response) {
        setIsLoading(false);
        setError("email", { type: "manual", message: response });
      } else {
        handleSucessfulMessage();
        reset();
      }
    }, randonTime * 1000);
  };

  return (
    <div>
      <form
        className="flex flex-col gap-3"
        onSubmit={handleSubmit(handleValidateForm)}
      >
        <Input
          errorMessage={errors.nome ? errors.nome.message : ""}
          isInvalid={errors.nome ? true : false}
          label="Nome completo"
          labelPlacement="inside"
          title="Insira seu nome completo"
          type="text"
          {...register("nome")}
        />

        <Input
          errorMessage={errors.email ? errors.email.message : ""}
          isInvalid={errors.email ? true : false}
          label="Email"
          title="Insira seu melhor e-mail"
          type="text"
          {...register("email")}
        />

        <Input
          errorMessage={errors.senha ? errors.senha.message : ""}
          isInvalid={errors.senha ? true : false}
          label="Senha"
          labelPlacement="inside"
          title="Insira a sua senha"
          type={isVisiblePassword ? "text" : "password"}
          {...register("senha")}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={() => setIsVisiblePassword(!isVisiblePassword)}
            >
              {isVisiblePassword ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
        />

        <Input
          errorMessage={
            errors.confirmacaoSenha ? errors.confirmacaoSenha.message : ""
          }
          isInvalid={errors.confirmacaoSenha ? true : false}
          label="Confirme sua senha"
          labelPlacement="inside"
          title="Confirme sua senha"
          type={isVisibleConfirmPassword ? "text" : "password"}
          {...register("confirmacaoSenha")}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={() =>
                setIsVisibleConfirmPassword(!isVisibleConfirmPassword)
              }
            >
              {isVisibleConfirmPassword ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
        />

        <Button
          className="rounded-full"
          color="primary"
          isLoading={isLoading}
          size="lg"
          type="submit"
        >
          {isLoading ? "" : "Cadastrar"}
        </Button>
      </form>
      <div id="message" />

      {renderSuccessfulMessage && (
        <ModalSuccessful
          isOpen={renderSuccessfulMessage}
          setIsOpen={setRenderSuccessfulMessage}
        />
      )}
    </div>
  );
}
